import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// functional react compoment
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={`/edit/${props.exercise._id}`}>edit</Link> | <a href="#" onClick={() => {props.deleteExercise(props.exercise._id)}}>delete</a>
        </td>
    </tr>

)

export default class ExerciseList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {
            exercise: []
        };

    }

    componentDidMount() {
        axios.get('http://localhost:4000/exercise')
        .then(res => {
            this.setState({
                exercise: res.data
            });
        }).catch(err => console.log("Error: " + err));
    }

    deleteExercise(id) {
        axios.delete('http://localhost:4000/exercise/' + id)
        .then(res => console.log(res.data))
        .catch(err => console.log("Error: " + err));

        this.setState({
            exercise: this.state.exercise.filter(ex => {return ex._id !== id})
        });
    }

    exerciseList() {
        return this.state.exercise.map(currentEx => {
            return <Exercise exercise={currentEx} deleteExercise={this.deleteExercise} key={currentEx._id} />
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercise</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>

        )
    }
}