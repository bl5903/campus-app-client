import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewCampusView from '../views/NewCampusView';
import { addStudentThunk } from '../../store/thunks';


class NewCampusContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          name: "",
          description: "",
          imageUrl: "",
          address: "",
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

        let campus = {
            campusname: this.state.name,
            description: this.state.description,
            imageUrl: this.state.imageUrl,
            address: this.state.address,
            campusId: this.state.campusId
        };
        if(campus.imageUrl.length===0){
          campus.imageUrl = "https://www.uc.edu/news/articles/2021/08/n21024100/jcr:content/image.img.cq5dam.thumbnail.500.500.jpg/1628635953156"
        }
        let newCampus = await this.props.addCampus(campus);

        this.setState({
          name: "",
          description: "",
          imageUrl: "",
          address: "",
          campusId: null,
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
        addCampus: (campus) => dispatch(addStudentThunk(campus)),
    })
}

export default connect(null, mapDispatch)(NewCampusContainer);
