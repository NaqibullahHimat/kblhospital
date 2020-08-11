import React, { Component } from 'react';
import './Footer.css'

const Footer=()=>{


        return ( 
              
                


            <footer className="footer-distributed">

			<div className="footer-left">
          <img className='image' src="/images/best2.png" />
				<h3>About<span>Kabul Hospitals</span></h3>

				<p className="footer-links">
				<a href="./Home">Home</a>
                    &nbsp;	||  &nbsp;
                   
					<a href="./OurPolicy">Our Policy</a>
					&nbsp;||&nbsp;
					<a href="./AboutUs">About</a>
				</p>

				<p className="footer-company-name">© 2020 Kabul Hospitals service.</p>
			</div>

			<div className="footer-center">
				<div>
					<i className="fa fa-map-marker"></i>
                    
					  <p><span><h5>Address:</h5> Masood Square, Wazir Akbar khan Road, Kabul, Afghanistan</span>
                      <h4>Contact us:</h4>
                      Phone: 0093202301374,</p>
				</div>

				<div>
					<i className="fa fa-phone"></i>
					<p>0093789990909</p>
				</div>
				<div>
					<i className="fa fa-envelope"></i>
					<p><a href="mailto:info@moph.gov.af">Email: info@moph.gov.af</a></p>
				</div>
			</div>
			<div className="footer-right">
				<p className="footer-company-about">
					<span>About the Devoloper</span>
				We are devoloping websites using new technology full MERN stack.</p>
				
			</div>
		</footer>

       

         );
    }

 
export default Footer;