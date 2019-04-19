import React, { Component } from 'react';
class OnlineUserBox extends Component{
    generateRommID = (receiver)=>{
        this.props.setReceiver(receiver)
        var arr = []
        const source = this.props.defaultuser
        arr.push(source)
        arr.push(receiver)
        var roomID = arr.sort().toString()
        this.props.setPrivateChat(roomID)
    }
    render(){
        const myUser = this.props.activeuser.map((user) => {
            if(user.name !== this.props.defaultuser){
                return(
                    <div key={user.id} className = "card online-user-box"  onClick = { ()=> this.generateRommID(user.name) }>
                        <div className="card-body">
                            <div className="d-flex flex-row">
                                <div className="p-2">
                                    <img src="https://mbevivino.files.wordpress.com/2011/08/silhouette_orange.jpg"
                                        className="rounded-circle online-user-image" alt=""/>
                                </div>
                                <div className="p-2 user-name">{ user.name }</div>
                            </div>
                            <div className="active-status">active</div>
                        </div>
                    </div>
                )
            }
        })
        return(
            <div>
                <div className="card online-user-card">
                    <div className="home-card-header">
                        <p>Chats</p>
                        <button type="button" className="btn btn-success">Community</button>
                    </div>
                    <div className="card-body">
                        { myUser }
                    </div>
                </div>
            </div>
        )
    }
}

export default (OnlineUserBox)
