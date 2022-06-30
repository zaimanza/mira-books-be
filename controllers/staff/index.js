const { Staff } = require('../../database/mongodb.database');

var router = require('express').Router();

router.post('/login', async (req, res) => {
    try {
        const staff_mdb = await Staff()

        const body = req.body

        if (!body)
            return res.status(400).json("Unauthorized")

        const return_search_data = await staff_mdb.findOne({
            email: body?.email,
            password: body?.password
        })

        if (!return_search_data)
            return res.status(400).json("Staff does not exists")

        return res.status(200).json(return_search_data)
    } catch (error) {
        return res.status(400).json("Server error")
    }
})

router.post('/add', async (req, res) => {
    try {
        const staff_mdb = await Staff()

        const body = req.body

        if (!body)
            return res.status(400).json("Unauthorized")

        const return_search_data = await staff_mdb.findOne({
            staff_id: body?.staff_id
        })
        console.log(return_search_data)
        if (return_search_data)
            return res.status(400).json("Staff already exists")

        var created_staff = await staff_mdb.insertOne(body)

        created_staff = await staff_mdb.findOne({
            _id: created_staff?.insertedId
        })

        return res.status(200).json(created_staff)
    } catch (error) {
        return res.status(400).json("Server error")
    }
})

router.post('/update', async (req, res) => {
    try {
        const staff_mdb = await Staff()

        const body = req.body

        if (!body)
            return res.status(400).json("Unauthorized")

        const return_search_data = await staff_mdb.findOne({
            staff_id: body?.staff_id
        })

        if (!return_search_data)
            return res.status(400).json("Staff does not exists")

        await staff_mdb.updateOne(
            { staff_id: body?.staff_id },
            { $set: body }
        )

        created_staff = await staff_mdb.findOne({
            staff_id: body?.staff_id
        })

        return res.status(200).json(created_staff)
    } catch (error) {
        return res.status(400).json("Server error")
    }
})

router.post('/delete', async (req, res) => {
    try {
        const staff_mdb = await Staff()

        const body = req.body

        if (!body)
            return res.status(400).json("Unauthorized")

        const return_search_data = await staff_mdb.findOne({
            staff_id: body?.staff_id
        })

        if (!return_search_data)
            return res.status(400).json("Staff does not exists")

        await staff_mdb.deleteOne({
            staff_id: body?.staff_id
        })

        return res.status(200).json(true)
    } catch (error) {
        return res.status(400).json(true)
    }
})

router.get('/all', async (req, res) => {
    try {
        const staff_mdb = await Staff()

        const return_search_data = await staff_mdb.find().toArray()

        console.log(return_search_data)
        if (!return_search_data)
            return res.status(400).json("Staff does not exists")

        return res.status(200).json(return_search_data)
    } catch (error) {
        return res.status(400).json("Server error")
    }
})

router.get('/:staff_id', async (req, res) => {
    try {
        const params = req.params
        const staff_mdb = await Staff()

        const return_search_data = await staff_mdb.findOne({
            staff_id: params?.staff_id?.toString()
        })

        console.log(return_search_data)
        if (!return_search_data)
            return res.status(400).json("Staff does not exists")

        return res.status(200).json(return_search_data)
    } catch (error) {
        return res.status(400).json("Server error")
    }
})

module.exports = router;