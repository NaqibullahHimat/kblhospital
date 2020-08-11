import React, {useState, useEffect} from 'react'
import {baseUrl} from '../baseUrl'
import {Row, Col, Container} from 'react-bootstrap'
import axios from 'axios'

const SelectLoaction = props => {
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);
    let [selectedCity, setSelectedCity] = useState('Lahore');
    let [selectedArea, setSelectedArea] = useState('');

    const getCityUrl = baseUrl + '/location/cities';
    const getAreaUrl = baseUrl + '/location/' + selectedCity;
    
    useEffect(() => {
        const fetchCity = async (selectedCity) => {
            try{
            const result = await axios(getCityUrl);
            setCities(result.data);
            console.log(result.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchCity();
    }, []);

    useEffect(() => {
        const fetchAreas = async (selectedCity) => {
            try{
                const result = await axios(getAreaUrl);
                setAreas(result.data);
                console.log(result.data);
            }catch (error) {
                console.log(error.message);
            }
        }
        fetchAreas();
    }, [selectedCity]);

     let handleCityChanged = event => {
        setSelectedCity(event.target.value)
        console.log("area city ", event.target.value);
     }

     let handleAreaChanged = event => {
         setSelectedArea(event.target.value)
         console.log("area selected ", event.target.value);
     }
     
    return(
        <form>
        <Container>
        <Row>
        <Col>
        <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Select City</label>
                <select className="form-control" id="exampleFormControlSelect1" value={selectedCity}  
                onChange={handleCityChanged}>
                {
                    cities.map(city => 
                        <option key={city._id} value={city.name} >{city.name}</option>
                        )
                }
                </select>
            </div>
        </Col>
        <Col>
            <div className="form-group">
                <label for="exampleFormControlSelect1">Select Area</label>
                <select className="form-control" id="exampleFormControlSelect1"
                    onChange={handleAreaChanged}>
                {
                    areas.map(cityArea => 
                        <option>{cityArea.name}</option>
                    )
                }
                </select>
            </div>
         </Col>

        </Row>
        </Container>
        
    </form>
    
    )
}

export default SelectLoaction;