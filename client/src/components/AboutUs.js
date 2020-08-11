import React, { Component } from 'react';
import './aboutus.css';
import './Footer'


class AboutUs extends Component {
 
    render() { 
        return ( 
          <div className='footer-main'>
            <div className="container">
            
            <div className="about-section">
  <h1 className='h1'>About Us Page</h1>
  <p className='p'>Some text about who we are and what we do.</p>
  <p className='p'>Resize the browser window to see that this page is responsive by the way.</p>
    </div>


<h2 style={{textAlign:"center"}}>Our Team</h2>
<div class="row">
  <div class="column">
    <div class="card">
      <img src="/images/d.jpg" alt="Naqibullah" style={{width:"100%"}}/>
      <div class="container">
        <h2>Dr.Khan Sab</h2>
        <p class="title">Specialist of Urologist</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>Email: naqibhimat@example.com</p>
        <p>Cell:  0093789446434</p>
        {/* <p><button class="button">Contact</button></p> */}
      </div>
    </div>
  </div>


  <div class="column">
    <div class="card">
      <img src="/images/d.jpg" alt="Zarghoon" style={{width:"100%"}}/>
      <div class="container">
        <h2>Dr.Khan Sab</h2>
        <p class="title">Specialist of Urologist</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>Email: zarghoonhasanzai@example.com</p>
        <p>Cell:  0093785556670</p>
        {/* <p><button class="button">Contact</button></p> */}
      </div>
    </div>
  </div>



  <div class="column">
    <div class="card">
      <img src="/images/d.jpg" alt="Zarghoon" style={{width:"100%"}}/>
      <div class="container">
        <h2>Dr.Khan Sab</h2>
        <p class="title">Specialist of Urologist</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>Email: zarghoonhasanzai@example.com</p>
        <p>Cell:  0093785556670</p>
        {/* <p><button class="button">Contact</button></p> */}
      </div>
    </div>
  </div>


    </div>
            </div>
           
            </div>
            );
        
    }
}
 
export default AboutUs;