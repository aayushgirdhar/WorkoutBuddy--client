import { useEffect } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import axios from "axios";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutDetails from "../components/WorkoutDetails";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/workouts", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (res.statusText === "OK") {
          dispatch({ type: "SET_WORKOUTS", payload: res.data });
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user, dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts.length !== 0 ? (
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))
        ) : (
          <div>No workouts found!</div>
        )}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
