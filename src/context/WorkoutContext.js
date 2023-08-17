import { createContext, useReducer } from "react";

// Step 1: Create a new React context
export const WorkoutContext = createContext();

// Step 2: Define a reducer function to manage state updates
export const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      // When SET_WORKOUTS action is dispatched, update the workouts state
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      // When CREATE_WORKOUT action is dispatched, add a new workout to the workouts array
      return {
        workouts: [...state.workouts, action.payload],
      };
    case "DELETE_WORKOUT": {
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload
        ),
      };
    }
    default:
      // For other action types, return the current state unchanged
      return state;
  }
};

// Step 3: Create a context provider component
export const WorkoutContextProvider = ({ children }) => {
  // Use useReducer hook to manage state using the workoutReducer function
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: [], // Initial state with workouts set to empty array
  });

  // Provide the state and dispatch function to the wrapped components
  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
