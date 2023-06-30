const { Router } = require('express');
const { getAllDrivers, getDriverByName, getCharacterByID } = require('../controllers/index');

const router = Router();

router.get('/', async (req, res) => {
    const name = req.query.name;
    const driversTotal = await getAllDrivers();
    if (name) {
        let driverName = await driversTotal.filter(element => element.nombre.toLowerCase().includes(name.toLowerCase())) //name viene por query
        driverName.length ?
        res.status(200).send(driverName) :
        res.status(404).send('No está el driver, sorry =(');
    } else {
        res.status(200).send(driversTotal)
    }
})

router.get("/drivers/:id", getCharacterByID)

// router.post('/', (req, res) => {

// })


module.exports = router;