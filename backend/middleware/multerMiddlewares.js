const { uploadCourseImageConfig } = require("../config");

const uploadCourseImageMiddleware = (req, res, next) => {
    uploadCourseImageConfig.single("courseImage")(req, res, (err) => {
        if (err) {
            console.error("Upload error:", err);
            return res.status(400).json({ message: err.message });
        }
        console.log("Upload successful", req.file);
        next();
    });
};

module.exports = { uploadCourseImageMiddleware };
