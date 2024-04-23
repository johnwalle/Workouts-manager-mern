import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {

    const { user } = useAuthContext();
    const { dispatch } = useWorkoutsContext()
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, [])


    const submitHandler = async (e) => {
        e.preventDefault();

        if (!user) {
            setErrorMessage("You have to loggin first")
            return
        }


        const workout = { title, reps, load };

        try {
            const response = await axios.post("http://localhost:5000/api/workouts", workout, {

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                }
            });
            const createdWokout = response.data

            if (response.status === 200) {
                setTitle("");
                setLoad("");
                setReps("");
                dispatch({ type: "CREATE_WORKOUT", payload: createdWokout })
                console.log("Created Workout", createdWokout);
            }
        } catch (error) {
            console.error("Error creating workout:", error);
            setErrorMessage("An error occurred while creating the workout.");

        }
    };

    return (
        <form onSubmit={submitHandler} className="max-w-lg ">
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                    Title:
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    required
                    ref={inputRef}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-cyan-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="load" className="block text-gray-700 text-sm font-bold mb-2">
                    Load:
                </label>
                <input
                    type="number"
                    id="load"
                    required
                    value={load}
                    onChange={(e) => setLoad(e.target.value)}
                    className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-cyan-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="reps" className="block text-gray-700 text-sm font-bold mb-2">
                    Reps:
                </label>
                <input
                    type="number"
                    id="reps"
                    required
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-cyan-500"
                />
            </div>
            <div className="text-center">
                <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
                {errorMessage && (
                    <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
                )}
            </div>
        </form>
    );
};


export default WorkoutForm