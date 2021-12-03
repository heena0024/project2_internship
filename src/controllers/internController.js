const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");

const createIntern = async function (req, res) {
    try {
        let data = req.body;
        if (!data) {
            res.status(404).send({ status: false, message: "No intern details given" }); return
        } else {
            let savedData = await internModel.create(data);
            res.status(201).send({ status: true, message: "Successfully saved intern details", data: savedData })
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message });
    }
}
module.exports.createIntern = createIntern