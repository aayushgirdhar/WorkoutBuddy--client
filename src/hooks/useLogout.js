import { useWorkoutContext } from "./useWorkoutContext";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutDispatch } = useWorkoutContext();
  const logout = () => {
    localStorage.removeItem("user");
    workoutDispatch({ type: "SET_WORKOUTS", payload: [] });
    dispatch({ type: "LOGOUT" });
  };
  return { logout };
};
