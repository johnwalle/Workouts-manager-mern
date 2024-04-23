const express = require('express')
const workoutRouter = express.Router();
const {
    creatingWorkouts,
    gettingWorkouts,
    gettingEachWorkouts,
    deletingWorkouts,
    updatingWorkouts
} = require('../controller/workoutController');

const { requireAuth } = require('../Middleware/requireAuth')
// protect all routes

workoutRouter.use(requireAuth);

workoutRouter.post('/', creatingWorkouts);
workoutRouter.get('/', gettingWorkouts);
workoutRouter.get('/:id', gettingEachWorkouts);
workoutRouter.delete('/:id', deletingWorkouts);
workoutRouter.put('/:id', updatingWorkouts);





module.exports = workoutRouter;
