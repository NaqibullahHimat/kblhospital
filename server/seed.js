const mongoose = require("mongoose");
const config = require("./config.json");

const { Doctor } = require("./models/doctor");
const { Hospital } = require("./models/hospital");
const { Rating } = require("./models/rating");
const { Appointment } = require("./models/appointment");
const { Speciality } = require("./models/speciality");
const { City } = require("./models/city");
const { Area } = require("./models/area");

const specialities = [
  "Dermatologist",
  "Urologists",
  "Gynecologists",
  "Neurologist",
  "General Physician",
  "Pulmonologist",
];
const cites = [
  "Kabul",
  "Ningarhar",
  "Kandahar",
  "Mazar",
  "Hirat",
  "Laghman",
  "Paktiya",
  "Khost",
  "Hilmand",
];
const areas = [
  { city: "Kabul", cityAreas: ["Najibzarab", "Shahrinow", "ArzanQemat"] },
  { city: "Kabul", cityAreas: ["F-8", "G-7"] },
];

const doctors = [
  {
    name: "Dr.Asad khan",
    email: "asad@gmail.com",
    password: "12345678",
    address: "H 15-B ",
    area: "shahrinaw",
    city: "Kabul",
    qualification: "MBBS",
    license: "DS767358A",
    services:"Skin, face, hears",
    experience: 7,
    contact: "074557890",
    fee: 2000,
    avgWaitTime: "15 mint",
    avgCheckTime: "20 mint",
    avbStartTime: "6 pm",
    avbEndTime: "9 pm",
    speciality: "Urologists",
    hospital: "",
    avbDays: "Monday, Tuesday, Friday",
    image: "images/doctor1.jpg",
  },
  {
    name: "Dr.Sharjeel Khan",
    email: "drsh@gmail.com",
    password: "12345889",
    address: "H 45-B ",
    area: "G-9",
    city: "Kabul",
    qualification: "CTC-BD",
    license: "DS76766DGA",
    services:"skin",
    experience: 10,
    contact: "071364678",
    fee: 2000,
    avgWaitTime: "15 mint",
    avgCheckTime: "20 mint",
    avbStartTime: "6 pm",
    avbEndTime: "9 pm",
    speciality: "Dermatologist",
    hospital: "",
    avbDays: "Monday, Tuesday, Friday",
    image: "images/doctor2.jpg",
  },
  {
    name: "Dr.Ali Khan",
    email: "ali@gmail.com",
    password: "12345889",
    address: "darulaman 45-st ",
    area: "G-9",
    city: "Kabul",
    qualification: "CTC-BD",
    license: "DS76766DGA",
    services:"skin",
    experience: 10,
    contact: "071364678",
    fee: 2000,
    avgWaitTime: "15 mint",
    avgCheckTime: "20 mint",
    avbStartTime: "6 pm",
    avbEndTime: "9 pm",
    speciality: "Gynecologists",
    hospital: "",
    avbDays: "Monday, Tuesday, Friday",
    image: "images/doctor2.jpg",
  },
  {
    name: "Dr.Wali Khan",
    email: "wali@gmail.com",
    password: "12345889",
    address: "H 45-B ",
    area: "G-9",
    city: "Kabul",
    qualification: "CTC-BD",
    license: "DS76766DGA",
    services:"skin",
    experience: 10,
    contact: "071364678",
    fee: 2000,
    avgWaitTime: "15 mint",
    avgCheckTime: "20 mint",
    avbStartTime: "6 pm",
    avbEndTime: "9 pm",
    speciality: "Neurologist",
    hospital: "",
    avbDays: "Monday, Tuesday, Friday",
    image: "images/doctor2.jpg",
  },
  {
    name: "Dr.Haroon Khan",
    email: "haroon@gmail.com",
    password: "12345889",
    address: "H 45-B ",
    area: "G-9",
    city: "Kabul",
    qualification: "CTC-BD",
    license: "DS76766DGA",
    services:"skin",
    experience: 10,
    contact: "071364678",
    fee: 2000,
    avgWaitTime: "15 mint",
    avgCheckTime: "20 mint",
    avbStartTime: "6 pm",
    avbEndTime: "9 pm",
    speciality: "General Physician",
    hospital: "",
    avbDays: "Monday, Tuesday, Friday",
    image: "images/doctor2.jpg",
  },
];

const hospitals = [
  {
    name: "Khan Hospital",
    hosEmail: "hos1@gmail.com",
    hosPassword: "123456",
    hosAddress: "st-23 shahrinow Kabul Afghanistan",
    hosImage: "images/hospital1.jpg",
    city: "Kabul",
    area: "Khan Hospital, 152-G/1, Shahrinow",
    hosContact: "12345688",
  },
  {
    name: "Government Hospital",
    hosEmail: "hos2@gmail.com",
    hosPassword: "1234567",
    hosAddress: "st-20 ArzanQemat phase-5 Kabul Afghanistan",
    hosImage: "images/hospital2.jpg",
    city: "Kabul",
    area: "Blue Area",
    hosContact: "12345688",
  },
];

const ratings = [
  {
    rating:3,
    comment: "Very cooperative and expert person.",
    doctor: "",
    date: Date.now(),
    ptName: "Muhammad Ali",
  },
];

const appointments = [
  {
    ptName: "Sameer",
    ptContact: 12345333333,
    doctorId: "",
    apDay: "Friday",
    apTime: "18pm",
  },
];

async function seed() {
  await mongoose.connect(config.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  await mongoose.connection.dropDatabase();

  for (let hos of hospitals) {
    await new Hospital(hos).save();
  }

  const hid = await Hospital.findOne({ name: "Kabul Hospital" });

  for (let doctor of doctors) {
    doctor.hospital = hid;
    await new Doctor(doctor).save();
  }

  const docId = await Doctor.findOne({ name: "Dr.Asad khan" });
  for (let app of appointments) {
    app.doctorId = docId;
    await new Appointment(app).save();
  }

  for (let rt of ratings) {
    rt.doctor = docId;
    await new Rating(rt).save();
  }

  for (let city of cites) {
    await new City({ name: city }).save();
  }
  //getdocumentbyid, .checked

  for (let area of areas) {
    const cityId = await City.findOne({ name: area.city });
    for (let ca of area.cityAreas) {
      await new Area({ name: ca, city: cityId }).save();
    }
  }

  for (let spc of specialities) {
    // spc.doctor=spc;
    await new Speciality({ name: spc }).save();
  }

  mongoose.disconnect();
  console.info("Done!");
}

seed();
