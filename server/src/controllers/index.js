const axios = require("axios");
const { Driver, Team } = require('../db');
const { where } = require("sequelize");
const noImage = "https://id.imgur.com/MYTNMWl.png"
const URL = "http://localhost:5000/drivers";


const getAllDrivers = async (req, res) => {
    try {
        let name = req.query.name
        let allDrivers = []

        /* DB */
        const alldriversDb = await Driver.findAll({
            include: {
                model: Team,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        });

        /* API */
        const peticionApi = (await axios(URL)).data;
        const allDriversApi = peticionApi.map((element) => {
            return {
                id: element.id,
                forename: element.name.forename,
                surname: element.name.surname,
                description: element.description || "Sin descripción",
                nationality: element.nationality,
                dob: element.dob,
                image: element.image.url || noImage,
                teams: element.teams || "No teams",
            }
        });

        allDrivers = [...allDriversApi, ...alldriversDb];

        if (name) {
            const searchTerms = name.toLowerCase().split(" ");
            const driversByName = allDrivers.filter((driver) => {
                const fullName = `${driver.forename.toLowerCase()} ${driver.surname.toLowerCase()}`;
                return searchTerms.every((term) => fullName.includes(term));
            });
            if (driversByName.length) {
                return res.json(driversByName.slice(0, 15));
            } else {
                throw new Error(`No match found for name: ${name}`);
            }
        };

        return res.json(allDrivers);

    } catch (error) {
        res.status(500).send(error.message)
    }

}

const getDriverByName = async (name) => {
    try {
        if (name) {
            const driversByName = allDrivers.filter((driver) =>
                driver.forename.toLowerCase().startsWith(name.toLowerCase()));
            if (driversByName.length) {
                return driversByName.slice(0, 15);
            } else {
                throw new Error(`No match found for name: ${name}`);
            }
        };
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getDriverByID = async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = await axios.get(`${URL}/${id}`)

        let driverDetail = {
            id: id,
            forename: data.name.forename,
            surname: data.name.surname,
            description: data.description || "",
            nationality: data.nationality,
            dob: data.dob,
            image: data.image.url || noImage,
            teams: data.teams
        };
        return driverDetail.forename ? res.json(driverDetail) : res.status(404).send("Not found!");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const postDriver = async (req, res) => {
    try {
        const { forename, surname, description, nationality, dob, image, teams, createdInDb } = req.body;
        if (!forename || !surname || !description || !nationality || !dob) throw Error('Faltan datos');

        let [driverCreated, created] = await Driver.findOrCreate({
            where: { forename, surname, description, nationality, dob, image },
            defaults: {
                createdInDb
            }
        });

        const teamsDb = await Team.findAll({
            where: { name: teams }
        });

        await driverCreated.addTeams(teamsDb);

        res.send("Personaje creado");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


const getTeams = async (req, res) => {
    try {
        // Obtener todos los equipos existentes en la base de datos
        const existingTeams = await Team.findAll();

        // Verificar si ya se han creado los equipos
        if (existingTeams.length > 0) {
            return res.send(existingTeams);
        }

        const teamsApi = await axios.get(URL);
        const teams = teamsApi.data.map((element) => element.teams);

        const listaTeamsPura = [];
        for (let i = 0; i < teams.length; i++) {
            if (teams[i] === undefined) {
                listaTeamsPura.push(["No hay información de equipo"]);
            } else {
                let element = teams[i].split(",");
                listaTeamsPura.push(element);
            }
        }

        const listaTeams = [];
        listaTeamsPura.map((element) => {
            for (let i = 0; i < element.length; i++) {
                listaTeams.push(element[i].trim());
            }
        });

        const uniqueTeams = [...new Set(listaTeams)];

        // Crear los equipos en la base de datos
        const createdTeams = await Team.bulkCreate(
            uniqueTeams.map((name) => ({ name }))
        );

        res.send(createdTeams);
    } catch (error) {
        res.status(500).send(error.message);
    }
};





module.exports = {
    getAllDrivers,
    getDriverByName,
    getDriverByID,
    postDriver,
    getTeams,
}
