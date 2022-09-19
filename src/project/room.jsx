import Button from "react-bootstrap/Button";
import { Card, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { connect } from "react-redux";
import { updateProject } from "../redux/project/projectActions";

function Room(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const meeting = location.state.fv
    const building =  props.projects.projects;  
    const selectedBuilding = building.length && building?.find((item) =>  item.id == meeting.building);
    // console.log(meeting,selectedBuilding);
    const compareDate = (room)=>{
        const temp1 = meeting.date.split('-');
        const date1 = new Date(temp1[0],parseInt(temp1[1])-1,temp1[2]);
        let flag  = false;
        room.meetings.length && room.meetings.map((r) =>{                                                                                                                                                                                      ;
            const temp2 = r.date.split("-");
            const date2 = new Date(temp2[0],parseInt(temp2[1])-1,temp2[2]);
            // console.log("dt",date1.getDate(),date1.getMonth(),date1.getFullYear(),date2.getDate(),date2.getMonth(),date2.getFullYear());
            if (date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()) {
                let startHour = r.startTime.split(':')[0];
                let endHour = r.endTime.split(':')[0]
                let stHour = meeting.st_time.split(':')[0];
                let enHour = meeting.en_time.split(':')[0]
                console.log(startHour,endHour,stHour,enHour);
                if((startHour <= stHour && endHour >= stHour) || (startHour <= enHour && endHour >= enHour))
                {
                    flag = true;
                }
                
            }
        })
        console.log({flag});
        if (!flag) {
            return true;
        }
        else{
            return false;
        }                                
    }                                                                                                        
    const selectedRooms = selectedBuilding.meetingRooms.filter((room) => {
        return compareDate(room);
    })
    console.log({selectedRooms});                                                                                   
    
    // console.log({selectedBuilding});                                                                                
    const handleMeet = (room) => {
        console.log("booked",room,meeting);
        const postData = {
            "roomId":room.id,
            "title": "Booked for Conference",
            "date": meeting.date,
            "startTime": meeting.st_time,
            "endTime": meeting.en_time
        }
        props.updateProjectsData(selectedBuilding.id,postData);
        alert('Meeting booked Succesfully');
        // window.location.href = "http://localhost:3000/";
    }
    return (
        <Container>
        {selectedRooms?.length ? (<>
            <h3>Please select one of the rooms</h3>
            {selectedRooms?.map((room) => 
            <Card  onClick={() => handleMeet(room)} >
                <Card.Body >
                    <Card.Title> <h5>{room.name}</h5></Card.Title>
                    <Card.Text >
                        <h6>{selectedBuilding?.name}</h6>
                        <h6>Floor {room.floor}</h6>
                    </Card.Text>
                </Card.Body>
            </Card>
            )}
           </>
           ):( <h3>Rooms not available for the required time</h3>)} 
        </Container>
    );
}
const mapStateToProps = (state) => {
    return {
        projects: state.projects
    }
  }
const mapDispatchToProps = (dispatch) => {
    return {
        updateProjectsData: (id,postData) => dispatch(updateProject(id,postData))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Room);