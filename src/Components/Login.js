import React, { Component } from 'react'
import axios from 'axios'
import Home from './Home'

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            loginusername:"",
            loginpassword:"",
            loginUsernameError:"",
            loginPasswordError:"",
            activeUser:"",
            isLogin:false,
            authenticationError:null
        }
    }

    loginValid = ()=>{
        let isTrue = true
        let loginUsernameError=""
        if(this.state.loginusername === ""){
            loginUsernameError = "Required Field"
        }
        if(loginUsernameError){
            this.setState({loginUsernameError})
            isTrue = false
        }

        let loginPasswordError=""
        if(this.state.loginpassword === ""){
            loginPasswordError = "Required Field"
        }
        if(loginPasswordError){
            this.setState({loginPasswordError})
            isTrue = false
        }
        return isTrue
    }

    getLoginData = (event) =>{
        event.preventDefault()
        let newState = this.state
        newState.loginusername = event.target.elements.loginusername.value
        newState.loginpassword = event.target.elements.loginpassword.value
        this.setState(newState)
        const isLoginValid = this.loginValid()
        if(isLoginValid){
            const data = {
                username: this.state.loginusername,
                password: this.state.loginpassword
            }
            axios.post('/server/logindetails',data)
            .then((res)=>{
                if(res.data.isLoginSuccessfull === true){
                    this.setState({isLogin:true})
                }
                else{
                    this.setState({authenticationError:"Invalid username or password"})
                }
            })
        }
    }

    render(){
        if(this.state.isLogin === true){
            return <Home activeuser = {this.state.loginusername} />
        }
        return(
            <div className="fluid-container">
                <div className="container">
                    <p className="project-title">Smart Chat</p>
                    <div className="card login-card">
                        {this.state.authenticationError ? (
                            <div className="alert alert-danger">
                                { this.state.authenticationError }
                            </div>
                        ) : null}
                        <h3 className="login-card-title">Login</h3>
                        <div className="login-card-text">
                            <form name="loginForm" action="#" onSubmit={this.getLoginData}>
                                <label htmlFor="loginusername">Username</label>
                                <input
                                    id="loginusername"
                                    type="text"
                                    name="loginusername"
                                    placeholder="Type your Username"/>
                                {this.state.loginUsernameError ? (
                                    <div className = "error-message">
                                        * {this.state.loginUsernameError}
                                    </div>
                                ) : null }
                                <label htmlFor="loginpassword">Password</label>
                                <input
                                    type="password"
                                    id="loginpassword"
                                    name="loginpassword"
                                    placeholder="Type your Password"/>
                                {this.state.loginPasswordError ? (
                                    <div className="error-message">
                                        * {this.state.loginPasswordError}
                                    </div>
                                ) : null}
                                <p><a href="/Signup">Forget Password? </a><a href="/Signup">Sign up</a></p>
                                <button className="btn btn-block login-card-button" type="submit">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login
