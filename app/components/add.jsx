import React from "react";
import { Navigate, useNavigation } from 'react-router-dom';
import { Redirect } from 'react-router-dom'



export default class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "", lastname: "",phoneNumber:"", birthDate: Date.now(), redirect: false,
            firstnameValid: false, lastnameValid: false,phoneNumberValid: false, birthDateValid: false
        };

        this.onChange = this.onChange.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeBirthdate = this.onChangeBirthdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChange(e) {
        var val = e.target.value;
        var valid = this.validateFirstname(val);
        this.setState({ firstname: val, firstnameValid: valid });
    }
    onChangeLastname(e) {
        var val = e.target.value;
        var valid = this.validateLastname(val);
        this.setState({ lastname: val, lastnameValid: valid });
    }
    onChangePhoneNumber(e) {
        var val = e.target.value;
        var valid = this.validatePhoneNumber(val);
        this.setState({ phoneNumber: val, phoneNumberValid: valid });
    }
    onChangeBirthdate(e) {
        var val = e.target.value;
        var valid = this.validateBirthDate(val);
        this.setState({ birthDate: val, birthDateValid: valid });
    }

    validateFirstname(firstname) {
        return firstname.length >= 1;
    }
    validateLastname(lastname) {
        return lastname.length >= 1;
    }
    validatePhoneNumber(phonenumber) {

        return phonenumber.length === 11 && this.isNumeric(phonenumber);
    }
    validateBirthDate(birthDate) {
        console.log(new Date(birthDate).getTime() / 1000+" | "+Date.now()/1000);
        return new Date(birthDate).getTime()<Date.now();
    }
    isNumeric(str) {
        if (typeof str != "string") return false 
        return !isNaN(str) && !isNaN(parseFloat(str)) ;
    }

    handleSubmit(e) {
        e.preventDefault();

        if(this.state.firstnameValid ===true && this.state.lastnameValid===true && this.state.phoneNumberValid===true && this.state.birthDateValid===true){
            fetch('http://localhost:8080/students/add', {
                method: 'POST',
                body: JSON.stringify({
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    phoneNumber: this.state.phoneNumber,
                    birthDate: this.state.birthDate,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
    
            this.setState({ redirect: true })
        }
        else{
            alert("Повторите попытку.\nВведенные данные не соответствуют требованиям!")
        }
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Navigate to='/students'></Navigate>;
        }

        var firstnameColor = this.state.firstnameValid === true ? "green" : "red";
        var lastnameColor = this.state.lastnameValid === true ? "green" : "red";
        var birthdateColor = this.state.birthDateValid === true ? "green" : "red";
        var phoneNumberColor = this.state.phoneNumberValid === true ? "green" : "red";
        return (
            <form onSubmit={this.handleSubmit}>
                <p>
                    <label>Имя:</label><br />
                    <input type="text" value={this.state.firstname} onChange={this.onChange} style={{borderColor:firstnameColor}}/>
                </p>
                <p>
                    <label>Фамилия:</label><br />
                    <input type="text" value={this.state.lastname} onChange={this.onChangeLastname} style={{borderColor:lastnameColor}}/>
                </p>
                <p>
                    <label>Номер телефона:</label><br />
                    <input type="text" value={this.state.phoneNumber} onChange={this.onChangePhoneNumber} style={{borderColor:phoneNumberColor}}/>
                </p>
                <p>
                    <label>Дата рождения:</label><br />
                    <input type="date" value={this.state.birthDate} onChange={this.onChangeBirthdate} style={{borderColor:birthdateColor}}/>
                </p>

                <input type="submit" className="button-7" value="Добавить" />
            </form>
        );
    }
}