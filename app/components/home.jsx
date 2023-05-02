import React from "react";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";



const Home = () => {
  const [students, setStudents] = useState([])

  const fetchUserData = () => {
    fetch("http://localhost:8080/students")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setStudents(data)
      })
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <div style={{ width: '100%' }}>
      <h2 style={{ textAlign: "center" }}>Список школьников</h2>
      <table style={{ fontSize: '13pt' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Дата рождения</th>
            <th>Телефон</th>
            <th>Детали</th>
          </tr>
        </thead>
        <tbody>
          {students.map(row =>
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.firstname}</td>
              <td>{row.lastname}</td>
              <td>{row.birthDate}</td>
              <td>{row.phoneNumber}</td>
              <td><Link to={'/students/' + row.id}>Подробнее</Link></td>
            </tr>)}
        </tbody>
      </table>
    </div>
  );
}

export default Home;


