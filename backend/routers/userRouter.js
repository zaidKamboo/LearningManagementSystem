const router = require("express").Router();
const { body } = require("express-validator");
const { isAdmin } = require("../middleware");
const { isAdminOrTeacher } = require("../middleware");
const { fetchuser } = require("../middleware");
const {
    registerStudentController,
    registerController,
    loginController,
    getTeachersController,
    getTeacherController,
    updateTeacherController,
    getStudentsController,
    getEnrolledStudentsController,
    getStudentController,
    updateStudentController,
    getAdminOverviewController,
    getTeacherOverviewController,
    getStudentOverviewController,
} = require("../controllers/userControllers");

router.post(
    "/register",
    fetchuser,
    isAdmin,
    [
        body("email").isEmail(),
        body("name").isLength({ min: 1 }),
        body("role").isIn(["teacher", "admin"]),
    ],
    registerController
);

router.post(
    "/registerStudent",
    fetchuser,
    isAdminOrTeacher,
    [
        body("email").isEmail(),
        body("name").isLength({ min: 1 }),
        body("class").isLength({ min: 1 }),
    ],
    registerStudentController
);

router.post(
    "/login",
    [body("email").isEmail(), body("password").isLength({ min: 1 })],
    loginController
);

router.get("/getTeachers", fetchuser, isAdmin, getTeachersController);

router.get("/getTeacher/:id", fetchuser, isAdmin, getTeacherController);

router.put(
    "/updateTeacher/:id",
    fetchuser,
    isAdmin,
    [
        body("email").isEmail(),
        body("name").isLength({ min: 1 }),
        body("department").exists(),
        body("position").exists(),
    ],
    updateTeacherController
);

router.get("/getStudents", fetchuser, isAdmin, getStudentsController);

router.get(
    "/getEnrolledStudents",
    fetchuser,
    isAdminOrTeacher,
    getEnrolledStudentsController
);

router.get(
    "/getStudent/:id",
    fetchuser,
    isAdminOrTeacher,
    getStudentController
);

router.put(
    "/updateStudent/:id",
    fetchuser,
    isAdminOrTeacher,
    [
        body("email").isEmail(),
        body("name").isLength({ min: 1 }),
        body("class").isLength({ min: 1 }),
        body("phoneNumber").isLength({ min: 10 }),
        body("active").isBoolean(),
    ],
    updateStudentController
);

router.get("/getAdminOverview", fetchuser, isAdmin, getAdminOverviewController);

router.get(
    "/getTeacherOverview",
    fetchuser,
    isAdminOrTeacher,
    getTeacherOverviewController
);

router.get("/getStudentOverview", fetchuser, getStudentOverviewController);

module.exports = router;
