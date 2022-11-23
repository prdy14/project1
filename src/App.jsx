import React from "react";
import Start from "./start";
import Questions from "./questions";

export default function App() {
  const [startPage, setStartPage] = React.useState(true);
  const [count, setCount] = React.useState(0);
  const [test, setTest] = React.useState([]);

  const ques = test.map((data) => data.question);

  const correctAnswer = test.map((data) => data.correct_answer);

  const wrongAnswers = test.map((data) => data.incorrect_answers);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => data.results)
      .then((data) => setTest(data));
  }, [count]);

  function QuestionsAndOptions() {
    const newArr = [];
    const newQuestions = [];
    for (let i = 0; i < test.length; i++) {
      newArr[i] = [correctAnswer[i], ...wrongAnswers[i]];
      const array = newArr[i];
      for (var k = array.length - 1; k > 0; k--) {
        var j = Math.floor(Math.random() * (k + 1));
        var temp = array[k];
        array[k] = array[j];
        array[j] = temp;
      }
      newQuestions[i] = {
        id: i + 1,
        Question: ques[i],
        Options: newArr[i],
        Correct: correctAnswer[i],
      };
    }

    return newQuestions;
  }

  const mcqs = QuestionsAndOptions();
  function goToQuestion() {
    setStartPage((prev) => !prev);
  }
  function change() {
    setStartPage((prev) => !prev);
    setCount((count) => count + 1);
  }

  return (
    <div className="quiz--app">
      {startPage ? (
        <Start toggle={goToQuestion} />
      ) : (
        <Questions q={mcqs} t={change} />
      )}
    </div>
  );
}
