import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class EditExercise extends Component {

    constructor(props) {
        super(props);
        // the the this to class
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        };
    }

    // methods

    componentDidMount() {
        axios.get('http://localhost:4000/exercise/'+ this.props.match.params.id)
        .then(res =>{
            this.setState({
                username: res.data.username,
                description: res.data.description,
                duration: res.data.duration,
                date: new Date(res.data.date)
            });
        })
        .catch(err => console.log(err));
        // fetch all users from the backend
        axios.get('http://localhost:4000/users/')
        .then(res =>{
            if (res.data.length > 0) {
                this.setState({
                    users: res.data.map(user =>{ return user.username })
                });
            }
        })
        .catch(res => console.log(res.data));
    }

    onChangeUsername(e) {
        this.setState({     //update state 
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({     //update state 
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({     //update state 
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({     //update state 
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        };

        console.log(exercise);
        axios.post('http://localhost:4000/exercise/update/'+this.props.match.params.id, exercise)
        .then(res => {
            console.log(res.data);
        })
        .catch(res => {
            console.log(res.data);  
        });
        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput" required className="form-control" value={this.state.username} onChange={this.onChangeUsername}>
                            {
                                this.state.users.map((user) =>{
                                    return (
                                        <option key={user} value={user}>{user}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text" required className="form-control" value={this.state.description} onChange={this.onChangeDescription}/>
                    </div>
                    <div className="form-group">
                        <label>Duration (in min): </label>
                        <input type="text" required className="form-control" value={this.state.duration} onChange={this.onChangeDuration}/>
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker selected={this.state.date} onChange={this.onChangeDate}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}