import React, { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in!");
      return;
    }
    try {
      const workout = { title, load, reps };
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/workouts",
        JSON.stringify(workout),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (res.statusText === 200) {
        console.log("New workout added", res.data);
        dispatch({ type: "CREATE_WORKOUT", payload: res.data });
        setTitle("");
        setLoad("");
        setReps("");
        setError("");
        setEmptyFields([]);
      }
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data.error);
      setEmptyFields(err.response.data.emptyFields);
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>
      <label htmlFor="title">Exercise Title:</label>
      <input
        type="text"
        value={title}
        name="title"
        id="title"
        onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label htmlFor="load">Load:</label>
      <input
        type="number"
        value={load}
        name="load"
        id="load"
        onChange={(e) => setLoad(e.target.value)}
        className={emptyFields.includes("load") ? "error" : ""}
      />
      <label htmlFor="reps">Reps:</label>
      <input
        type="number"
        value={reps}
        name="reps"
        id="reps"
        onChange={(e) => setReps(e.target.value)}
        className={emptyFields.includes("reps") ? "error" : ""}
      />
      <button type="submit">Add workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
