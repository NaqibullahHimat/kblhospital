const Joi = require('joi');

const DocValidation = (docData) => {
  console.log(docData.name);
  const docSchema = Joi.object({
    name: Joi.string().min(5).max(50).required("Name is required"),
    email: Joi.string().required("Email is required"),
    password: Joi.string().min(5).max(1024).required("Password is required"),
    address: Joi.string().min(5).max(100).required("Address is required"),
    area: Joi.string().min(5).max(100).required("Area is required"),
    city: Joi.string().min(2).max(50).required("City is required"),
    qualification: Joi.string().min(2).max(50).required("Qualification is required"),
    license: Joi.string().min(5).max(50).required("License is required"),
    experience: Joi.number().required("Experience is required"),
    contact: Joi.string().min(1).max(20).required("Contact is required"),
    fee: Joi.number().required("License is required"),
    avgWaitTime: Joi.string().required("Waiting time is required"),
    avgCheckTime: Joi.string().required("Check time is required"),
    avbStartTime: Joi.string().required("Start time is required"),
    avbEndTime: Joi.string().required("End time is required"),
    speciality: Joi.string().required("Speciality is required"),
    hospital: Joi.string().min(5).max(50).required("Hospital is required"),
    avbDays: Joi.string().required("End time is required"),
    services:Joi.string().required()
  });
  return Joi.validate(docData, docSchema);
}

const HosValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required("Name is required"),
    email: Joi.string().required("Email is required"),
    password: Joi.string().min(5).max(1024).required("Password is required"),
    hosAddress: Joi.string().min(5).max(100).required("Address is required"),
    area: Joi.string().min(3).max(100).required("Area is required"),
    city: Joi.string().min(5).max(50).required("City is required"),
    hosContact: Joi.string().min(11).max(20).required("Contact is required")
  })
  return Joi.validate(data, schema);
  
}

const LoginValidation = (logData) => {
  const logSchema= Joi.object({
    email: Joi.string().required("Email is required"),
    password: Joi.string().min(5).max(1024).required("Password is required")
  });
  return Joi.validate(logData, logSchema);
}

exports.DocValidation = DocValidation;
exports.LoginValidation = LoginValidation;
exports.HosValidation = HosValidation;