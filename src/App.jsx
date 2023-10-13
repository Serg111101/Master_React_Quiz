
import './App.css'
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';

import React, { useEffect } from 'react';
import { useReducer } from 'react';


const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
};

const reducer = function (state, action) {
  switch (action.type) {
    case "data-received":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        answer: null,
      };
    case "data-failed":
      console.log("There was an Error Fetching the Data.");
      return {
        ...state,
        status: "error",
      };
    case "start-quiz":
      return {
        ...state,
        status: "active",
      };
    case "pick-option":
      state.answer = action.payload;
      return {
        ...state,
      };
    case "next-question":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    default:
      throw new Error("Incorrect Action Type");
  }
};

function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const handleNextQuestion = () => {
    if (index < questions.length - 1) {
      dispatch({ type: "next-question" });
    } else {
     console.log("tavar");
    }
  };

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "data-received", payload: data }))
      .catch((data) => dispatch({ type: "data-failed", payload: null }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numberOfQuestions={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Question
            questionData={questions[index]}
            answer={answer}
            dispatch={dispatch}
            onNext={handleNextQuestion}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
