import { WorkoutsContext } from "../contexts/WorkoutContext";
import { useContext } from 'react'

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext);

    if (!context) {
        throw Error("Usewokoutscontext must be used inside an WorkoutsContextProvider!")
    }

    return context
}