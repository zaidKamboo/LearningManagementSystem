const {
    getCoursesController,
    getCourseDetailsController,
    createCourseController,
    getTeachersCoursesController,
    updateCourseController,
    updateUnitsSequenceController,
    updateVideosSequenceController,
    createVideoController,
    getVideoController,
    updateVideoController,
    deleteVideoController,
    videRecordController,
    checkRecordController,
    getFinalTestController,
    getTestController,
    createFinalTestMcqController,
    createTestMcqController,
    updateMcqController,
    createUnitController,
    getUnitController,
    deleteUnitController,
    updateUnitController,
    enrollStudentController,
} = require("../controllers/courseControllers");
const { fetchuser, isAdminOrTeacher } = require("../middleware");
const {
    uploadCourseImageMiddleware,
} = require("../middleware/multerMiddlewares");
const { body } = require("express-validator");
const router = require("express").Router();

router.get("/getCourses", fetchuser, getCoursesController);

router.get("/getCourseDetails/:id", fetchuser, getCourseDetailsController);

router.post(
    "/createCourse",
    fetchuser,
    isAdminOrTeacher,
    [
        body("title").isLength({ min: 1 }),
        body("description").isLength({ min: 5 }),
        body("duration").exists(),
    ],
    uploadCourseImageMiddleware,
    createCourseController
);

router.get(
    "/getTeacher'sCourses",
    fetchuser,
    isAdminOrTeacher,
    getTeachersCoursesController
);

router.post(
    "/updateCourse/:id",
    fetchuser,
    isAdminOrTeacher,
    [
        body("title").isLength({ min: 1 }),
        body("description").isLength({ min: 5 }),
        body("duration").exists(),
    ],
    uploadCourseImageMiddleware,
    updateCourseController
);

router.put(
    "/updateUnitsSequence",
    fetchuser,
    isAdminOrTeacher,
    updateUnitsSequenceController
);

router.put(
    "/updateVideosSequence",
    fetchuser,
    isAdminOrTeacher,
    updateVideosSequenceController
);

router.post("/createVideo", fetchuser, isAdminOrTeacher, [
    body("title").isLength({ min: 1 }),
    body("unitId").isMongoId(),
    body("url").isURL(),
    createVideoController,
]);

router.get("/getVideo/:id", fetchuser, getVideoController);

router.put(
    "/updateVideo/:id",
    fetchuser,
    isAdminOrTeacher,
    [
        body("title").isLength({ min: 1 }),
        body("unitId").isMongoId(),
        body("url").isURL(),
    ],
    updateVideoController
);

router.delete(
    "/delete/:id",
    fetchuser,
    isAdminOrTeacher,
    deleteVideoController
);

router.post("/videoRecord", fetchuser, videRecordController);

router.post("/checkRecord", fetchuser, checkRecordController);

router.get("/getFinalTest/:id", fetchuser, getFinalTestController);

router.get("/getTest/:id", fetchuser, getTestController);

router.post(
    "/createFinalTestMcq",
    fetchuser,
    isAdminOrTeacher,
    createFinalTestMcqController
);

router.post(
    "/createTestMcq",
    fetchuser,
    isAdminOrTeacher,
    createTestMcqController
);

router.put("/updateMcq/:id", fetchuser, isAdminOrTeacher, updateMcqController);

router.post(
    "/createUnit",
    fetchuser,
    isAdminOrTeacher,
    [
        body("title").isLength({ min: 1 }),
        body("description").isLength({ min: 2 }),
        body("duration").isInt(),
        body("courseId").isMongoId(),
    ],
    createUnitController
);

router.get("/getUnit/:id", fetchuser, getUnitController);

router.delete(
    "/deleteUnit/:id",
    fetchuser,
    isAdminOrTeacher,
    deleteUnitController
);

router.put(
    "/updateUnit/:id",
    fetchuser,
    isAdminOrTeacher,
    [
        body("title").isLength({ min: 1 }),
        body("description").isLength({ min: 2 }),
        body("duration").isInt(),
    ],
    updateUnitController
);

router.post("/enrollStudent", fetchuser, enrollStudentController);

module.exports = router;
