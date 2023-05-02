import React from "react";
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const Details = props => {
  const [student, setStudent] = useState([])

  const { id } = useParams();
  const navigate = useNavigate();


  const fetchUserData = () => {
    fetch("http://localhost:8080/students/" + id)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setStudent(data)
      })
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const deleteStudent = () => {
    fetch('http://localhost:8080/students/' + id + '/delete', {
      method: 'POST'
    });

    navigate('/students')

  }

  return (

    <div style={{marginTop:40}}>
      <p>{"Идентификатор учащегося: "}<span style={{fontWeight:"bold"}}>{student.id}</span></p>
      <p>{"Имя: "}<span style={{fontWeight:"bold"}}>{student.firstname}</span></p>
      <p>{"Фамилия: "}<span style={{fontWeight:"bold"}}>{student.lastname}</span></p>
      <p>{"Дата рождения: "}<span style={{fontWeight:"bold"}}>{student.birthDate}</span></p>
      <p>{"Номер телефона: "}<span style={{fontWeight:"bold"}}>{student.phoneNumber}</span></p>
    
      <button onClick={deleteStudent} className="button-7" style={{marginTop:20,backgroundColor:"red",marginLeft:70}}>Удалить</button>
    </div>


  );
}

export default Details;


