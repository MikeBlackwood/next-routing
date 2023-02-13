import {buildFeedbackPath, readFile} from "./feedback";

function handler(req, res){
    const feedbackId = req.query.feedbackId;
    const filePath = buildFeedbackPath();
    const data = readFile(filePath);
    const selectedFeedback = data.find((feedback) => feedback.id === feedbackId);
    res.status(200).json({...selectedFeedback});
}

export default handler;