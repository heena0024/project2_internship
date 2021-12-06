const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");
const validator = require("../validator/validator");

//POST/functionup/interns
const createIntern = async function (req, res) {
    try {
        let data = req.body;
        if (!validator.isValidRequestBody(data)) {
            return res.status(404).send({ status: false, message: "No intern details given. Please provide an intern's details to proceed further." });
        } else {
            //USING OBJECT DESTRUCT METHOD HERE
            const { name, email, mobile, collegeId } = data;

            if (!validator.isValid(name)) {
                return res.status(404).send({ status: false, message: 'Name is required. Please provide a valid name.' })
            }

            if (!validator.isValid(email)) {
                return res.status(404).send({ status: false, message: 'Email Id is required. Please provide a valid email address.' })
            }

            if (!validator.isValid(mobile)) {
                return res.status(404).send({ status: false, message: 'Mobile number is required. Please provide a valid mobile number' })
            }

            if (!validator.isValidObjectId(collegeId)) {
                return res.status(404).send({ status: false, message: 'The College Id is invalid. Please enter a valid college Id.' })
            }

             //EMAIL VALIDATION
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
                return res.status(400).send({ status: false, message: `Email is not valid. Please provide a valid Email address.` })
            }

            //MOBILE VALIDATION
            if(!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile))) {
                return res.status(400).send({status: false, message: `Mobile number is not valid, Please provide a valid mobile number`})  
            }

            //Checking whether the entered email & mobile no. is already used or not.
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
                res.status(404).send({ status: false, message: 'The College Id Is Wrong' })
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




