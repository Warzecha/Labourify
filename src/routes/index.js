const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.send("Labourification is here!");
});

module.exports = router;
