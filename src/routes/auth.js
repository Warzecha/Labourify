const express = require('express');
const {handleError} = require("../helpers/error");
const router = express.Router();
const {register, login} = require('../services/UsersService');

/* GET users listing. */
router.post('/register', async (req, res, next) => {

    try {
        let response = await register(req.body);
        res.status(201).json(response)
    } catch (e) {
        console.error(e.message);
        next(e)
    }

});

router.post('/login', async (req, res, next) => {
    try {
        let response = await login(req.body);
        res.json(response)
    } catch (e) {
        console.error(e.message);
        next(e)
    }
});

router.use((err, req, res, next) => {
    handleError(err, res);
});


module.exports = router;
