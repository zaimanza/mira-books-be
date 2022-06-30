var router = require('express').Router();

router.post('/login', async (req, res) => {
    try {

        return res.status(200).json(await buildings_transactions);
    } catch (error) {
        return res.status(400).json("Server error")
    }
})

module.exports = router;