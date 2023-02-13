import fs from 'fs';
import path from 'path';

export function buildFeedbackPath () {
   return path.join(process.cwd(), 'data', "feedback.json");
}
export function readFile (filePath) {
   const fileData = fs.readFileSync(filePath);
   return JSON.parse(fileData);
}
function handler (req, res) {
   if(req.method === 'POST')
   {
      const email = req.body.email;
      const feedback = req.body.feedback;
      const newFeedback = {
         id: new Date().toISOString(),
         email,
         feedback
      }
      const filePath = buildFeedbackPath();
      const data = readFile(filePath);
      data.push(newFeedback);
      fs.writeFileSync(filePath, JSON.stringify(data));
      res.status(201).json({message: 'Success', feedback: newFeedback})

   }
   else{
      const filePath = buildFeedbackPath();
      const data = readFile(filePath);
      res.status(200).json({feedback: data});
   }
}

export default handler;