const { Application } = require('../../database/mongodb.database');

var router = require('express').Router();

router.post('/add', async (req, res) => {
    try {
        const application_mdb = await Application()

        const body = req.body

        if (!body)
            return res.status(400).json("Unauthorized")

        const return_search_data = await application_mdb.findOne({
            ic_num: body?.ic_num
        })

        if (return_search_data)
            return res.status(400).json("Application already exists")

        var created_application = await application_mdb.insertOne(body)

        created_application = await application_mdb.findOne({
            _id: created_application?.insertedId
        })

        return res.status(200).json(created_application)
    } catch (error) {
        return res.status(400).json("Server error")
    }
})

router.post('/update', async (req, res) => {
    try {
        const application_mdb = await Application()

        const body = req.body

        if (!body)
            return res.status(400).json("Unauthorized")

        const return_search_data = await application_mdb.findOne({
            ic_num: body?.ic_num
        })

        if (!return_search_data)
            return res.status(400).json("Application does not exists")

        await application_mdb.updateOne(
            { ic_num: body?.ic_num },
            { $set: body }
        )

        const created_application = await application_mdb.findOne({
            ic_num: body?.ic_num
        })

        return res.status(200).json(created_application)
    } catch (error) {
        return res.status(400).json("Server error")
    }
})

router.post('/delete', async (req, res) => {
    try {
        const application_mdb = await Application()

        const body = req.body

        if (!body)
            return res.status(400).json("Unauthorized")

        const return_search_data = await application_mdb.findOne({
            ic_num: body?.ic_num
        })

        if (!return_search_data)
            return res.status(400).json("Application does not exists")

        await application_mdb.deleteOne({
            ic_num: body?.ic_num
        })

        return res.status(200).json(true)
    } catch (error) {
        return res.status(400).json(true)
    }
})

router.get('/all', async (req, res) => {
    try {
        const application_mdb = await Application()

        const return_search_data = await application_mdb.find().toArray()

        if (!return_search_data)
            return res.status(400).json("Application does not exists")

        return res.status(200).json(return_search_data)
    } catch (error) {
        return res.status(400).json("Server error")
    }
})

router.get('/:ic_num', async (req, res) => {
    try {
        const params = req.params
        const application_mdb = await Application()

        const return_search_data = await application_mdb.findOne({
            ic_num: params?.ic_num?.toString()
        })

        if (!return_search_data)
            return res.status(400).json("Application does not exists")

        return res.status(200).json(return_search_data)
    } catch (error) {
        return res.status(400).json("Server error")
    }
})

module.exports = router;