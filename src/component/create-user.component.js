import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        // the the this to class
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

    onChangeMsg(data) {
        this.setState({
            msg: data
        });
    }

    update_myview() {
        if (this.state.msg != null) {
            return (
                <p className="alert alert-primary">{this.state.msg}</p>
            )
        }
    }

    onSubmit(e) {
        e.preventDefault();
        
        const user = {
            username: this.state.username
        };

        console.log(user);

        axios.post('http://localhost:4000/users/add', user).then(res =>{
            if(res.data.dup) {
                const msg = 'User alrady created!!';
                this.onChangeMsg(msg)
                return console.log(msg);
            }
            const msg = 'User saved';
            this.onChangeMsg(msg) 
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