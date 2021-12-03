const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");

//POST /functionup/colleges
const createCollege = async function (req, res) {
    try {
        let data = req.body;
        if (!data) {
            res.status(404).send({ status: false, message: "No college detail given" }); return
        } else {
            let savedData = await collegeModel.create(data);
            return res.status(201).send({ status: true, message: "College saved Successfully", data: savedData });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message });
    }
}


module.exports.createCollege = createCollege