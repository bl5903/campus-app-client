import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types";

import EditCampusView from '../views/EditCampusView';
import { editCampusThunk, fetchCampusThunk} from '../../store/thunks';


class EditCampusContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          name: "",
          description: "",
          imageURL: "",
          address: "",
          campus: this.props.campus,
          campusId: this.props.match.params.id,
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
            address: this.state.address,
            id: this.state.campusId
        };

        if (campus.imageURL.length === 0) {
            campus.imageURL = "https://cdn2.iconfinder.com/data/icons/essential-set-2-1/64/map_location-placeholder-pin-location_1-512.png"
        }

        let editCampus = await this.props.editCampus(campus);

          this.setState({
            name: "", 
            imageURL: "", 
            address: "",
            description: "", 
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
      fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
      editCampus: (campus) => dispatch(editCampusThunk(campus)),
    })
}

EditCampusContainer.propTypes = {
  fetchCampus: PropTypes.func.isRequired,
  editCampus: PropTypes.func.isRequired,
};

export default connect(null, mapDispatch)(EditCampusContainer);