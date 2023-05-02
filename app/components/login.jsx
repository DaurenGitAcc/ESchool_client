import React from "react";
import { Navigate, useNavigation } from 'react-router-dom';
import { Redirect } from 'react-router-dom'



export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "", password: "", redirect: false,
            loginValid: false, passwordValid: false,changeIsAuthorized:this.props.changeIsAuthorized
        };
        
        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChangeLogin(e) {
        var val = e.target.value;
        var valid = this.validateLogin(val);
        this.setState({ login: val, loginValid: valid });
    }
    onChangePassword(e) {
        var val = e.target.value;
        var valid = this.validatePassword(val);
        this.setState({ password: val, passwordValid: valid });
    }
    

    validateLogin(login) {
        return login.length >= 5;
    }
    validatePassword(password) {
        return password.length >= 5;
    }
    
    handleSubmit(e) {
        e.preventDefault();

        if(this.state.loginValid ===true && this.state.passwordValid===true &&
            this.state.login=="admin" && this.state.password=="qweqwe"){

                this.state.changeIsAuthorized();
        }
        else{
            alert("Повторите попытку.\nВведенные введенный логин или пароль неверный!")
        }
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Navigate to='/students'></Navigate>;
        }

        var loginColor = this.state.loginValid === true ? "green" : "red";
        var passwordColor = this.state.passwordValid === true ? "green" : "red";

        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
        
            <form onSubmit={this.handleSubmit}>
                <h2 style={{marginLeft:50}}>Вход</h2>
                <p>
                    <label>Логин:</label><br />
                    <input type="text" value={this.state.login} onChange={this.onChangeLogin} style={{borderColor:loginColor}}/>
                </p>
                <p>
                    <label>Пароль:</label><br />
                    <input type="password" value={this.state.password} onChange={this.onChangePassword} style={{borderColor:passwordColor}}/>
                </p>
                
                <input style={{marginLeft:50}} type="submit" className="button-7" value="Войти" />
            </form>
            </div>
        );
    }
}