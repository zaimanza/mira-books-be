const { Applicant } = require('../../database/mongodb.database');

var router = require('express').Router();

router.post('/add', async (req, res) => {
    try {
        const applicant_mdb = await Applicant()

        const body = req.body

        if (!body)
            return res.status(400).json("Unauthorized")

        const return_search_data = await applicant_mdb.findOne({
            ic_num: body?.ic_num
        })
        console.log(return_search_data)
        if (return_search_data)
            return res.status(400).json("Applicant already exists")

        var created_applicant = await applicant_mdb.insertOne(body)

        created_applicant = await applicant_mdb.findOne({
            _id: created_applicant?.insertedId
        })

        return res.status(200).json(created_applicant)
    } catch (error) {
        return res.status(400).json("Server error")
    }
})

router.post('/update', async (req, res) => {
    try {
        const applicant_mdb = await Applicant()

        const body = req.body

        if (!body)
            return res.status(400).json("Unauthorized")

        const return_search_data = await applicant_mdb.findOne({
            ic_num: body?.ic_num
        })

        if (!return_search_data)
            return res.status(400).json("Applicant does not exists")

        await applicant_mdb.updateOne(
            { ic_num: body?.ic_num },
            { $set: body }
        )

        created_applicant = await applicant_mdb.findOne({
            ic_num: body?.ic_num
        })

        return res.status(200).json(created_applicant)
    } catch (error) {
        return res.status(400).json("Server error")
    }
})

router.post('/delete', async (req, res) => {
    try {
        const applicant_mdb = await Applicant()

        const body = req.body

        if (!body)
            return res.status(400).json("Unauthorized")

        const return_search_data = await applicant_mdb.findOne({
            ic_num: body?.ic_num
        })

        if (!return_search_data)
            return res.status(400).json("Applicant does not exists")

        await applicant_mdb.deleteOne({
            ic_num: body?.ic_num
        })

        return res.status(200).json(true)
    } catch (error) {
        return res.status(400).json(true)
    }
})

router.get('/all', async (req, res) => {
    try {
        const applicant_mdb = await Applicant()

        const return_search_data = await applicant_mdb.find().toArray()

        console.log(return_search_data)
        if (!return_search_data)
            return res.status(400).json("Applicant does not exists")

        return res.status(200).json(return_search_data)
    } catch (error) {
        return res.status(400).json("Server error")
    }
})

router.get('/:ic_num', async (req, res) => {
    try {
        const params = req.params
        const applicant_mdb = await Applicant()

        const return_search_data = await applicant_mdb.findOne({
            ic_num: params?.ic_num?.toString()
        })

        console.log(return_search_data)
        if (!return_search_data)
            return res.status(400).json("Applicant does not exists")

        return res.status(200).json(return_search_data)
    } catch (error) {
        return res.status(400).json("Server error")
    }
})

module.exports = router;