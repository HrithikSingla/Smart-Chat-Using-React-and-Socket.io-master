import React, {Component} from 'react'
import axios from 'axios'

class Signup extends Component{
    constructor(props){
        super(props)
        this.state = {
            signupusername:"",
            signuppassword:"",
            signupconfirmpass:"",
            usernameError:"",
            passwordError:"",
            confirmPasswordError:"",
            errorMessages:""
        }
    }

    validate = () =>{
        let isTrue = true
        let usernameError = ""
        if(this.state.signupusername.length < 4){
            usernameError = "Username length should be more than 4"
        }
        if(this.state.signupusername === ""){
            usernameError = "Required Username"
        }
        if(usernameError){
            this.setState({usernameError})
            isTrue = false
        }

        let passwordError = ""
        if(this.state.signuppassword.length < 6){
            passwordError = "Password length should be more than 6"
        }
        if(this.state.signuppassword === ""){
            passwordError = "Required Password"
        }
        if(passwordError){
            this.setState({passwordError})
            isTrue = false
        }

        let confirmPasswordError = ""
        if(this.state.signuppassword !== this.state.signupconfirmpass){
            confirmPasswordError = "Password not matched"
        }
        if(this.state.signupconfPassword === ""){
            passwordError = "Required Password"
        }
        if(confirmPasswordError){
            this.setState({confirmPasswordError})
            isTrue = false
        }
        return isTrue
    }

    getSignData = (event) =>{
        event.preventDefault()
        const _this = this
        let newState = this.state
        newState.signupusername = event.target.elements.signupusername.value
        newState.signuppassword = event.target.elements.signuppassword.value
        newState.signupconfirmpass = event.target.elements.signupconfPassword.value
        this.setState(newState)
        const isValid = this.validate()
        if(isValid){
            const data = {
                username:this.state.signupusername,
                password:this.state.signuppassword

            }
            axios.post('/server/userdetails',data)
            .then((res)=>{
                if(res.data.isSignUpSucessful === true){
                    _this.props.history.push('/Login')
                }
                else{
                    this.setState({errorMessages:'Username already Existed'})
                    console.log(this.state)
                    _this.props.history.push('/Signup')
                }
            })
        }
    }
    render(){
        return(
            <div>
                <div className="container signup-container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <img src="./login.png" alt="login" width="100%" height="100%" />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="signup-content">
                                <h4 className="signup-heading">Sign Up</h4>
                                {this.state.errorMessages ? (
                                    <div className="alert alert-danger">
                                        { this.state.errorMessages }
                                    </div>
                                ) : null}
                                <form name="signupForm" onSubmit={this.getSignData}>
                                    <div className="form-group">
                                        <label htmlFor="signupusername">Username</label>
                                        { this.state.usernameError ? (
                                            <div className="error-message">
                                                * {this.state.usernameError}
                                            </div>
                                        ) : null }
                                        <input
                                            id="signupusername"
                                            type="text"
                                            placeholder="Enter your username"
                                            name="signupusername"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="signuppassword">Password</label>
                                        { this.state.passwordError ? (
                                            <div className="error-message">
                                                * {this.state.passwordError}
                                            </div>
                                        ) : null }
                                        <input
                                            id="signuppassword"
                                            type="password"
                                            placeholder="Enter your password"
                                            name="signuppassword" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="signupconfPassword">Confirm Password</label>
                                        { this.state.confirmPasswordError ? (
                                            <div className="error-message">
                                                * {this.state.confirmPasswordError}
                                            </div>
                                        ) : null }
                                        <input id="signupconfPassword"
                                            type="password"
                                            placeholder="Re enter your password"
                                            name="signupconfPassword" />
                                    </div>
                                    <button type="submit" className="submitButton">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup
