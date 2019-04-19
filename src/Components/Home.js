import React, {Component} from 'react'
import OnlineChatBox from './OnlineChatBox'
import OnlineUserBox from './OnlineUserBox'
import Login from './Login'

import {createuser} from '../Factories'
import io from 'socket.io-client'

const socketUrl = "http://localhost:3232"

class Home extends Component{
    constructor(props){
        super(props)
        this.socket = io(socketUrl)
        this.state = {
            socket:null,
            user:null,
            activeuser:[],
            isPrivateChat:null,
            roomID:null,
            messages:[],
            reciever:null
        }
        this.setPrivateChat = (roomID) =>{
            const newState = this.state
            newState.isPrivateChat = true
            newState.roomID = roomID
            newState.messages = []
            this.setState({newState})
            console.log(this.state)
            this.socket.emit('room',roomID)
        }
    }

    addMessage = (data)=>{
        this.setState({messages:[...this.state.messages,data]})
    }

    componentWillMount(){
        this.initSocket()
    }

    setUser = (userState)=>{
        const {socket} = this.state
        socket.on('connect',()=>{
            const createUser = createuser(userState,socket.id)
            socket.emit('user_connected', createUser)
            let newState = this.state
            newState.user = userState
            this.setState(newState)
        })
    }

    setReceiver = (destination)=>{
        let newState = this.state
        newState.receiver = destination
        this.setState(newState)
    }

    initSocket = ()=>{
        let newState = this.state
        newState.socket = this.socket
        this.setState(newState)
        this.setUser(this.props.activeuser)
        this.socket.on('user_connected',(users)=>{
            let activeuser = []
            for(var i=0;i < users.length;i++){
                    activeuser.push(users[i])
            }
            this.setState({activeuser})
        })
    }

    logout = ()=>{
        const {socket} = this.state
        socket.emit('logout',{
            user: this.state.user,
            activeuser: this.state.activeuser
        })
        this.setState({user:null})
    }

    render(){
        if(!this.state.user){
            return <Login />
        }
        return(
            <div className="fluid-container home">
                <div className="row">
                    <div className="col-lg-4 col-md-4">
                        <OnlineUserBox
                            activeuser = { this.state.activeuser }
                            defaultuser = { this.state.user }
                            setPrivateChat = { this.setPrivateChat }
                            setReceiver = { this.setReceiver }
                            />
                    </div>
                    <div className="col-lg-8 col-md-8">
                        <OnlineChatBox
                            activeuser = { this.props.activeuser }
                            logout = { this.logout }
                            defaultuser = { this.state.user }
                            isPrivateChat = { this.state.isPrivateChat }
                            addMessage = { this.addMessage }
                            messages = { this.state.messages }
                            receiver = { this.state.receiver }
                            sender = { this.state.user }
                            io = {this.socket}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
