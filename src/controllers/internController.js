const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");
const mongoose = require('mongoose');
const validator = require("../utils/validator");



//POST/functionup/interns
const createIntern = async function (req, res) {
    try {
        let data = req.body;
        if (!validator.isValidRequestBody(data)) {
            return res.status(404).send({ status: false, message: "No intern details given" });

        } else {

            //USING OBJECT DESTRUCT METHOD HERE
            const { name, email, mobile, collegeId } = data;

            if (!validator.isValid(name)) {
                return res.status(400).send({ status: false, message: 'Name  is mandatory' })

            }
            if (!validator.isValid(email)) {
                return res.status(400).send({ status: false, message: 'Email Id is mandatory' })

            }

            //EMAIL VALIDATION

            // if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            //     res.status(400).send({status: false, message: `Email should be a valid email address`})
            //     return
            // }

            if (!validator.isValid(mobile)) {
                return res.status(404).send({ status: false, message: 'Mobile number is mandatory' })

            }

            //MOBILE VALIDATION

            // if(!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile))) {
            //     res.status(400).send({status: false, message: `Mobile should be a valid Mobile Number`})
            //     return
            // }

            if (!validator.isValidObjectId(collegeId)) {
                return res.status(400).send({ status: false, message: 'The College Id Is Invalid' })

            }
            const isEmailAlreadyUsed = await internModel.findOne({ email });
            if (isEmailAlreadyUsed) {
                return res.status(400).send({ status: false, message: `${email} is already in used` });
            }
            const isMobileAlreadyUsed = await internModel.findOne({ mobile });
            if (isMobileAlreadyUsed) {
                return res.status(400).send({ status: false, message: `${mobile} is already in used` });
            }

            //saving data in database
            let find = await collegeModel.findById(collegeId)
            if (!find) {
                res.status(400).send({ status: false, message: 'The College Id Is Wrong' })
            }
            else {
                let savedData = await internModel.create(data);
                res.status(201).send({ status: true, message: "Successfully saved intern details", data: savedData })
            }
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: "Something went wrong", error: error.message });
    }
}
module.exports.createIntern = createIntern




