import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewCampusView from '../views/NewCampusView';
import { addCampusThunk } from '../../store/thunks';


class NewCampusContainer extends Component {
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

        let newCampus = await this.props.addCampus(campus);

        this.setState({
          name: "",
          description: "",
          imageURL: "",
          address: "",
          redirect: true,
          redirectId: newCampus.id
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
          <NewCampusView
            handleChange = {this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        );
    }
}

const mapDispatch = (dispatch) => {
    return({
        addCampus: (campus) => dispatch(addCampusThunk(campus)),
    })
}

export default connect(null, mapDispatch)(NewCampusContainer);
