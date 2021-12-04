const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");
const validator = require("../utils/validator");


//POST /functionup/colleges
const createCollege = async function (req, res) {
    try {
        let data = req.body;
        if (!validator.isValidRequestBody(data)) {
            return res.status(404).send({ status: false, message: "No college detail given" });

        } else {

            //USING OBJECT DESTRUCT METHOD HERE
            const { name, fullName, logoLink } = data;

            if (!validator.isValid(name)) {
                return res.status(404).send({ status: false, message: 'Name is mandatory' })

            }
            if (!validator.isValid(fullName)) {
                return res.status(404).send({ status: false, message: 'FullName is mandatory' })

            }
            if (!validator.isValid(logoLink)) {
                return res.status(404).send({ status: false, message: 'Please Provide The Logo' })

            }
            const isNameAlreadyUsed = await collegeModel.findOne({ name });
            if (isNameAlreadyUsed) {
                return res.status(400).send({ status: false, message: `${name} is already in created` });
            }

            //saving data in database
            let savedData = await collegeModel.create(data);
            return res.status(201).send({ status: true, message: "College saved Successfully", data: savedData });

        }
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message });
    }
}


//GET/functionup/collegeDetails
const getCollegeDetails = async function (req, res) {
    try {
        let collegeName = req.query.collegeName
        let college = await collegeModel.findOne({ name: collegeName });
        if (!college) {
            res.status(404).send({ status: false, msg: "No college found" })
            return
        } else {
            let checkId = college._id;
            let name = college.name;
            let fullName = college.fullName;
            let collegeLink = college.logoLink;
            let InternsApplied = await internModel.find({ collegeId: checkId }).select({ _id: 1, name: 1, email: 1, mobile: 1 });
            if (!InternsApplied) {
                res.status(404).send({ status: false, msg: "No Interns found" })
                return
            } else {
                let Data = {
                    name: name,
                    fullName: fullName,
                    logoLink: collegeLink,
                    interests: InternsApplied

                }
                res.status(200).send({ status: true, data: Data })

            }

        }
    }
    catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message });
    }
}


module.exports.createCollege = createCollege;
module.exports.getCollegeDetails = getCollegeDetails;



