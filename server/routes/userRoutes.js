const express = require('express');
const router = express.Router();
const { login, register,finduser,updateuser,Delete} = require('../controllers/userController');

// Auth routes
router.post('/login', login);
router.post('/signup', register);


router.get("/user/:id",finduser);
router.patch("/update/:id",updateuser);
router.delete("/delete/:id",Delete);
module.exports = router;
