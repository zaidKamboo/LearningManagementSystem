const Course = require("../models/Course");
const mongoose = require("mongoose");
const Enrollment = require("../models/Enrollment");
const User = require("../models/User");
const Unit = require("../models/Unit");
const MCQ = require("../models/MCQ");
const Video = require("../models/Video");
const Test = require("../models/Test");
const TestRecord = require("../models/TestRecord");
const UnitRecord = require("../models/UnitRecord");
const VideoRecord = require("../models/VideoRecord");
const { getTime } = require("../util");
const { cloudinary } = require("../config");

const getCoursesController = async (_, res) => {
    try {
        const courses = await Course.find();

        // Retrieve additional information for each course
        const courseDetails = await Promise.all(
            courses.map(async (course) => {
                // Query the teacher's name
                const teacher = await User.findById(course.teacherId);

                // Query the number of enrolled students
                const enrolledStudentsCount = await Enrollment.countDocuments({
                    courseId: course.id,
                });

                // Query the number of students who have completed the course
                const completedStudentsCount = await Enrollment.countDocuments({
                    courseId: course.id,
                    status: "completed",
                });

                return {
                    id: course.id,
                    title: course.title,
                    description: course.description,
                    teacher: teacher.name,
                    enrolledStudents: enrolledStudentsCount,
                    completedStudents: completedStudentsCount, // Add the number of students who have completed the course
                    date: course.createdAt, // Add the course date (adjust as needed)
                    duration: course.duration,
                    courseImg: course.courseImg,
                };
            })
        );

        const result = {
            courses: courseDetails,
        };

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const getCourseDetailsController = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid Id" });
        }
        const course = await Course.findOne({ _id: id });
        if (!course) {
            return res.status(400).json({ error: "Invalid Id" });
        }
        const isEnrolled = await Enrollment.findOne({
            courseId: course._id,
            userId: new mongoose.Types.ObjectId(req.user.id),
        });

        const units = await Unit.find({ courseId: course._id });
        // course.units = units
        const finalTest = await Test.findOne({
            courseId: course._id,
            final: true,
        });
        var mcqCount = 0;
        if (finalTest) {
            mcqCount = await MCQ.countDocuments({ testId: finalTest._id });
        }

        const teacher = await User.findOne({ _id: course.teacherId });

        const enrolledStudents = await Enrollment.countDocuments({
            courseId: course._id,
        });

        const result = {
            _id: course._id,
            title: course.title,
            description: course.description,
            duration: course.duration,
            courseImg: course.courseImg,
            teacher: teacher.name,
            enrolledStudents,
            isEnrolled,
            units: await Promise.all(
                units.map(async (u) => {
                    let numOfVideo = await Video.countDocuments({
                        unitId: u._id,
                    });
                    let test = await Test.findOne({ unitId: u._id });
                    let testRecord;
                    if (test) {
                        testRecord = await TestRecord.findOne({
                            testId: test._id,
                            userId: new mongoose.Types.ObjectId(req.user.id),
                        });
                        // console.log(test._id)
                        // console.log(req.user.id)
                        // console.log(testRecord)
                    }
                    let numOfMCQ = 0;
                    if (test) {
                        numOfMCQ = await MCQ.countDocuments({
                            testId: test._id,
                        });
                    }
                    const unitRecord = await UnitRecord.findOne({
                        unitId: u._id,
                        userId: req.user.id,
                    });

                    const videos = await Video.find({ unitId: u._id });
                    return {
                        _id: u._id,
                        courseId: u.courseId,
                        title: u.title,
                        description: u.description,
                        sequence: u.sequence,
                        duration: u.duration,
                        numOfVideo,
                        numOfMCQ,
                        testLocked: testRecord?.locked,
                        testId: test?._id,
                        locked: unitRecord?.locked,
                        videos: await Promise.all(
                            videos.map(async (v) => {
                                let videoRecord = await VideoRecord.findOne({
                                    videoId: v._id,
                                    userId: req.user.id,
                                });
                                return {
                                    _id: v._id,
                                    unitId: v.unitId,
                                    duration: v.duration,
                                    description: v.description,
                                    youtubeId: v.youtubeId,
                                    title: v.title,
                                    url: v.url,
                                    sequence: v.sequence,
                                    locked: videoRecord?.locked,
                                };
                            })
                        ),
                        // videos: videos
                    };
                })
            ),
            finalTest: finalTest
                ? {
                      _id: finalTest?._id,
                      courseId: finalTest?.courseId,
                      mcqCount: mcqCount,
                  }
                : null,
        };
        return res.json(result);

        // const result1 = await Course.aggregate([
        //     { $match: { _id: new mongoose.Types.ObjectId(id) } },
        //     {
        //         $lookup: {
        //             from: 'units',
        //             let: { courseId: '$_id' },
        //             pipeline: [
        //                 {
        //                     $match: {
        //                         $expr: {
        //                             $eq: ['$courseId', '$$courseId']
        //                         }
        //                     }
        //                 },
        //                 {
        //                     $lookup: {
        //                         from: 'videos',
        //                         localField: '_id',
        //                         foreignField: 'unitId',
        //                         as: 'videos'
        //                     }
        //                 },
        //                 {
        //                     $lookup: {
        //                         from: 'tests',
        //                         localField: '_id',
        //                         foreignField: 'unitId',
        //                         as: 'test'
        //                     }
        //                 },
        //                 {
        //                     $lookup: {
        //                         from: 'mcqs',
        //                         localField: 'test._id',
        //                         foreignField: 'testId',
        //                         as: 'mcqs'
        //                     }
        //                 },
        //                 {
        //                     $addFields: {
        //                         numOfVideo: { $size: '$videos' },
        //                         numOfMCQ: { $size: '$mcqs' }
        //                     }
        //                 }
        //             ],
        //             as: "units"
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: 'users',
        //             localField: 'teacherId',
        //             foreignField: '_id',
        //             as: 'teacher'
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: 'enrollments',
        //             let: { courseId: '$_id' },
        //             pipeline: [
        //                 {
        //                     $match: {
        //                         $expr: {
        //                             $and: [
        //                                 { $eq: ['$courseId', '$$courseId'] },
        //                                 { $eq: ['$userId', new mongoose.Types.ObjectId(req.user.id)] }
        //                             ]
        //                         }
        //                     }
        //                 }
        //             ],
        //             as: 'enrollment'
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: 'enrollments',
        //             let: { courseId: '$_id' },
        //             pipeline: [
        //                 {
        //                     $match: {
        //                         $expr: {
        //                             $eq: ['$courseId', '$$courseId']
        //                         }
        //                     }
        //                 }
        //             ],
        //             as: 'enrolledStudents'
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: 'tests',
        //             let: { courseId: '$_id' },
        //             pipeline: [
        //                 {
        //                     $match: {
        //                         $expr: {
        //                             $and: [
        //                                 { $eq: ['$courseId', '$$courseId'] },
        //                                 { $eq: ['$final', true] }
        //                             ]
        //                         }
        //                     }
        //                 },
        //                 {
        //                     $lookup: {
        //                         from: 'mcqs',
        //                         localField: '_id',
        //                         foreignField: 'testId',
        //                         as: 'mcqs'
        //                     }
        //                 },
        //                 {
        //                     $addFields: {
        //                         mcqCount: { $size: '$mcqs' }
        //                     }
        //                 },
        //                 { $unset: ['mcqs'] }
        //             ],
        //             as: 'finalTest'
        //         }
        //     },
        //     {
        //         $addFields: {
        //             isEnrolled: { $size: '$enrollment' },
        //             teacher: { $arrayElemAt: ['$teacher.name', 0] },
        //             enrolledStudents: { $size: '$enrolledStudents' },
        //             finalTest: {
        //                 $cond: {
        //                     if: { $gt: [{ $size: '$finalTest' }, 0] },
        //                     then: { $arrayElemAt: ['$finalTest', 0] },
        //                     else: null
        //                 }
        //             }
        //         }
        //     },
        //     {
        //         $project: {
        //             _id: 1,
        //             title: 1,
        //             description: 1,
        //             duration: 1,
        //             courseImg: 1,
        //             teacher: 1,
        //             enrolledStudents: 1,
        //             isEnrolled: 1,
        //             units: {
        //                 $map: {
        //                     input: '$units',
        //                     as: 'unit',
        //                     in: {
        //                         _id: '$$unit._id',
        //                         courseId: '$$unit.courseId',
        //                         title: '$$unit.title',
        //                         description: '$$unit.description',
        //                         sequence: '$$unit.sequence',
        //                         duration: '$$unit.duration',
        //                         numOfVideo: '$$unit.numOfVideo',
        //                         numOfMCQ: '$$unit.numOfMCQ',
        //                         videos: '$$unit.videos'
        //                     }
        //                 }
        //             },
        //             finalTest: {
        //                 $cond: {
        //                     if: { $ne: ['$finalTest', null] },
        //                     then: {
        //                         _id: '$finalTest._id',
        //                         courseId: '$finalTest.courseId',
        //                         mcqCount: '$finalTest.mcqCount'
        //                     },
        //                     else: null
        //                 }
        //             }
        //         }
        //     }
        // ])

        // return res.json(result1[0])
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const createCourseController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, duration } = req.body;
        const courseImg = req.file;

        // Check if an image was provided
        if (!courseImg) {
            return res
                .status(400)
                .json({ error: "Please provide a course image." });
        }

        // Save the course with image information
        const newCourse = await Course.create({
            title: title,
            description: description,
            duration: duration,
            courseImg: courseImg.filename, // Store the filename in the database
            teacherId: req.user.id,
        });

        res.status(201).json(newCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const getTeachersCoursesController = async (req, res) => {
    try {
        const query = { teacherId: req.user.id };
        const courses = await Course.find(query);
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const updateCourseController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, duration } = req.body;
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const errors = validationResult(req);

        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({ error: "Invalid Id" });
        }
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (req.file && course.courseImg) {
            const courseUrl = course.courseImg;
            const publicId = courseUrl
                .split("/")
                .slice(-3)
                .join("/")
                .split(".")
                .slice(0, -1)
                .join(".");

            console.log("Deleting from Cloudinary:", publicId);

            const deletionResult = await cloudinary.uploader.destroy(publicId);
            console.log("Cloudinary Deletion Result:", deletionResult);
        }

        course.title = title;
        course.description = description;
        course.duration = duration;
        course.teacherId = req.user.id;
        if (req.file) course.courseImg = req.file.path;

        await course.save();
        return res.status(201).json(course);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Serverer issues",
            msg: error?.message,
            error,
        });
    }
};

const updateUnitsSequenceController = async (req, res) => {
    try {
        const { units } = req.body;
        if (units.lenght < 1) {
            return res.json({ msg: "no data" });
        }
        await Promise.all(
            units.map(async (u) => {
                await Unit.findOneAndUpdate(
                    { _id: u._id },
                    {
                        sequence: u.sequence,
                    }
                );
            })
        );
        res.json({ msg: "updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
};

const updateVideosSequenceController = async (req, res) => {
    try {
        const { units } = req.body;
        if (units.lenght < 1) {
            return res.json({ msg: "no data" });
        }
        // console.log(units)
        await Promise.all(
            units.map(async (u) => {
                await Video.findOneAndUpdate(
                    { _id: u._id },
                    {
                        sequence: u.sequence,
                    }
                );
            })
        );
        return res.json({ msg: "updated" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server Error" });
    }
};

const createVideoController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, unitId, url, description } = req.body;
        const sequence = (await Video.countDocuments({ unitId })) + 1;

        // AIzaSyCvmIgCmavPYCR2JUGS_ha2WdNdPDX4fzw

        let time = await getTime(url.split("&")[0]);
        var youtubeId = time.id;
        // console.log(youtubeId)
        const newVideo = await Video.create({
            unitId,
            title,
            description,
            sequence,
            url,
            youtubeId,
            duration: {
                hours: time.duration.hours,
                minutes: time.duration.minutes,
            },
        });
        // console.log(newVideo)
        res.status(201).json(newVideo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const getVideoController = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid Id" });
    }
    const videos = await Video.find({ unitId: id });
    return res.json(videos);
};

const updateVideoController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, url, description } = req.body;
        const { id: _id } = req.params;

        // AIzaSyCvmIgCmavPYCR2JUGS_ha2WdNdPDX4fzw
        const video = await Video.findOne({ _id });
        var youtubeId;
        var duration = video.duration;
        // if (video.url != url) {
        if (1) {
            let time = await getTime(url);
            console.log(time);
            youtubeId = time.id;
            duration = {
                hours: time.duration.hours,
                minutes: time.duration.minutes,
            };
        }
        const newVideo = await Video.findOneAndUpdate(
            { _id },
            {
                title,
                description,
                url,
                duration,
                youtubeId,
            },
            { new: true }
        );
        console.log(newVideo, youtubeId);
        res.status(201).json(newVideo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const deleteVideoController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid Id" });
        }
        const video = await Video.findOne({ _id: id });
        if (!video) {
            return res.status(400).json({ error: "Video does not exist" });
        }
        const unit = await Unit.findOne({ _id: video.unitId });
        const course = await Course.findOne({ _id: unit.courseId });
        if (course.teacherId == req.user.id) {
            await Video.deleteOne({ _id: id });

            const allVideos = await Video.find({ unitId: unit._id });
            allVideos
                .sort((a, b) => [a.sequence < b.sequence ? -1 : 1])
                .map((v, idx) => {
                    v.sequence = idx + 1;
                    v.save();
                });

            return res.json({ message: "Video deleted Successfully" });
        } else {
            return res.status(401).json({ error: "Unauthorized" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "server error" });
    }
};

const videRecordController = async (req, res) => {
    try {
        const { videoId } = req.body;

        if (videoId == null || !mongoose.isValidObjectId(videoId)) {
            return res.status(400).json({ error: "Provide a valid video id." });
        }

        const video = await Video.findOne({ _id: videoId });

        if (!video) {
            return res.status(400).json({ error: "Provide a valid video id." });
        }

        var videoRecord = await VideoRecord.findOne({
            videoId: videoId,
            userId: req.user.id,
        });

        if (videoRecord == null) {
            return res.status(401).json({ error: "Not Enrolled." });
        }
        if (videoRecord.locked) {
            console.log(videoRecord);
            return res.status(403).json({ error: "Locked" });
        }
        videoRecord = await VideoRecord.findOneAndUpdate(
            { _id: videoRecord._id },
            {
                startedOn: Date.now(),
            },
            { new: true }
        );
        return res.json(videoRecord);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server Error" });
    }
};

const checkRecordController = async (req, res) => {
    try {
        const { videoId } = req.body;

        if (videoId == null || !mongoose.isValidObjectId(videoId)) {
            return res.status(400).json({ error: "Provide a valid video id." });
        }

        const video = await Video.findOne({ _id: videoId });

        if (!video) {
            return res.status(400).json({ error: "Provide a valid video id." });
        }

        var videoRecord = await VideoRecord.findOne({
            videoId: videoId,
            userId: req.user.id,
        });

        if (videoRecord == null) {
            return res.status(401).json({ error: "Not Enrolled." });
        }

        if (!videoRecord.startedOn) {
            return res.status(406).json({ error: "Not Started." });
        }

        let started = videoRecord.startedOn;
        let current = Date.now();
        console.log();

        let difference = Math.abs((started - current) / 1000);

        let totalVideoSeconds = 0;
        totalVideoSeconds += video.duration.hours
            ? video.duration.hours * 3600
            : 0;
        totalVideoSeconds += video.duration.minutes
            ? video.duration.minutes * 60
            : 0;
        totalVideoSeconds += video.duration.seconds
            ? video.duration.seconds
            : 0;

        // console.log(difference, totalVideoSeconds * 0.7)
        totalVideoSeconds = 1;
        if (difference > totalVideoSeconds * 0.5) {
            await VideoRecord.findOneAndUpdate(
                {
                    _id: videoRecord._id,
                },
                { completed: true }
            );
            const nextVideo = await Video.findOne({
                unitId: video.unitId,
                sequence: video.sequence + 1,
            });
            if (nextVideo) {
                const nextVideoRecord = await VideoRecord.findOneAndUpdate(
                    { videoId: nextVideo._id, userId: req.user.id },
                    { locked: false },
                    { new: true }
                );
                return res.json(nextVideoRecord);
            } else {
                // find test
                const nextTest = await TestRecord.findOneAndUpdate(
                    { unitId: video.unitId },
                    { locked: false },
                    { new: true }
                );

                return res.json(nextTest);
            }
        } else {
            // console.log('no')
            return res.status(403).json("Not Completed");
        }
        // return res.status(403).json("Not Completed")
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server Error" });
    }
};

const getFinalTestController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid Id" });
        }

        const finalTest = await Test.findOne({ courseId: id, final: true });
        if (!finalTest) {
            return res.json([]);
        }
        const mcqs = await MCQ.find({ testId: finalTest._id });
        // console.log(req.user.role)
        if (req.user.role == "student") {
            const simplifiedMcqs = mcqs.map(({ question, options }) => ({
                question,
                options,
            }));
            return res.json(simplifiedMcqs);
        }
        return res.json(mcqs);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server Error." });
    }
};

const getTestController = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid Id" });
        }

        const finalTest = await Test.findOne({ courseId: id, final: true });
        if (!finalTest) {
            return res.json([]);
        }
        const mcqs = await MCQ.find({ testId: finalTest._id });
        // console.log(req.user.role)
        if (req.user.role == "student") {
            const simplifiedMcqs = mcqs.map(({ question, options }) => ({
                question,
                options,
            }));
            return res.json(simplifiedMcqs);
        }
        return res.json(mcqs);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server Error." });
    }
};

const createFinalTestMcqController = async (req, res) => {
    try {
        const { question, options, answer, courseId } = req.body;
        if (!mongoose.isValidObjectId(courseId)) {
            return res.status(400).json({ error: "Invalid Course ID" });
        }
        if (!question || !options || options.length != 4 || !answer) {
            return res.status(400).json({ error: "Invalid Data" });
        }

        var finalTest = await Test.findOne({ courseId: courseId, final: true });

        if (!finalTest) {
            finalTest = await Test.create({
                courseId,
                final: true,
            });
        }

        var newMCQ = await MCQ.create({
            question,
            answer,
            options,
            testId: finalTest._id,
        });

        return res.json(newMCQ);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server Error." });
    }
};

const createTestMcqController = async (req, res) => {
    try {
        const { question, options, answer, unitId } = req.body;
        if (!mongoose.isValidObjectId(unitId)) {
            return res.status(400).json({ error: "Invalid Course ID" });
        }
        if (!question || !options || options.length != 4 || !answer) {
            return res.status(400).json({ error: "Invalid Data" });
        }

        var newTest = await Test.findOne({ unitId });

        if (!newTest) {
            newTest = await Test.create({
                unitId,
            });
        }

        var newMCQ = await MCQ.create({
            question,
            answer,
            options,
            testId: newTest._id,
        });

        return res.json(newMCQ);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server Error." });
    }
};

const updateMcqController = async (req, res) => {
    try {
        const { question, options, answer } = req.body;
        const { id: mcqId } = req.params;
        if (!mongoose.isValidObjectId(mcqId)) {
            return res.status(400).json({ error: "Invalid MCQ ID" });
        }
        if (!question || !options || options.length != 4 || !answer) {
            return res.status(400).json({ error: "Invalid Data" });
        }

        var updatedMCQ = await MCQ.findOneAndUpdate(
            { _id: mcqId },
            {
                question,
                answer,
                options,
            },
            { new: true }
        );

        return res.json(updatedMCQ);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server Error." });
    }
};

const createUnitController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, courseId, duration } = req.body;
        const sequence = (await Unit.countDocuments({ courseId })) + 1;

        const newUnit = await Unit.create({
            courseId,
            title,
            description,
            duration,
            sequence,
        });

        res.status(201).json(newUnit);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const getUnitController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid Id" });
        }
        const unit = await Unit.findOne({ _id: id });
        const test = await Test.findOne({ unitId: id });
        var numberOfQuestion = 0;
        if (test) {
            numberOfQuestion = await MCQ.countDocuments({ testId: test._id });
        }
        res.json({
            active: unit.active,
            courseId: unit.courseId,
            description: unit.description,
            duration: unit.duration,
            sequence: unit.sequence,
            title: unit.title,
            _id: unit._id,
            numberOfQuestion,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const deleteUnitController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid Id" });
        }
        const unit = await Unit.findOne({ _id: id });
        const test = await Test.findOne({ unitId: id });
        var numberOfQuestion = 0;
        if (test) {
            numberOfQuestion = await MCQ.countDocuments({ testId: test._id });
        }
        res.json({
            active: unit.active,
            courseId: unit.courseId,
            description: unit.description,
            duration: unit.duration,
            sequence: unit.sequence,
            title: unit.title,
            _id: unit._id,
            numberOfQuestion,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const updateUnitController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, duration } = req.body;
        const id = req.params.id;

        const newUnit = await Unit.findOneAndUpdate(
            { _id: id },
            {
                title,
                description,
                duration,
            },
            { new: true }
        );

        res.status(201).json(newUnit);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const enrollStudentController = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;
        if (!courseId || !mongoose.isValidObjectId(courseId)) {
            return res.status(400).json({ error: "Invalid data" });
        }
        const alreadyEnrolled = await Enrollment.findOne({ courseId, userId });
        if (alreadyEnrolled) {
            return res.status(400).json({ error: "Already Enrolled" });
        }
        const newEnrollment = await Enrollment.create({
            courseId,
            userId,
        });
        const units = await Unit.find({ courseId });
        await Promise.all(
            units.map(async (u, idx) => {
                await UnitRecord.create({
                    unitId: u._id,
                    userId: req.user.id,
                    courseId,
                    locked: !idx == 0,
                });

                const videos = await Video.find({ unitId: u._id });
                await Promise.all(
                    videos.map(async (v, idx2) => {
                        await VideoRecord.create({
                            videoId: v._id,
                            unitId: u._id,
                            userId: req.user.id,
                            locked: !(idx == 0 && idx2 == 0),
                        });
                    })
                );
                const test = await Test.findOne({ unitId: u._id });
                if (test) {
                    console.log(1);
                    await TestRecord.create({
                        testId: test._id,
                        unitId: u._id,
                        userId: req.user.id,
                    });
                }
            })
        );

        const finalTest = await Test.findOne({
            courseId: courseId,
            final: true,
        });
        if (finalTest) {
            await TestRecord.create({
                testId: finalTest._id,
                courseId: courseId,
                userId: req.user.id,
            });
        }

        return res.json(newEnrollment);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
};

module.exports = {
    getCoursesController,
    getCourseDetailsController,
    createCourseController,
    getTeachersCoursesController,
    updateCourseController,
    updateUnitsSequenceController,
    updateVideosSequenceController,
    getVideoController,
    createVideoController,
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
};
