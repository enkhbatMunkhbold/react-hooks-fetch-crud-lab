import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then(data => setQuestions(data))
  }, [])

  function handleUpdateQuestion(updatedQuestion) {
    const updatedQuestions = questions.map(question => {
      if(question.id === updatedQuestion.id) {
        return updatedQuestion
      } else {
        return question
      }
    })

    setQuestions(updatedQuestions)
  }

  function handleDeleteQuestion(deletedQuestion) {
    const updatedQuestions = questions.filter(question =>question.id !== deletedQuestion.id)
    setQuestions(updatedQuestions)
  }

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion])
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
          <QuestionForm onAddQuestion={handleAddQuestion}/> : 
          <QuestionList 
            questions={questions} 
            onDeleteQuestion={handleDeleteQuestion}
            onUpdateQuestion={handleUpdateQuestion}
          />}
    </main>
  );
}

export default App;
