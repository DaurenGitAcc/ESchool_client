import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/nav.jsx";
import Home from "./components/home.jsx";
import Add from "./components/add.jsx";
import Login from "./components/login.jsx";
import Detailss from "./components/details.jsx";
import NotFound from "./components/notfound.jsx";
import { useState } from 'react';

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isAuthorized: false };
        this.changeIsAuthorized = this.changeIsAuthorized.bind(this);
    }

    changeIsAuthorized() {
        this.setState({ isAuthorized: !this.state.isAuthorized })
    }

    render() {
        const isAuthorized = this.state.isAuthorized;
        if (isAuthorized) {
            return <div>
                
                <Router>
                <Nav changeIsAuthorized={this.changeIsAuthorized}/>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Routes>
                            <Route path="/students" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={<Home />} />
                            <Route path="/students/:id" element={<Detailss />} />
                            <Route path="/students/add" element={<Add />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </Router>
            </div>
        }
        else {
            return <Login changeIsAuthorized={this.changeIsAuthorized} isAuthorized={this.state.isAuthorized} />
        }
    }
}

ReactDOM.createRoot(
    document.getElementById("app")
)
    .render(
        <LoginControl />
    );