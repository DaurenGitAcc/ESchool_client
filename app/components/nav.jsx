import React from "react";
import { Link } from "react-router-dom";

export default function Nav({changeIsAuthorized}) {

    return <div style={{
        display: "flex",
        justifyContent: "center"
    }}>
        <div >
            <Link to="/students">Главная</Link>
            <Link to="/students/add" style={{ marginLeft: 50 }}>Добавить ученика</Link>
            
        </div>
        <button className="button-7" style={{backgroundColor:"red",marginLeft:100}} onClick={changeIsAuthorized}>Выйти</button>
    </div>;
}