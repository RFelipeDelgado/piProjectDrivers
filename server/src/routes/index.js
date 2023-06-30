const { Router } = require("express");
const db = require("../db");
const { getAllDrivers, getDriverByID, postDriver, getTeams } = require('../controllers/index');


const router = Router();

//Acá configuro las rutas, la idea es crear controladores e importarlos a este archivo

router.get('/drivers', getAllDrivers)

router.get("/drivers/:id", getDriverByID)

router.post('/drivers', postDriver)

router.get('/teams', getTeams)


module.exports = router;
