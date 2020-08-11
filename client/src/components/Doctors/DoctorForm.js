import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import validateFile from '../FileHelper';


const DoctorForm = () => {
  const [url, seturl] = useState ("http://localhost:4000/doctor")
  const [doctorProfile, setDoctorProfile] = useState("");
  const [profileErrorMsg, setProfileErrorMsg] = useState("");

  const handleDoctorProfileChange = (e) => {
    const files = e.target.files;
    console.log(files[0]);

    const errors = validateFile(files, {limit: 1, type: 'image', size: 500});
    console.log('=> Profile validation Error => ', errors);
    if(!errors) {
      setDoctorProfile(files[0]);
      setProfileErrorMsg("");
    }
    else{
      setProfileErrorMsg(errors.limit + errors.type + errors.size);
    }
  };

  const handleSubmit = async (values, options) => {
    if (!doctorProfile) {
      setProfileErrorMsg("Profile is required");
      return;
    }

    const formData = new FormData();
    formData.append("file", doctorProfile);
    console.log(formData)

    for (let [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }

    try {
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      alert('Doctor Registered Successfully!');
    } 
    catch (ex) {
      console.log("=> exception => ", ex);
      if(!ex.response){
        alert("Please check your internet connection");
      } 
      else if(ex.response && ex.response.status < 500) {
        // const {field} = ex.response.data;
        if(ex.response.status === 409) {
          console.log(ex.response.status);
          alert("Server Validation Error: \n" + "Email already exits!");
        }
        else 
            alert("Server Validation Error: Invalid Data Posted!");
      }
      else {
        alert("An Unexpected Error Occured");
      }
    }
  }

  return (
    <Formik initialValues={{
      name: "Aslam",
      email: "aslam@gmail.com",
      password: "123456",
      address: "Johar town",
      area: "johar town",
      city: "Kabul",
      qualification: "MBBA",
      license: "123456",
      experience: "5 years",
      contact: "03331234567",
      fee: '5000',
      avgWaitTime: "5 minutes",
      avgCheckTime: "5 minutes",
      avbStartTime: "5 minutes",
      avbEndTime: "5 minutes",
      speciality: "Bones",
      hospital: "National",
      avbDays: "5",
      services: "first"
    }}
    validationSchema={Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
      address: Yup.string().required("Address is required"),
      area: Yup.string().required("Area is required"),
      city: Yup.string().required("City is required"),
      qualification: Yup.string().required("Qualification is required"),
      license: Yup.string().required("License is required"),
      experience: Yup.number().required("Experience is required"),
      contact: Yup.string().required("Contact is required"),
      fee: Yup.number().required("Fee is required"),
      avgWaitTime: Yup.string().required("Wait time is required"),
      avgCheckTime: Yup.string().required("Check time is required"),
      avbStartTime: Yup.string().required("Start time is required"),
      avbEndTime: Yup.string().required("End time is required"),
      speciality: Yup.string().required("Speciality is required"),
      hospital: Yup.string().required("Hospital is required"),
      avbDays: Yup.string().required("Day is required"),
      services: Yup.string().required("Services are required")
    })} 
    onSubmit={handleSubmit}>

    <Form className='container-fluid'>
    <div className="shadow p-6 m-6 bg-white rounded" style={{padding: "10px"}}>
    <h3 className="font-weight-bold">Doctor Registration</h3>

    <div className="row form-group has-error">
        <div className="col-md-6">
          <label className="control-label">Name</label>
          <Field 
            name="name" 
            type="text" 
            className="form-control" 
            placeholder="enter name" 
          />
          <span className='text-danger'><ErrorMessage name="name" /></span>
          
        </div>
        <div className="col-md-6">
          <label className="control-label">Email</label>
          <Field 
            name="email" 
            type="email" 
            className="form-control" 
            placeholder="enter email" />
            <span className="text-danger"><ErrorMessage name="email" /></span>
        </div>
    </div>

    <div className="form-group has-error">
      <div className="row">
        <div className="col-md-6">
          <label className="control-label">Password</label>
          <Field 
            name="password" 
            type="password" 
            className="form-control" 
            placeholder="enter password" />
            <span className="text-danger"><ErrorMessage name="password" /></span>
        </div>
          
        <div className="col-md-6">
          <label className="control-label">Area</label>
          <Field 
            name="area" 
            type="text" 
            className="form-control" 
            placeholder="enter password again" />
            <span className="text-danger"><ErrorMessage name="text" /></span>
        </div>
      </div>
    </div>

    <div className="form-group has-error">
      <div className="row">
        <div className="col-md-4">
          <label className="control-label">Hospital</label>
          <Field
            name="hospital" 
            type="text" 
            className="form-control" 
            placeholder="enter hospital" />
            <span className="text-danger"><ErrorMessage name="hospital" /></span>
        </div>
          
        <div className="col-md-4">
          <label className="control-label">Speciality</label>
          <Field 
            name="speciality"
            type="text" 
            className="form-control" 
            placeholder="enter speciality" />
            <span className="text-danger"><ErrorMessage name="speciality" /></span>
        </div>

        <div className="col-md-4">
          <label className="control-label">City</label>
          <Field 
          name="city"
          type="text" 
          className="form-control" 
          placeholder="enter city" />
          <span className="text-danger"><ErrorMessage name="city" /></span>
        </div>
      </div>
    </div>

    <div className="form-group has-error">
      <div className="row">
        <div className="col-md-4">
          <label className="control-label">Qualification</label>
          <Field 
            name="qualification" 
            type="text" 
            className="form-control" 
            placeholder="enter highest qualification" />
            <span className="text-danger"><ErrorMessage name="qualification" /></span>
        </div>
          
        <div className="col-md-4">
          <label className="control-label">PMDC</label>
          <Field 
            name="license"
            type="text" 
            className="form-control" 
            placeholder="enter license number" />
            <span className="text-danger"><ErrorMessage name="license" /></span>
        </div>

        <div className="col-md-4">
          <label className="control-label">Experience</label>
          <Field 
            name="experience" 
            type="number" 
            className="form-control" 
            placeholder="total experience in years" />
            <span className="text-danger"><ErrorMessage name="experience" /></span>
        </div>
      </div>
    </div>

    <div className="form-group has-error">
      <div className="row">
      <div className="col">
        <label className="control-label">Address</label>
          <Field 
          name="address"
          type="text" 
          className="form-control" 
          placeholder="125 main st..." />
          <span className="text-danger"><ErrorMessage name="address" /></span>
      </div>
      </div>
    </div>

    <div className="form-group has-error">
      <div className="row">
        <div className="col-md-4">
        <label className="control-label">Contact</label>
          <Field 
            name="contact"
            type="text"
            className="form-control"
            placeholder="enter contact"
          />
          <span className="text-danger"><ErrorMessage name="contact" /></span>

        </div>
          
        <div className="col-md-4">
          <label className="control-label">Fee</label>
          <Field 
            name="fee"
            type="number" 
            className="form-control" 
            placeholder="enter charging fee" />
            <span className="text-danger"><ErrorMessage name="fee" /></span>
        </div>

        <div className="col-md-4">
          <label className="control-label">Avg. Wait Time</label>
          <Field 
          name="avgWaitTime"
          type="text" 
          className="form-control" 
          placeholder="e.g 10 minutes" />
          <span className="text-danger"><ErrorMessage name="avgWaitTime" /></span>
        </div>
      </div>
    </div>

    <div className="form-group has-error">
      <div className="row">
        <div className="col-md-4">
          <label className="control-label">Avg. Checkup Time</label>
          <Field 
          name="avgCheckTime"
          type="text" 
          className="form-control" 
          placeholder="e.g 20 minutes" />
          <span className="text-danger"><ErrorMessage name="avgCheckTime" /></span>
        </div>
          
        <div className="col-md-4">
          <label className="control-label">Availability Start Time</label>
          <Field 
          name="avbStartTime"
          type="text" 
          className="form-control" 
          placeholder="e.g 9:30 am" />
          <span className="text-danger"><ErrorMessage name="avbStartTime" /></span>
        </div>

        <div className="col-md-4">
          <label className="control-label">Availability End Time</label>
          <Field
            name="avbEndTime" 
            type="text" 
            className="form-control" 
            placeholder="e.g 5:00 pm" />
            <span className="text-danger"><ErrorMessage name="avbEndTime" /></span>
        </div>
      </div>
    </div>

    <div className="row">
    <div className="col-md-4">
    <label className="control-label">Available Days</label>
          <Field 
          name="avbDays"
          type="text" 
          className="form-control" 
          placeholder="enter your availability days" />
          <span className="text-danger"><ErrorMessage name="avbDays" /></span>
    </div>

    <div className="col-md-4">
    <label className="control-label">Services</label>
          <Field 
          name="services"
          type="text" 
          className="form-control" 
          placeholder="enter your services" />
          <span className="text-danger"><ErrorMessage name="services" /></span>
    </div>

    <div className="col-md-4">
      <h5>Upload Profile Pic</h5>
      <div className="custom-file">
        <Field
          name="file" 
          type="file"  
          id="picture"
          onChange={handleDoctorProfileChange}
          accept="image/*" />
        <label className="custom-file-label" htmlFor="picture">
        {(doctorProfile && doctorProfile.name) || "Upload Profile"}</label>
      </div>
      <div className="text-danger">{profileErrorMsg}</div>
    </div>

    </div>
    <div className="text-center" style={{marginTop: "20px"}}>
      <button type="submit" className="btn btn-primary btn-lg text-center">Submit</button>
    </div>

    </div>
    </Form>
    </Formik>
  )
}

export default DoctorForm;