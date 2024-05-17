import { useEffect } from "react";
import axios from "axios";
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";


const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/workouts", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    }
                });
                const workoutsData = response.data;

                if (response.status === 200) {
                    dispatch({ type: "SET_WORKOUTS", payload: workoutsData })
                    console.log("Fetched Workouts", workouts)
                }
            } catch (error) {
                console.log("Error while fetching", error.message);
            }
        };

        if (user) {

            fetchWorkouts();

        }

    }, [dispatch, user]);

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 mr-10 flex mt-44 justify-center">
                <WorkoutForm />
            </div>
            {workouts && (
                <div className="w-full md:w-1/2 mt-10 mr-10">
                    <div className="flex flex-col">
                        <h2 className="text-xl text-blue-600 font-bold mb-2">{user.name} Workouts</h2>
                        {workouts.map((workout) => (
                            <WorkoutDetails key={workout._id} workout={workout} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;