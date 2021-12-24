import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types";

import EditStudentView from '../views/EditStudentView';
import { fetchStudentThunk , editStudentThunk } from '../../store/thunks';


class EditStudentContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          firstname: "",
          lastname: "",
          imageURL: "",
          email: "",
          gpa: "",
          student: this.props.student,
          studentId: this.props.match.params.id,
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
          id: this.state.campusId
        };

        if (student.imageURL.length === 0) {
          student.imageURL = "https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg"
        }

        let editStudent = await this.props.editStudent(student);

        this.setState({
          firstname: "",
          lastname: "",
          imageURL: "",
          email: "",
          gpa: "",
          redirect: true,
          redirectId: this.state.campusId
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
          <EditStudentView
            studentInformation = {this.state}
            handleChange = {this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        );
    }
}

const mapState = (state) => {
  return {
    student: state.student,
  };
};

const mapDispatch = (dispatch) => {
    return({
        fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
        editStudent: (student) => dispatch(editStudentThunk(student)),
    })
}

EditStudentContainer.propTypes = {
  fetchStudent: PropTypes.func.isRequired,
  editStudent: PropTypes.func.isRequired,
};

export default connect(mapState, mapDispatch)(EditStudentContainer);
