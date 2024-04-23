const Workouts = require('../models/workoutSchema')

// creating workouts

const creatingWorkouts = async (req, res) => {

    const { title, load, reps } = req.body

    try {

        const user_id = req.user._id

        const workouts = await Workouts.create({
            title,
            load,
            reps,
            user_id
        })

        return res.status(200).json(workouts)


    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Erorr while creating workouts" })

    }

}

// getting all workouts created

const gettingWorkouts = async (req, res) => {

    try {
        const user_id = req.user._id;

        const workouts = await Workouts.find({ user_id }).sort({ createdAt: -1 });;

        return res.status(200).json(workouts)


    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Erorr while getting workouts" })

    }

}

// getting workouts with ID
const gettingEachWorkouts = async (req, res) => {

    const { id } = req.params

    try {

        const workouts = await Workouts.findById(id);

        if (!workouts) {
            res.status(404).json({ message: 'workout not found!' })
        }
        return res.status(200).json(workouts)


    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Erorr while getting workouts" })

    }

}

// deleting owrkouts

const deletingWorkouts = async (req, res) => {

    const { id } = req.params

    try {

        const deletedWokout = await Workouts.findByIdAndDelete(id);

        if (!deletedWokout) {
            res.status(404).json({ message: 'workout not found!' })
        }
        res.status(200).json({ message: "workout successfully updated", deletedWokout })


    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Erorr while deleting workouts" })

    }

}

// updating workouts 


const updatingWorkouts = async (req, res) => {

    const { id } = req.params;
    const { title, load, reps } = req.body

    try {

        const updatedWorkout = await Workouts.findByIdAndUpdate(id, { title, load, reps }, { new: true });

        if (!updatedWorkout) {
            res.status(404).json({ message: 'workout not found!' })
        }
        return res.status(200).json({ message: "workout successfully deleted", updatedWorkout })


    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Erorr while updating workouts" })

    }

}


module.exports = {
    creatingWorkouts,
    gettingWorkouts,
    gettingEachWorkouts,
    deletingWorkouts,
    updatingWorkouts

}