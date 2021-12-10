const InterviewModel = require("../models/interview").InterviewModel;
const UserModel = require("../models/users").UserModel;
const mail = require("../utils/mailService").mail;

async function addUser(req, res, next) {  // api to add user
    try {
        const user = req.body;
        const userAlreadyExist = await UserModel.findOne(user);

        if (userAlreadyExist != undefined) {
            res.status(500).send({ success: false, msg: "User already exist" });
            return;
        }

        const userM = new UserModel(user);
        const response = await userM.save();
        res.status(200).send({ success: true, msg: response });
    }
    catch (e) {
        console.log("Point 1 error " + e);
        res.status(500).send({ success: false, msg: e });
    }
}

async function getUser(req, res, next) {  // api to get user
    try {
        const userId = req.params.id;
        const response = await UserModel.findOne({ _id: userId });
        res.status(200).send({ success: true, msg: response });
    }
    catch (e) {
        console.log("Point 1 error " + e);
        res.status(500).send({ success: false, msg: e });
    }
}

async function getAllUsers(req, res, next) { // api to get all users
    try {
        const response = await UserModel.find({});
        res.status(200).send({ success: true, msg: response });
    }
    catch (e) {
        console.log("Point 1 error " + e);
        res.status(500).send({ success: false, msg: e });
    }
}

async function getAllInterviews(req, res, next) {  //api to get all interviews
    try {
        const interviews = await InterviewModel.find();
        res.status(200).send({ success: true, msg: interviews });
    }
    catch (e) {
        console.log("Point 1 error " + e);
        res.status(500).send({ success: false, msg: e });
    }
}

async function scheduleInterview(req, res, next) {  // api to schedule interview
    try {
        let interviewDetails = req.body;
        if (interviewDetails.participants.length < 2) {
            res.status(500).send({ success: false, msg: "Min participation is 2." });
            return;
        }

        // check if already has interview
        let alreadyInterviewSlot = await InterviewModel.find({
            participants: { $elemMatch: { $in: interviewDetails.participants } },

            startTime: { $lt: interviewDetails.endTime },
            endTime: { $gt: interviewDetails.startTime }
        });
        console.log(alreadyInterviewSlot);

        if (alreadyInterviewSlot.length != 0) {
            let notFreeCandidates = [];
            for (let i = 0; i < alreadyInterviewSlot.length; i++) {
                notFreeCandidates.push(...(alreadyInterviewSlot[i].participants));
            }

            interviewDetails.participants = interviewDetails.participants.filter(ar => !notFreeCandidates.find(e => ar === e)  );
            // throw "Error alreadyInterviewSlot not empty";
        }

        if (interviewDetails.participants.length < 2) {
            res.status(500).send({ success: false, msg: "More than 2 participants are not free." });
            return;
        }

        // send interview email
        // for (let i = 0; i < interviewDetails.participants.length; i++) {
        //     let email = (await UserModel.findOne({ _id: interviewDetails.participants[i] })).email;
        //     await mail(email, "Interview Scheduled", "Link to join interview: abc.com/interview");
        // }

        const interview = new InterviewModel(interviewDetails);
        const response = await interview.save();

        res.status(200).send({ success: true, msg: response });
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ success: false, msg: e });
    }
}

async function updateInterview(req, res, next) {  // api to update interview
    try {
        let interviewDetails = req.body;
        if (interviewDetails.participants.length < 2) {
            res.status(500).send({ success: false, msg: "Min participation is 2." });
            return;
        }

        // check if already has interview
        let alreadyInterviewSlot = await InterviewModel.find({
            _id: { $ne: interviewDetails._id },
            participants: { $elemMatch: { $in: interviewDetails.participants } },

            startTime: { $lt: interviewDetails.endTime },
            endTime: { $gt: interviewDetails.startTime }
        });
        //console.log("already",alreadyInterviewSlot,interviewDetails.endTime,interviewDetails.participants);

        if (alreadyInterviewSlot.length != 0) {
            let notFreeCandidates = [];
            for (let i = 0; i < alreadyInterviewSlot.length; i++) {
                notFreeCandidates.push(...(alreadyInterviewSlot[i].participants));
            }

            interviewDetails.participants = interviewDetails.participants.filter(ar => !notFreeCandidates.find(e => ar === e)  );
            // throw "Error alreadyInterviewSlot not empty";
        }

        if (interviewDetails.participants.length < 2) {
            res.status(500).send({ success: false, msg: "More than 2 participants are not free." });
            return;
        }

        // send interview email
        // for (let i = 0; i < interviewDetails.participants.length; i++) {
        //     let email = (await UserModel.findOne({ _id: interviewDetails.participants[i] })).email;
        //     await mail(email, "Interview Scheduled", "Link to join interview: abc.com/interview");
        // }

        const response = await InterviewModel.updateOne({ _id: interviewDetails._id }, interviewDetails);
        res.status(200).send({ success: true, msg: response });
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ success: false, msg: e });
    }
}

async function deleteInterview(req, res, next) {   // api to delete interview
    try {
        const response = await InterviewModel.deleteOne({ _id: req.body._id });
        res.status(200).json({ success: true, message: response });

    }
    catch (e) {
        console.log(e);
        res.status(500).send({ success: false, msg: e });
    }
}


module.exports.getAllInterviews = getAllInterviews;
module.exports.scheduleInterview = scheduleInterview;
module.exports.updateInterview = updateInterview;
module.exports.deleteInterview = deleteInterview;
module.exports.addUser = addUser;
module.exports.getUser = getUser;
module.exports.getAllUsers = getAllUsers;