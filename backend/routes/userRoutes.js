const express = require("express");
const { allUsers, singleUser, editUser, deleteUser } = require("../controllers/userController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const router = express.Router();

//this is the route for all users
//this is the route for user profile
// /api/allusers
//isAuthenticated is between the request and the controller
router.get("/allusers", isAuthenticated, isAdmin, allUsers);

// /api/user/:id
router.get("/user/:id", isAuthenticated, singleUser);

//editing the user
// /api/user/:id
router.put("/user/edit/:id", isAuthenticated, editUser);

//deleting the user
// /api/admin/user/delete/:id
router.delete("/admin/user/delete/:id", isAuthenticated, isAdmin, deleteUser);



module.exports = router;