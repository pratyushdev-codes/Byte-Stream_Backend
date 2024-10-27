import express from "express";
var path = require('path');
import {
  acceptRequest,
  changePassword,
  friendRequest,
  getFriendRequest,
  getUser,
  profileViews,
  requestPasswordReset,
  resetPassword,
  suggestedFriends,
  updateUser, 
  verifyEmail,
} from "../controllers/userController.js";
import userAuth from "../middleware/authMiddleware.js";

// const router = express.Router();
// const __dirname = path.resolve(path.dirname(""));

// router.get("/verify/:userId/:token", verifyEmail);
// // PASSWORD RESET



// router.get("/reset-password/:userId/:token", resetPassword);
// router.post("/reset-password", changePassword);

// // user routes
// router.post("/get-user/:id?", userAuth, getUser);
// router.put("/update-user", userAuth, updateUser);

// // friend request
// router.post("/friend-request", userAuth, friendRequest);
// router.post("/get-friend-request", userAuth, getFriendRequest);

// // accept / deny friend request
// router.post("/accept-request", userAuth, acceptRequest);

// // view profile
// router.post("/profile-view", userAuth, profileViews);

// //suggested friends
// router.post("/suggested-friends", userAuth, suggestedFriends);

// router.get("/verified", (req, res) => {
//   res.sendFile(path.join(__dirname, "./Views", "index.html"));
// });
// router.get('/resetpassword', (req, res) => {
//   res.sendFile(path.join(__dirname, "./Views", "index.html"));
// })

// export default router;

const router = express.Router();
const __dirname = path.resolve(path.dirname(""));

router.get('/verify/:userId/:token', verifyEmail);
router.get("/verified", (req, res) => {
  res.sendFile(path.join(__dirname, "./Views", "index.html"));
});

router.post('/request-passwordreset', requestPasswordReset)
//User Requests for Password Reset and User gets Email for Reset Password

router.get('/reset-password/:userId/:token', resetPassword);
//User Clicks for Password Reset Link and Reaches this Endpoint

router.get('/resetpassword', (req, res) => {
  res.sendFile(path.join(__dirname, "./Views", "index.html"));
})
//Backend reset password controller sends it to above endpoint to display message to user for password reset form or invalid url or any other verification failure

router.post("/reset-password", changePassword);
//If everything was okay, the User is finally able to change the password

// user routes
router.post("/get-user/:id?", userAuth, getUser);
router.put("/update-user", userAuth, updateUser);

// friend request
router.post("/friend-request", userAuth, friendRequest);
router.post("/get-friend-request", userAuth, getFriendRequest);

// accept / deny friend request
router.post("/accept-request", userAuth, acceptRequest);

// view profile
router.post("/profile-view", userAuth, profileViews);

//suggested friends
router.post("/suggested-friends", userAuth, suggestedFriends);
// router.post("/check-friend-request-sent", userAuth, checkFriends);


export default router;