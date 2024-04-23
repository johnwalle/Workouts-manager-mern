import axios from 'axios'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {

  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const deleteHandler = async () => {

    if (!user) {
      return
    }


    try {
      const response = await axios.delete(`http://localhost:5000/api/workouts/${workout._id}`, {

        headers: {
          Authorization: `Bearer ${user.token}`,
        }


      });

      const deletedWokout = response.data.deletedWokout;

      if (response.status === 200) {
        dispatch({ type: 'DELETE_WORKOUT', payload: deletedWokout });
      }
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };


  return (
    <div className="bg-white p-4 border flex border-gray-300 shadow-md mb-2 w-full">
      <div className="flex-grow">
        <h2 className="text-lg text-cyan-500 font-bold mb-2">{workout.title}</h2>
        <p className="text-gray-600 mb-1"><span className="text-lg text-black font-semibold">Load: </span>{workout.load}</p>
        <p className="text-gray-600"><span className="text-lg text-black font-semibold">Reps: </span>{workout.reps}</p>
        <p className="text-gray-600">{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      </div>
      <div className="flex items-center">
        <button onClick={deleteHandler} className="flex items-center justify-center ml-2 px-4 py-2 bg-red-500 text-white rounded">
          <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 3a1 1 0 00-1 1v11a1 1 0 001 1h10a1 1 0 001-1V4a1 1 0 00-1-1H5zm2 3a1 1 0 011 1v6a1 1 0 11-2 0V7a1 1 0 011-1zm4 0a1 1 0 011 1v6a1 1 0 11-2 0V7a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WorkoutDetails;