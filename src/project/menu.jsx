import Button from "react-bootstrap/Button";
import { Card, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchProjects } from "../redux/project/projectActions";

function Menu(props) {
    const navigate = useNavigate();
    // console.log({props});
    const meeting = props.projects.projects;
    let totalBuilding = 0;
    // const availableRooms = meeting.reduce((acc,croom) => {
    //     return acc + croom?.meetingRooms?.length
    // },0)
    let totalRooms = 0;
    let freeRooms = 0;
    let totalMeetings = 0;
    let ongoingMeetings = 0;
    const compareDate = (dt)=>{
        const date1 = new Date()                                                                                                                                                                            ;
        const temp = dt.split("-");
        const date2 = new Date(temp[0],parseInt(temp[1])-1,temp[2]);
        // console.log("dt",date1,date2,);
        if (date1.getDate() === date2.getDate()) {
            return true;
        }
        else{
            return false;
        }                                
    } 
    const compareTime = (stime,etime)=>{
        const date = new Date();
        const hour = date.getHours();
        const shour = parseInt(stime.split(":")[0])
        const ehour = parseInt(etime.split(":")[0])
        //console.log(hour,shour,ehour);
        if(hour>=shour && hour<=ehour)
        {
            return true;
        }
        else return false;
    }          
    meeting.map((building) => {
        if(building.meetingRooms)                                   
        {
            ++totalBuilding;
            building.meetingRooms.map((room) => {
                ++totalRooms;
                if(room.meetings.length)
                {
                    let flag = false;
                    room.meetings.map((meet)=>{
                        // console.log("am in",meet);
                        if(compareDate(meet.date))
                        {
                            ++totalMeetings;           
                            if(compareTime(meet.startTime,meet.endTime)){
                                ++ongoingMeetings;                                                                                                   
                            }
                            else{
                                flag = true;
                            }
                        }
                        else{
                            flag = true;
                        }
                    })
                    flag && ++freeRooms;
                }
                else
                {
                    ++freeRooms;
                }
            })                                                                                                                                                                
        }
        // console.log({freeRooms});          
    }) 
                                                                                                                                    
    useEffect(()=> {
        props.fetchProjectsData();
      },[])
    return (
        <Container>
            <h3>Building Info</h3>
            <Card  >
                <Card.Body >
                    <Card.Title> <h5>Buildings</h5></Card.Title>
                    <Card.Text >
                        <h6>Total {totalBuilding}</h6>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card  >
                <Card.Body >
                    <Card.Title> <h5>Rooms</h5></Card.Title>
                    <Card.Text >
                        <h6>Total {totalRooms}</h6>
                        <h6>Free Now {freeRooms}</h6>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card  >
                <Card.Body >
                    <Card.Title> <h5>Meetings</h5></Card.Title>
                    <Card.Text >
                        <h6>Total {totalMeetings} today</h6>
                        <h6>Total {ongoingMeetings} going on now</h6>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Button onClick={() => navigate("/form")} > Add a Meeting</Button>
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
        fetchProjectsData: () => dispatch(fetchProjects())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Menu);