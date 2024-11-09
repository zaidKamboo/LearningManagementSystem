const { default: mongoose } = require("mongoose");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: "dde3z5qet",
    api_key: "517592667988823",
    api_secret: "e0NYDmpcQmEK05s0ej8vwtnmebg",
});

const connectToDb = () => {
    mongoose
        .connect(
            "mongodb+srv://zaidkamboo100:Ic9Xo3MKhqUd2ZnK@cluster0.jn3eb.mongodb.net/"
        )
        .then(() => console.log("Connected successfully to Db."))
        .catch((err) => console.log("Error : ", err));
};

let storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "LMS/courses",
        format: async (_, file) => {
            const formats = ["jpg", "jpeg", "png", "gif", "webp"];
            const mimeType = file.mimetype.split("/")[1];
            return formats.includes(mimeType) ? mimeType : "jpg";
        },
        public_id: (_, file) => `${Date.now()}_${file.originalname}`,
    },
});
const uploadCourseImageConfig = multer({ storage });

module.exports = {
    connectToDb,
    cloudinary,
    uploadCourseImageConfig,
};
