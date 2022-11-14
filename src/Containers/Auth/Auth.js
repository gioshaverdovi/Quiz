import React, {Component} from "react";
import Button from "../../Components/UI/Button/Button";
import Input from "../../Components/UI/Input/Input";
import styles from "./Auth.css"
import axios from "axios";

function validateEmail(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLocaleLowerCase())
}
class Auth extends React.Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'enter correct Email!',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'enter correct password!',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }
    loginHandler = async() => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDHEaS7moF1L0-CjfaFqVFH3xAWfeL5sjs', authData)
            console.log(response.data)
        } catch (e){
            console.log(e)
        }
    } 
    registerHandler = async() => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDHEaS7moF1L0-CjfaFqVFH3xAWfeL5sjs', authData)
            console.log(response.data)
        } catch (e){
            console.log(e)
        }
    }
    submitHandler = event => {
        event.preventDefault()
    }
    validateControl(value, validation){
        if (!validation) {
            return true
        }
        let isValid = true
        if (validation.required){
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email){
            isValid = validateEmail(value) && isValid
        }
        if (validation.minLength){
            isValid = value.length >= validation.minLength && isValid
        }
        return isValid
    }
                                    //formControls obieqti sadac shedis mail{...} da paroli {...}
    onChangeHandler = (event, controlName) => {
        //console.log(`${controlName}: `, event.target.value)
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)
        formControls[controlName] = control
        //console.log(control)
        let isFormValid = true
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })
        this.setState({
            formControls, isFormValid
        })
    }
    renderInputs() {                                                 //controlName - email or pass
        return Object.keys(this.state.formControls).map((controlName, index)=>{
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type}  // imeilia tu paroli
                    value={control.value} //xelit rac shemyavs
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }
    render() {
        return (
            <div className="Auth">
                <div>
                    <h1>Authorization</h1>
                    <form onSubmit={this.submitHandler} className="AuthForm">
                        {this.renderInputs()}
                        <Button
                            type="success"
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Log in
                        </Button>

                        <Button
                            type="primary"
                            onClick={this.registerHandler}    
                        >
                            Registration
                        </Button>

                    </form>
                </div>
            </div>
        )
    }
}


export default Auth