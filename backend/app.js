const express = require("express");
var cors = require("cors");
const path = require("path");
const { connectToDb } = require("./config/index.js");
// const User = require("./models/User.js");

const app = express();

const port = 5000;
connectToDb();
//using middleware
app.use(cors());
app.use(express.json());

//image
app.use("/img", express.static(path.join(__dirname, "./img")));

// routes
//auth
app.use("/api/auth", require("./routers/userRouter.js"));
// course
app.use("/api/course", require("./routers/courseRouter.js"));

app.listen(port, () => {
    console.log(`express running on http://localhost:${port}`);
});

app.get("/", (_, res) => {
    res.json({
        auth: {
            login: "http://localhost:5000/api/auth/login",
            register: "http://localhost:5000/api/auth/register (admin)",
            registerStudent:
                "http://localhost:5000/api/auth/registerstudent (admin,teacher)",
        },
        users: {
            allUsers: "http://localhost:5000/api/users/ (admin)",
            teachers: "http://localhost:5000/api/users/teachers/ (admin)",
            students:
                "http://localhost:5000/api/users/students/ (admin,teacher)",
        },
        enrollment: {
            enroll: "http://localhost:5000/api/enroll/",
        },
        course: {
            allCourse: "http://localhost:5000/api/course/",
            CreateCourse: "http://localhost:5000/api/course/create/",
            teacherMyCourse:
                "http://localhost:5000/api/course/teachermycourse/ (teacher)",
        },
        overview: {
            admin: "http://localhost:5000/api/overview/admin/ (admin)",
            teacher: "http://localhost:5000/api/overview/teacher/ (teacher)",
            student: "http://localhost:5000/api/overview/teacher/",
        },
    });
});
// const l = async () => {
//     const user = await User.create({
//         email: "zaidkamboo100@gmail.com",
//         password: "nothing",
//         name: "Zaid",
//         role: "admin",
//     });
//     console.log(user);
//     // email : "",
//     // password:"{
//     //     type:String,
//     //     required:true
//     // }",
//     // name:{
//     //     type:String,
//     //     required:true
//     // },
//     // role:{
//     //     type:String,
//     //     enum:['admin','student','teacher'],
//     //     required:true,
//     // },
// };
// l();
