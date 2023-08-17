// Import the WorkoutContext and useContext from React
import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

// Define a custom hook to simplify using the WorkoutContext
export const useWorkoutContext = () => {
  // Use the useContext hook to access the WorkoutContext value
  const context = useContext(WorkoutContext);

  // Check if the context is null
  if (!context) {
    // If context is null, throw an error indicating that the hook must be used inside a WorkoutContextProvider
    throw Error(
      "useWorkoutContext must be used inside an WorkoutContextProvider"
    );
  }

  // If context is not null, return the context value
  return context;
};
