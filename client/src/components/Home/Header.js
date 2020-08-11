import React, { useState, useEffect } from 'react'
import {Container, Row, Col, Dropdown} from 'react-bootstrap';
import { Link, useHistory, NavLink } from 'react-router-dom'
import Location from '../Location'
import SpecDropdown from '../specialityDropdown'
import HosLocation from '../Hospitals/HosLocation'


import { Role } from '../../Admin/_helpers/index';
import { accountService } from '../../Admin/_services/index';
import './Header.css';
import Footer from '../Footer';

const Header = () => {
  let [input, setInput] = useState('');
  let history = useHistory();
  const [user, setUser] = useState({});

  useEffect(() => {
      const subscription = accountService.user.subscribe(x => setUser(x));
      return subscription.unsubscribe;
  }, []);
  const handleSearch =()=> {
    history.push("/search?q=" + input)
  }
    return (
        <div style={{width: '100%'}}>
        
        <Container >
        <Row className="headr" >           
              <Col md={3}>
              <Link to={'/'}>
                    <img src="/images/best2.png"  alt="Afghan Hospital Logo" style={{ width:'70px',height:'50px'}}/>
                
                </Link>
              </Col>
              {/* <Col md={2}>
                <Location />
              </Col> */}
              <Col md={6}>
              <input type="text" id="search_bar" className="u-full-width" name="q" autoComplete="off" placeholder="Search for hospitals, doctors..." 
                        style={{boxshadow: "1px 1px 10px #eee", marginTop: 10, border: "1px solid #00b3d8",width:"100%" }}
                        value={input}
                        
                        onChange={(e) => setInput(e.target.value)}
                        />
                        <button onClick={handleSearch}>search</button>
              </Col>
              <Col md={1}>
              <div style={{paddingtop:"10px"}} className="dropdown1" >
                    <a href="#" className="text-decoration-none">
                      <Dropdown style={{marginLeft: 160}}>
                      <Dropdown.Toggle  style={{backgroundColor:"#9cec9e",border:"none"}} id="dropdown-basic">
                        <img className="dropbtn" style={{verticalalign: "middle", paddingright: "0"}} src="https://s3.ap-south-1.amazonaws.com/marham-web/assets/images/user.png" height="30" width="30" alt="logo"/>
                        </Dropdown.Toggle>

                        
                        <Dropdown.Menu>
                        <Dropdown.Item ><Link exact to="/" style={{textDecoration: 'none'}} >Home</Link> </Dropdown.Item >
                        {user &&
                          <Dropdown.Item ><Link  to="/profile" style={{textDecoration: 'none'}} >Profile</Link></Dropdown.Item>
                        }
                        {user && user.role === Role.Admin &&
                          <Dropdown.Item ><Link  to="/admin" style={{textDecoration: 'none'}} >Admin</Link></Dropdown.Item>
                        }
                        {user  ?
                        <a onClick={accountService.logout} style={{textDecoration: 'none'}} >Logout</a>
                        :
                        <Dropdown.Item ><Link  to="/account/login" style={{textDecoration: 'none'}} >Login</Link></Dropdown.Item>
                        }
                          {//<Dropdown.Item ><Link style={{textDecoration: 'none'}} to={'/login'}>Login</Link></Dropdown.Item>
                      }<Dropdown.Item><Link style={{textDecoration: 'none'}} to={'/doctor-registration'}>Doctor Register</Link></Dropdown.Item>
                          <Dropdown.Item><Link style={{textDecoration: 'none'}} to={'/hospital-registration'}>Hospital Register</Link></Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                        
                    </a>
                </div>
              </Col> 
        </Row>
    
        </Container>
   
    <div className="topHeader">
    <Container  >
      <Row>
        <Col>
        <Link  style={{marginTop:50,color:'black',border:"none",textDecoration:"none"}} to={'/'} ><h6 className="position">Home</h6></Link>
        </Col>
      <Col >
        <SpecDropdown />
        </Col>
      <Col >
        <HosLocation />
        </Col>
      <Col >
      <Dropdown>
          <Dropdown.Toggle  style={{backgroundColor:"#9cec9e",border:"none",color:'black'}} id="dropdown-basic">
           Menu
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item><Link style={{textDecoration: 'none'}} to={'/doctor'}>List of Doctors</Link></Dropdown.Item>
            <Dropdown.Item><Link style={{textDecoration: 'none'}} to={'/hospital'}>List of Hospitals</Link></Dropdown.Item>
            {/* <Dropdown.Item><Link to={'/AboutUS'}>AboutUs</Link></Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
        
        


      </Col>
      <Col>
        <Link  style={{marginTop:10,color:'black',border:"none",textDecoration:"none"}} to={'/AboutUs'}><h6 className="position">About Us</h6></Link>
        
        </Col>
        <Col>
        <Link className="st"  style={{textDecoration: 'none',marginTop:10,color:'black',border:"none",textAlign:'center'}} to={'/OurPolicy'}><h6 className="position">Our Policy</h6></Link>
        
        </Col>

      </Row>
  </Container>
  </div>

  </div>
 
    )
}

export default Header;