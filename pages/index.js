import {useRef, useState} from "react";


function HomePage() {
    const emailInput = useRef()
    const feedbackInput = useRef()
    const [feedback, setFeedback] = useState();
   function submitFormHandler(e){
        e.preventDefault();
        const email = emailInput.current.value;
        const feedback = feedbackInput.current.value;

        fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                feedback
            })
        }).then((res) => res.json()).then(data => console.log(data));
   }
   const loadFeedbackHandler = () =>
   {
       fetch('/api/feedback').then(res => res.json()).then(data => setFeedback(data.feedback))
   }
  return (
    <div>
      <h1>The Home Page</h1>
        <form onSubmit={submitFormHandler}>
            <div>
                <label htmlFor='email'>Your Email</label>
                <input ref={emailInput} type='email' id='email' />
            </div>
            <div>
                <label>Your Feedback</label>
                <textarea ref={feedbackInput} id='feedback' rows='5' />
            </div>
            <button>Send Feedback</button>
        </form>
        <hr/>
        <div>
        <button onClick={loadFeedbackHandler}>Load feedback</button>
        </div>
        <div>
            <ul>
                {feedback.map((feed) => <li>{feed.email}</li>)}
            </ul></div>
    </div>
  );
}

export default HomePage;
