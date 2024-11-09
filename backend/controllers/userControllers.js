const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const StudentDetail = require("../models/StudentDetail");
const TeacherDetail = require("../models/TeacherDetail");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const mongoose = require("mongoose");

const signature = "SIGNATURE";

const registerController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, name, role } = req.body;
        let user = await User.findOne({ email: email });

        if (user) {
            return res.status(400).send("user already exists!");
        }
        const password = name.split(" ")[0] + Math.floor(Math.random() * 1000);

        const salt = await bcrypt.genSalt(5);
        const securePassword = await bcrypt.hash(password, salt);

        user = await User.create({
            email: email,
            password: securePassword,
            name: name,
            role: role,
        });
        if (role == "teacher") {
            let teacherDetail = await TeacherDetail.create({
                userId: user._id,
                department: req.body.department,
                position: req.body.position,
            });
            return res.json({
                id: user.id,
                name: user.name,
                role,
                email,
                password,
                department: teacherDetail.department,
                position: teacherDetail.position,
            });
        }
        return res.json({
            id: user.id,
            name: user.name,
            role,
            email,
            password,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error occured at server");
    }
};

const registerStudentController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, name, phoneNumber } = req.body;
        let user = await User.findOne({ email: email });
        const password = name.split(" ")[0] + Math.floor(Math.random() * 1000);
        if (user) {
            return res.status(400).send("user already exists!");
        }

        const salt = await bcrypt.genSalt(5);
        const securePassword = await bcrypt.hash(password, salt);

        user = await User.create({
            email,
            password: securePassword,
            name,
            role: "student",
        });
        let studentDetail = await StudentDetail.create({
            userId: user.id,
            class: req.body.class,
            phoneNumber: phoneNumber,
        });
        res.json({
            id: user.id,
            name: user.name,
            role: "student",
            class: studentDetail.class,
            phoneNumber: phoneNumber,
            email,
            password,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error occured at server");
    }
};

const loginController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ errors: errors.array(), a: req.body.email });
    }
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send("user does not exists!");
        }

        const passCompare = await bcrypt.compare(password, user.password);

        if (!passCompare) {
            return res.status(400).send("Invalid Credentials");
        }

        const data = {
            user: {
                id: user.id,
                name: user.name,
                role: user.role,
            },
        };
        const authToken = jwt.sign(data, signature);
        res.json(authToken);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error occured at server");
    }
};

const getTeachersController = async (_, res) => {
    try {
        const teachers = await User.find({ role: "teacher" });
        const teachersInfo = await Promise.all(
            teachers.map(async (teacher) => {
                const teacherDetail = await TeacherDetail.findOne({
                    userId: teacher._id,
                });
                const numOfCourse = await Course.countDocuments({
                    teacherId: teacher._id,
                });
                return {
                    id: teacher._id,
                    email: teacher.email,
                    name: teacher.name,
                    active: teacher.active,
                    department: teacherDetail ? teacherDetail.department : null,
                    position: teacherDetail ? teacherDetail.position : null,
                    numOfCourse,
                };
            })
        );
        return res.json(teachersInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const getTeacherController = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({ error: "Invalid Id" });
        }
        const teacher = await User.findOne({ _id: id });
        const teacherDetail = await TeacherDetail.findOne({ userId: id });

        return res.json({
            email: teacher.email,
            name: teacher.name,
            active: teacher.active,
            department: teacherDetail ? teacherDetail.department : null,
            position: teacherDetail ? teacherDetail.position : null,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const updateTeacherController = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({ error: "Invalid Id" });
        }
        const teacher = await User.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
        });
        const teacherDetail = await TeacherDetail.findOneAndUpdate(
            { userId: id },
            req.body,
            { new: true }
        );

        return res.json({
            email: teacher.email,
            name: teacher.name,
            active: teacher.active,
            department: teacherDetail ? teacherDetail.department : null,
            position: teacherDetail ? teacherDetail.position : null,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const getStudentsController = async (_, res) => {
    try {
        const students = await User.find({ role: "student" });

        const studentDetails = await StudentDetail.find({
            userId: { $in: students.map((s) => s.id) },
        });

        const enrollmentCounts = await Enrollment.aggregate([
            {
                $match: {
                    userId: { $in: students.map((student) => student.id) },
                },
            },
            {
                $group: {
                    _id: "$userId",
                    totalEnrolled: { $sum: 1 },
                    totalCompleted: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "completed"] }, 1, 0],
                        },
                    },
                },
            },
        ]);

        const studentInfo = students.map((student) => {
            const detail = studentDetails.find((detail) =>
                detail.userId.equals(student._id)
            );
            const enrollmentCount = enrollmentCounts.find((count) =>
                count._id.equals(student._id)
            );
            return {
                id: student.id,
                name: student.name,
                active: student.active,
                class: detail ? detail.class : null,
                totalEnrolled: enrollmentCount
                    ? enrollmentCount.totalEnrolled
                    : 0,
                totalCompleted: enrollmentCount
                    ? enrollmentCount.totalCompleted
                    : 0,
            };
        });

        res.json(studentInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const getEnrolledStudentsController = async (req, res) => {
    try {
        const courses = await Course.find({ teacherId: req.user.id });
        const courseIds = courses.map((course) => course.id);

        const enrolledStudents = await Enrollment.find({
            courseId: { $in: courseIds },
        }).populate("userId", "name email");
        res.json(enrolledStudents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const getStudentController = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await User.findOne({ _id: id });
        const studentDetail = await StudentDetail.findOne({ userId: id });
        const studentInfo = {
            id: student.id,
            name: student.name,
            email: student.email,
            class: studentDetail?.class,
            phoneNumber: studentDetail?.phoneNumber,
            active: student.active,
        };
        return res.json(studentInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const updateStudentController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const id = req.params.id;
        var updatedStudent;
        try {
            updatedStudent = await User.findByIdAndUpdate(
                { _id: id },
                req.body,
                { new: true }
            );
        } catch (error) {
            return res.status(400).json({ error: "Email already in use" });
        }

        if (!updatedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }
        const updatedStudentDetails = await StudentDetail.findOneAndUpdate(
            { userId: id },
            req.body,
            { new: true }
        );

        return res.json({
            email: updatedStudent.email,
            name: updatedStudent.name,
            active: updatedStudent.active,
            class: updatedStudentDetails.class,
            phoneNumber: updatedStudentDetails.phoneNumber,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const getAdminOverviewController = async (_, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: "student" });
        const totalTeachers = await User.countDocuments({ role: "teacher" });
        const totalCourses = await Course.countDocuments();
        const totalEnrollments = await Enrollment.countDocuments();

        const courseData = await Enrollment.aggregate([
            {
                $group: {
                    _id: "$courseId",
                    studentCount: { $sum: 1 },
                },
            },
            {
                $lookup: {
                    from: "courses",
                    localField: "_id",
                    foreignField: "_id",
                    as: "courseData",
                },
            },
            {
                $project: {
                    courseName: { $arrayElemAt: ["$courseData.title", 0] },
                    studentCount: 1,
                },
            },
        ]);

        const adminOverview = {
            totalStudents: totalStudents,
            totalTeachers: totalTeachers,
            totalCourses: totalCourses,
            totalEnrollments: totalEnrollments,
            courseData: courseData,
        };
        res.json(adminOverview);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
};

const getTeacherOverviewController = async (req, res) => {
    try {
        const teacherId = req.user.id;

        // Calculate the number of students enrolled in the teacher's courses
        const studentsEnrolledInTeacherCourses =
            await Enrollment.countDocuments({
                courseId: {
                    $in: (
                        await Course.find({ teacherId })
                    ).map((course) => course._id),
                },
            });

        // Calculate the number of courses the teacher has
        const teacherCourseCount = await Course.countDocuments({ teacherId });

        // Calculate the total number of students enrolled in the teacher's courses
        const totalStudentsInTeacherCourses = await Enrollment.distinct(
            "userId",
            {
                courseId: {
                    $in: (
                        await Course.find({ teacherId })
                    ).map((course) => course._id),
                },
            }
        );
        const courseData = await Enrollment.aggregate([
            {
                $match: {
                    courseId: {
                        $in: (
                            await Course.find({ teacherId: req.user._id })
                        ).map((course) => course._id),
                    },
                },
            },
            {
                $group: {
                    _id: "$courseId",
                    studentCount: { $sum: 1 },
                },
            },
            {
                $lookup: {
                    from: "courses", // Name of the Course collection in your database
                    localField: "_id",
                    foreignField: "_id",
                    as: "courseData",
                },
            },
            {
                $project: {
                    courseName: { $arrayElemAt: ["$courseData.title", 0] },
                    studentCount: 1,
                },
            },
        ]);

        // Create a response object
        const teacherDashboard = {
            studentsEnrolledInTeacherCourses: studentsEnrolledInTeacherCourses,
            teacherCourseCount: teacherCourseCount,
            totalStudentsInTeacherCourses: totalStudentsInTeacherCourses.length,
            courseData: courseData,
        };

        res.json(teacherDashboard);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
};

const getStudentOverviewController = async (req, res) => {
    try {
        const studentId = req.user.id;
        // Calculate the number of ongoing courses
        const ongoingCoursesCount = await Enrollment.countDocuments({
            userId: studentId,
            status: "in progress",
        });

        // Calculate the number of completed courses
        const completedCoursesCount = await Enrollment.countDocuments({
            userId: studentId,
            status: "completed",
        });
        const studentOverview = {
            ongoingCoursesCount: ongoingCoursesCount,
            completedCoursesCount: completedCoursesCount,
        };

        res.json(studentOverview);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
};

module.exports = {
    registerController,
    registerStudentController,
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
};
