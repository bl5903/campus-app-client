import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    fontType: 'bold',
    fontFamily: 'Courier, sans-serif',
    fontSize: '35px',
    color: '#EAE0D5'
  },
  appBar:{
    backgroundColor: '#087E8B',
    shadows: ['none'],
  },
  greeting:{
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: "50%",
    margin: "auto",
  },
  links:{
    textDecoration: 'none',
  }

}));

const CampusView = (props) => {
  const classes = useStyles();
  const {campus} = props;
  if (campus.students.length === 0)
    return("No students");
  return (
    <div>
      <h1>{campus.name}</h1>
      <img src={campus.imageUrl} alt= "campus image"/>
      <p>{campus.description}</p>
      <p>{campus.address}</p>
      <ul>
      {campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <li key={student.id}>{name}</li>
        );
      })}
      </ul>
    </div>
  );

};

export default CampusView;
