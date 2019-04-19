import React, { Component } from 'react'

class OnlineChatBox extends Component{
    constructor(props){
        super(props)
        this.socket = this.props.io
        this.state = {
            message:''
        }

        this.socket.on('receive_message',(data) =>{
            this.props.addMessage(data)
        })
    }

    setMessage  = (event)=>{
        this.setState({message: event.target.value})
    }

    sendMessage = (event)=>{
        event.preventDefault()
        if(this.props.isPrivateChat === true){
            console.log('private message')
            this.socket.emit('private_message',{
                sender: this.props.sender,
                receiver: this.props.receiver,
                message: this.state.message
            })
        }
        else{
            console.log('community message')
            this.socket.emit('send_message',{
                sender: this.props.defaultuser,
                message:this.state.message
            })
        }
        this.setState({message:''})
    }

    render(){
        const { logout } = this.props
        return(
            <div>
                <div className="card online-chat-card">
                    <div className="card-header">
                        <div className="signout-div">
                            <button type="button" className="signout-button" onClick={()=> {logout()}}>Logout</button>
                        </div>
                        <div className="online-user-text">Hie, { this.props.defaultuser }</div>
                    </div>
                    <div className="card-body">
                        { this.props.messages.map(message => {
                            return(
                                <div className = "card message-card">
                                    <div className="row">
                                        <span className="active-user-heading">{ message.sender } : </span>
                                        <span className="active-user-message">{ message.message }</span>
                                    </div>
                                </div>
                            )
                        }) }
                    </div>
                    <div className="card-footers">
                        <div className="form-inline">
                            <input type="text"
                                className="width100 chat-box"
                                placeholder="Type your Message"
                                value={ this.state.message }
                                onChange = { this.setMessage }
                            />
                            <span className="input-group-btn">
                                <button className="btn btn-success rounded-lg"
                                    onClick = { this.sendMessage }>Send
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OnlineChatBox
