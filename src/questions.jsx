import React from "react";
import App from "./App";
export default function Questions(props) {
  const questions = props.q;
  let correctAnswers = 0;
  const [answer, setAnswer] = React.useState(createAns());
  const [check, setCheck] = React.useState(false);
  function createAns() {
    var arr = [];
    for (let i = 0; i < questions.length; i++) {
      let ans = {
        id: i + 1,
        answered: false,
      };
      arr.push(ans);
    }
    return arr;
  }

  function select(qid, option) {
    setAnswer((prev) => {
      const newArr = [];
      for (let i = 0; i < prev.length; i++) {
        let ans = prev[i];
        if (qid === ans.id) {
          if (ans.answered && ans.answer !== option) {
            ans = { ...ans, answer: option };
          } else if (ans.answered && ans.answer === option) {
            ans = {
              id: ans.id,
              answered: false,
            };
          } else if (!ans.answered) {
            ans = { ...ans, answer: option, answered: true };
          }
        }
        newArr.push(ans);
      }
      console.log(newArr);
      return newArr;
    });
  }

  function selected(qid, option, data) {
    for (let i = 0; i < data.length; i++) {
      let ans = data[i];
      if (qid === ans.id) {
        if (ans.answered && ans.answer === option) {
          return true;
        }
      }
    }
    return false;
  }

  function checkAnswers(qid, option, data, correct) {
    for (let i = 0; i < data.length; i++) {
      let ans = data[i];
      if (qid === ans.id) {
        if (ans.answered) {
          if (ans.answer === correct) {
            if (option === ans.answer) {
              correctAnswers++;
              return "correct";
            }
          } else {
            if (option === correct) {
              return "correct";
            }
            if (ans.answer === option) {
              return "wrong";
            }
          }
        } else {
          if (option === correct) {
            return "correct";
          }
        }
      }
    }
    return "option";
  }

  function Toggle() {
    setCheck((prev) => !prev);
  }

  const qando = questions.map((data) => {
    const elements = data.Options.map((option) => {
      return (
        <div
          className={selected(data.id, option, answer) ? "selected" : "option"}
          onClick={() => select(data.id, option)}
        >
          {option}
        </div>
      );
    });
    const checkAns = data.Options.map((option) => {
      return (
        <div className={checkAnswers(data.id, option, answer, data.Correct)}>
          {option}
        </div>
      );
    });
    return (
      <div key={data.id} className="test">
        <div className="question">{data.Question}</div>
        <div className="options">{check ? checkAns : elements}</div>
        <hr />
      </div>
    );
  });

  return (
    <div className="back">
      {qando}
      {!check && (
        <button onClick={Toggle} className="check">
          Check Answers
        </button>
      )}
      {check && (
        <div>
          <h2>You scored {correctAnswers}/5 correct answers</h2>
          <span></span>
          <button onClick={props.t} className="check">
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
