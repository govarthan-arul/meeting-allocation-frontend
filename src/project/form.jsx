import Button from "react-bootstrap/Button";
import { Card, Col, Form, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Input from "./input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

function NewForm(props) {
  const building = props.projects.projects;
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState(null);
    const handleChange = (e) => {
        // Destructuring
        const { value, name } = e.target;
        // console.log({name,value});                                                                      
        setFormValues({ ...formValues, [name]: value });
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("hi there",formValues);
        navigate("/room",{state:{fv:formValues}});
      };
    return (
        <Container>
        <h3>Add Meeting</h3>
            <Form onSubmit={handleSubmit}>
                          

              <Row>
                <Col className="w-10">
                  Date
                  
                </Col>
                <Col>
                <Input
                    name="date"
                    type="Date"
                    value={formValues?.quantity}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>Start Time</p>
                  
                </Col>
                <Col>
                <Input
                    name="st_time"
                    id = "time1"
                    type="time"
                    value={formValues?.quantity}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>End Time</p>
                  
                </Col>
                <Col>
                <Input
                    name="en_time"
                    id = "time2"
                    type="time"
                    value={formValues?.quantity}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Form.Select onChange={handleChange} name="building" required                             >
                    <option disabled selected hidden value="">--- Select Building ---</option>
                    {console.log(building)}                                                                    
                    {building?.map((item, i) => {
                      
                      return (
                        <option value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                        
                    
                  </Form.Select>
              
        <Button type="submit">Next</Button>
      </Form>
        </Container>
    );
}
const mapStateToProps = (state) => {
  return {
      projects: state.projects
  }
}

export default connect(mapStateToProps)(NewForm);