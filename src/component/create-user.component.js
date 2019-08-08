import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        // set this to class
        this.onChangeUsername = this.onChangeUsername.bind(this);
        // this.onChangeMsg = this.onChangeMsg.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            msg: null
        };
    }


    // methods
    onChangeUsername(e) {
        this.setState({     //update state 
            username: e.target.value
        });
    }

    onChangeMsg(data, pass) {
        this.setState({
            msg: {data, pass}
        });
    }

    update_myview() {
        if (this.state.msg != null) {
            if (this.state.msg.pass) {
                return (
                    <div class="alert alert-success" role="alert">{this.state.msg.data}</div>
                )
            }
            return (
                <div class="alert alert-danger" role="alert">{this.state.msg.data}</div>
            )
        }
    }

    onSubmit(e) {
        e.preventDefault();
        
        const user = {
            username: this.state.username
        };

        console.log(user);
        // send  user object to backend
        axios.post('http://localhost:4000/users/add', user).then(res =>{
            if(res.data.dup) {  // check if user is already created in the database
                const msg = 'User alrady created!!';
                this.onChangeMsg(msg, false)    // false indicates unsuccessful action => the new user was not created
                return console.log(msg);
            }
            const msg = 'User saved';
            this.onChangeMsg(msg, true)     // true indicates successful action => the new user was created
            console.log(msg, res.data);
        }).catch(err => console.log(err));

        setTimeout(() =>{
            this.setState({
                msg: null
            })
        }, 3000);

        this.setState({
            username: ''
        });
    }


    render() {
        return (
            <div>
            <h3>Create New User Log</h3>
            { this.update_myview() }
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text" required className="form-control" value={this.state.username} onChange={this.onChangeUsername} />
                </div>
                <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary"/>
                </div>
            </form>
        </div>
        )
    }
}