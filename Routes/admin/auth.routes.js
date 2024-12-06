// routes/authRoutes.js
const express = require('express');
const { register, login, getMyProfile, updateUser, getAllUsers, getUserById, deleteUserById, changePassword} = require('../../Controllers/authController');
const router = express.Router();
const authMiddleware = require('../../Middlewares/authMiddleware')

router.post('/login', login);  
router.post('/changePassword', changePassword);  
// router.post('/addNewUser', register); 
// router.post('/updateUser/:id',authMiddleware, updateUser);  
router.get('/getAllUsers',authMiddleware, getAllUsers);  
// router.delete('/deleteUser/:id',authMiddleware, deleteUserById);  
router.get('/getusers/:id',authMiddleware, getUserById);  
router.get('/profile',authMiddleware, getMyProfile);    

module.exports = router;
