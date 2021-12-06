const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");
const validator = require("../validator/validator");

//POST/functionup/interns
const createIntern = async function (req, res) {
  try {
    let data = req.body;
    if (!validator.isValidRequestBody(data)) {
      //validating whether data is given in request body or not
      return res.status(404).send({
        status: false,
        message:
          "No intern details given. Please provide an intern's details to proceed further.",
      });
    } else {
      //USING OBJECT DESTRUCT METHOD HERE
      const { name, email, mobile, collegeName } = data;

      if (!validator.isValid(name)) {
        //Validating name
        return res.status(404).send({
          status: false,
          message: "Name is required. Please provide a valid name.",
        });
      }

      if (!validator.isValid(email)) {
        //Validating email
        return res.status(404).send({
          status: false,
          message:
            "Email Id is required. Please provide a valid email address.",
        });
      }

      if (!validator.isValid(mobile)) {
        //Validating mobile
        return res.status(404).send({
          status: false,
          message:
            "Mobile number is required. Please provide a valid mobile number",
        });
      }

      if (!validator.isValid(collegeName)) {
        return res.status(404).send({
          status: false,
          message:
            "The college name is required, Please enter a valid college name",
        });
      }

      //EMAIL VALIDATION
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return res.status(400).send({
          status: false,
          message: `Email is not valid. Please provide a valid Email address.`,
        });
      }

      //MOBILE VALIDATION
      if (!/^\+(?:[0-9] ?){10,12}[0-9]$/.test(mobile)) {
        return res.status(400).send({
          status: false,
          message: `Mobile number is not valid, Please provide a valid mobile number`,
        });
      }

      //Checking whether the entered email & mobile no. is already used or not.
      const isEmailAlreadyUsed = await internModel.findOne({ email });
      if (isEmailAlreadyUsed) {
        return res
          .status(400)
          .send({ status: false, message: `${email} is already in used` });
      }
      const isMobileAlreadyUsed = await internModel.findOne({ mobile });
      if (isMobileAlreadyUsed) {
        return res
          .status(400)
          .send({ status: false, message: `${mobile} is already in used` });
      }

      //saving data in database

      let find = await collegeModel.findOne({$or:[{ name: collegeName },{fullName:collegeName}]})
      if (!find) {
          let CollegeName = collegeName.toLowerCase()
          let againFind = await collegeModel.findOne({ name: CollegeName })
          if (!againFind) {
              return res.status(400).send({ status: false, message: 'The College Name Is Wrong' })                   
          } else {
              let collegeId = againFind._id
              data["collegeId"] = collegeId
              let savedData = await internModel.create(data)
              res.status(201).send({ status: true, message: "Successfully saved intern details", data: savedData })
              return
          }
      }
      else {
          let collegeId = find._id
          data["collegeId"] = collegeId
          let savedData = await internModel.create(data)
          res.status(201).send({ status: true, message: "Successfully saved intern details", data: savedData })
          return
      }

    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.createIntern = createIntern;
