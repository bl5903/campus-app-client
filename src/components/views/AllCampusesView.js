import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllCampusesView = (props) => {
  const{campuses, deleteCampus} = props;
  if (!props.allCampuses.length) {
    return <div>There are no campuses.</div>;
  }

  return (
    <div>
      {props.allCampuses.map((campus) => (
        <div key={campus.id}>
          <Link to={`/campus/${campus.id}`}>
            <h1>{campus.name}</h1>
          </Link>
          <button onClick={() => deleteCampus(campus.id)}>Delete</button>
          <p>{campus.description}</p>
        </div>
      ))}
      <Link to={`/newCampus`}>
        <button>Add Campus</button>
      </Link>
    </div>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;