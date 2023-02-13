import {buildFeedbackPath, readFile} from "../api/feedback";
import {useState, Fragment} from "react";

const FeedbackPage = (props) => {
    const [feedback, setFeedback] = useState(undefined)
    console.log(feedback)
    const loadFeedbackHandler = (id) => {
        fetch(`/api/${id}`).then((resp) =>resp.json()).then(data => setFeedback(data))
    }
    return (
        <Fragment>

        <ul>
            {props.feedback.map((item)=>(<li key={item.id}>{item.feedback} <button onClick={()=> loadFeedbackHandler(item.id)}>Show Details</button></li>))}
        </ul>
            {feedback ? <p>{feedback.email}</p> : <></>}
        </Fragment>
    )
}

export async function getStaticProps(context){
    const filePath = buildFeedbackPath();
    const data = readFile(filePath);
    return {
        props: {
            feedback: data
        }
    }
}

export default FeedbackPage;