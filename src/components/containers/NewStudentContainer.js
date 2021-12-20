import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewStudentView from '../views/NewStudentView';
import { addStudentThunk } from '../../store/thunks';


class NewStudentContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          firstname: "",
          lastname: "",
          imageURL: "",
          email: "",
          gpa: "",
          campusId: null,
          redirect: false,
          redirectId: null
        };
    }

    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleSubmit = async event => {
        event.preventDefault();

        let student = {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          imageURL: this.state.imageURL,
          email: this.state.email,
          gpa: this.state.gpa,
          campusId: this.state.campusId
        };

        if (student.imageURL.length === 0) {
          student.imageURL = "https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg"
        }

        let newStudent = await this.props.addStudent(student);

        this.setState({
          firstname: "",
          lastname: "",
          imageURL: "",
          email: "",
          gpa: "",
          campusId: null,
          redirect: true,
          redirectId: newStudent.id
        });
    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }

    render() {
        if(this.state.redirect) {
          return (<Redirect to={`/student/${this.state.redirectId}`}/>)
        }
        return (
          <NewStudentView
            handleChange = {this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        );
    }
}

const mapDispatch = (dispatch) => {
    return({
        addStudent: (student) => dispatch(addStudentThunk(student)),
    })
}

export default connect(null, mapDispatch)(NewStudentContainer);
