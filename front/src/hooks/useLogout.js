import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";


export const useLogout = () => {

    const { dispatch } = useAuthContext()
    const { dispatch: workoutsDispatch } = useWorkoutsContext();


    function logout() {

        // remove from the localstorage
        localStorage.removeItem("user");

        // dispatch the logout action
        dispatch({ type: "LOGOUT" });

        // dispatch workouts dispatch
        workoutsDispatch({ type: "SET_WORKOUTS", payload: null });

    }

    return { logout }
}

