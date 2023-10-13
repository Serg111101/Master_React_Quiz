import React from 'react';
import Swal from 'sweetalert2';

const Options = ({ options, answer, correctOption, dispatch, onNext }) => {
  const handleOptionClick = (index) => {
    if (answer === null) {
      dispatch({ type: "pick-option", payload: index });
      if(index!==correctOption){
        let timerInterval
Swal.fire({
  title: 'Auto close alert!',
  html: 'I will close in <b></b> milliseconds.',
  timer: 1000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
    const b = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
      b.textContent = Swal.getTimerLeft()
    }, 10)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  
  if (result.dismiss === Swal.DismissReason.timer) {
    window.location.reload()
  }
})
      }

      if (index === correctOption) {
        
        onNext();
      }
    }
  };

  return (
    <>
      {options.map((option, index) => (
        <button
          className={`
                    btn btn-option 
                    ${index === answer ? "answer" : ""} 
                    ${answer === null
                      ? ""
                      : index === correctOption
                      ? "correct-answer"
                      : index === answer
                      ? "wrong-answer"
                      : "other-answer"}
                  `}
          key={option}
          disabled={answer !== null}
          onClick={() => handleOptionClick(index)}
        >
          {option}
        </button>
      ))}
    </>
  );
}

const Question = ({ questionData, answer, dispatch, onNext }) => {
  return (
    <>
      <h3 className="question">{questionData.question}</h3>
      <Options
        options={questionData.options}
        answer={answer}
        correctOption={questionData.correctOption}
        dispatch={dispatch}
        onNext={onNext}
      />
    </>
  );
}

export default Question;
