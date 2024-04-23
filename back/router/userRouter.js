const express = require('express');
const userRouter = express.Router();
const {
    creatingUsers,
    gettingUsers,
    gettingEachUsers,
    updateUser,
    deletingUser,
    loginUser
} = require('../controller/userController');





userRouter.post('/', creatingUsers);
userRouter.post('/login', loginUser);
userRouter.get('/', gettingUsers);
userRouter.get('/:id', gettingEachUsers);
userRouter.delete('/:id', deletingUser);
userRouter.put('/:id', updateUser);


module.exports = userRouter