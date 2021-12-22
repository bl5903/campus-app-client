import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { addCampusThunk , editCampusThunk } from '../../store/thunks';


class EditCampusContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          name: "",
          description: "",
          imageURL: "",
          address: "",
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

        let campus = {
            name: this.state.name,
            description: this.state.description,
            imageURL: this.state.imageURL,
            address: this.state.address
        };

        if (campus.imageURL.length === 0) {
            campus.imageURL = "https://cdn2.iconfinder.com/data/icons/essential-set-2-1/64/map_location-placeholder-pin-location_1-512.png"
        }

        let editCampus = await this.props.editCampus(campus);

        this.setState({
          name: "",
          description: "",
          imageURL: "",
          address: "",
          redirect: true,
          redirectId: this.state.campusId
        });
    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }

    render() {
        if(this.state.redirect) {
          return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
        }
        return (
          <EditCampusView
            campusInformation = {this.state}
            handleChange = {this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        );
    }
}

const mapDispatch = (dispatch) => {
    return({
      addCampus: (campus) => dispatch(addCampusThunk(campus)),
      editCampus: (campus) => dispatch(editCampusThunk(campus)),
    })
}

export default connect(null, mapDispatch)(EditCampusContainer);
