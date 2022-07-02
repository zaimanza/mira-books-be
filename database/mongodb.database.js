
const { MongoClient } = require('mongodb')

var db
var assetsModel
var client

exports.connectDB = async () => {
    try {
        client = new MongoClient("mongodb+srv://aiman:SumAqVM3TutkDAA3@cluster0.pkfhk.gcp.mongodb.net/kedaisiswa?authSource=admin&replicaSet=atlas-qjrcc7-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true")
        await client.connect()
        db = await client.db('mira-book-store')
    } catch (error) {
        console.error(`MongoDB connection error: ${error}`);
    }
}
exports.Staff = async () => await db.collection('staff')
exports.Applicant = async () => await db.collection('applicant')
exports.Application = async () => await db.collection('application')
