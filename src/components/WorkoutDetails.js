import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    try {
      const res = await axios.delete(
        process.env.REACT_APP_API_URL + `/workouts/${workout._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(res.data._id);
      if (res.statusText === "OK") {
        dispatch({ action: "DELETE_WORKOUT", payload: res.data._id });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span onClick={handleClick}>
        <DeleteIcon />
      </span>
    </div>
  );
};

export default WorkoutDetails;
