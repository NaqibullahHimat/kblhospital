import React from 'react';

import FeaturedDoctor from './FeaturedDoctors';
import TopCities from './TopCities';
import FeaturedHospitals from './FeaturedHospitals'
import Header from './Header'
// import Footer from '../Footer'
const home = props => {
    return (
        <div>
            {/* <Header /> */}
            <FeaturedDoctor />
            <TopCities />
            <FeaturedHospitals />
            {/* <Footer/> */}
        </div>
    )
}

export default home;