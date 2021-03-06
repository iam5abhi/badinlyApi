const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const userController = require("../controllers/user-controller");
const fileUpload = require("../middleware/file-upload");

const multiFileUpload = require("../middleware/multiFile-upload");

const checkAuth = require("../middleware/authService");

router.get("/", (req, res, next) => {
  res.json({ message: "user page routes" });
});

//customer signup
//for creating a new user
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").isEmail(),
    check("password").isLength({ min: 6 }),
    check("nationality").not().isEmpty(),
    check("country").not().isEmpty(),
    check("nickname").not().isEmpty(),
    check("countryCode").isLength({ min: 2, max: 4 }),
  ],
  userController.createUser
);

//userlogin
router.post(
  "/login",
  [check("email").isEmail(), check("password").not().isEmpty()],
  userController.userLogin
);
//updatePassword
router.post(
  "/updatePassword",
  [
    check("email").isEmail(),
    check("oldpassword").not().isEmpty(),
    check("newpassword").not().isEmpty(),
  ],
  userController.updateUserPassword
);
// //forgetPassword sending otp
router.post("/forgetPassword", userController.forgetPassword);
//resetPassword Link
router.post("/passwordResetLink", userController.passwordResetotpLink);

//reseting password after reciving link
router.post("/newPassword", userController.newPassword);

//
router.post("/otpVerify", userController.otpVerify);

//post products
router.post(
  "/postItem",
  checkAuth,
  multiFileUpload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    { name: "imgOptOne", maxCount: 6 },
  ]),
  userController.createProduct
);

router.post(
  "/postItems",
  multiFileUpload.array("image", 12),
  (req, res, next) => {
    const files = req.files;
    let finalImages = [];
    let imgPath;
    if (!files) {
      const error = new Error("please choose files");
      return next(error);
    }

    files.forEach((element) => {
      console.log(element.path);
      imgPath = element.path;
      finalImages.push(imgPath);
    });
    res.send(finalImages);
  }
);

//get user Balance
router.get("/getBalance", checkAuth, userController.getBalanceById);

//get notifications by userId
router.get(
  "/getNotificationByUserId",
  checkAuth,
  userController.getNotificationsByUserID
);

//email verfication
router.get("/emailVerify", userController.EmailotpVerify);

router.get("/getListOfCustomers", userController.getListofCustomers);

router.get("/getListofVendors", userController.getListofVendors);

router.get("/getListofUsers", userController.getListofUsers);

router.get("/getCustomerCount", userController.getCustomerCount);

router.get("/getVendorsCount", userController.getVendorsCount);

router.post(
  "/createContact",
  [
    check("Name").not().isEmpty(),
    check("Number").not().isEmpty(),
    check("Email").isEmail(),
    check("Message").not().isEmpty(),
    check("Number").not().isEmpty(),
  ],
  userController.ContactUs
);

router.get("/getContactTickets", userController.getContactUs);

router.all("/me", checkAuth, userController.getUserInfo);
module.exports = router;
