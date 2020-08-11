import React, { useEffect } from "react";
import {Switch, Link, Route, Redirect, useLocation, useRouteMatch} from 'react-router-dom';

import Home from './components/Home/Home';
import DoctorCollection from './components/Doctors/DoctorCollection';
import DoctorProfile from './components/Doctors/DoctorProfile';
import HospitalProfile from './components/Hospitals/HospitalProfile';
import HospitalCollection from './components/Hospitals/HospitalCollection';
import DoctorForm from './components/Doctors/DoctorForm';
import HospitalForm from './components/Hospitals/HospitalForm';
import Header from './components/Home/Header'
import AboutUs from "./components/AboutUs";
import OurPolicy from "./components/OurPolicy";
import Footer from "./components/Footer";
import Search from "./components/Search";
import DoctorPersonalProfile from "./components/DocProfileView/Profile";
import HospitalProfileProfile from "./components/HospitalProfile/HospitalPersonalProfile";
import Appointment from "./components/DocProfileView/Appointments";
//Admin 
import { Home as AdminHome } from './Admin/home/Index.jsx';
import { Role } from './Admin/_helpers/index';
import { Nav, PrivateRoute, Alert } from './Admin/_components/index';
import { Profile } from './Admin/profile/Index.jsx';
import { Admin } from './Admin/admin/Index';
import { Account } from './Admin/account/Index';

function App() {
  const { pathname } = useLocation(); 
  const {url, path} = useRouteMatch()

  useEffect(()=>{
console.log("reload");
  }, [url])
  return (
    <>
    
    <div className="container">
    <div className="content-wrap">
    {//<Nav />
    }<Alert />
    <Header />
    
    <div className="row">
    
      {/* <div className="col-3">
        <Pages />
      </div> */}
     
      <div className="col-12">
      <Switch>
      <Route path="/profile" component={Profile} />
                <Route path="/admin" roles={[Role.Admin]} component={Admin} 
                />
                <Route exact path="/adminHome" component={AdminHome} />
                <Route path="/account" component={Account} />
  <Route path="/search">
    <Search />
  </Route>
<Route exact path="/doctor">
  <DoctorCollection />
</Route>

<Route exact path="/doctor/profile/:id">
<DoctorPersonalProfile />
</Route>

<Route path="/doctor/profile/appointment/:id">
<Appointment />
</Route>

<Route path="/hospital/profile/:id">
<HospitalProfileProfile />
</Route>

<Route exact path="/doctor/city/:city">
  <DoctorCollection />
</Route>

<Route exact path="/doctor/speciality/:speciality">
  <DoctorCollection />
</Route>

<Route exact path="/doctor/:id">
  <DoctorProfile />
</Route>

<Route exact path="/hospital">
  <HospitalCollection />
</Route>

<Route exact path="/hospital/city/:city">
  <HospitalCollection />
</Route>

<Route exact path="/hospital/:id">
  <HospitalProfile />
</Route>

<Route path="/doctor-registration">
  <DoctorForm />
</Route>

<Route path="/hospital-registration">
  <HospitalForm />
</Route>



<Route path="/AboutUs">
  <AboutUs />
</Route>

<Route path="/OurPolicy">
  <OurPolicy />
</Route>

<Route path="/">
  <Home />
</Route>       

      </Switch>
      </div>
    </div>
    <Footer />
    

    </div>
    </div>
    </>
  )
}

export default App;