import React, { useEffect, useState } from "react";
import { deleteQuestion, getAllQuestions } from "../../utils/QuizService";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const GetAllQuiz = () => {
  
  const [questions, setQuestions] = useState([
    { id: "", question: "", correctAnswers: "", choices: [] },
  ]);

  const [isLoding, setIsLoding] = useState(true);
  const [isQuestionDeleted, setIsQuestionDeleted] = useState(false);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");

  const fetchAllQuestions = async () => {
    try {
      const data = await getAllQuestions();
      setQuestions(data);
      setIsLoding(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllQuestions();
  }, []);
  
  const handelUpdate=()=>{

  }
  
  const handelDelete = async (id) => {
    try {
      await deleteQuestion(id);
      setQuestions(questions.filter((questions) => questions.id !== id));
      setIsQuestionDeleted(true);
      setDeleteSuccessMessage("Question has been deleted");
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      setDeleteSuccessMessage("");
      setIsQuestionDeleted(false);
    }, 4000);
  };

  if (isLoding) {
    return <div>Loding...</div>;
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col md="6" className="mb-2 md-mb-0" style={{ color: "GrayText" }}>
          <h4 className="">All Quiz Questions</h4>
        </Col>

        <Col
          md="4"
          className="mb-2 d-flex justify-content-end"
          style={{ color: "GrayText" }}
        >
          {/*todo : add a link to add new question form*/}
        </Col>
      </Row>
      <hr />
      {isQuestionDeleted && (
        <Alert variant={"success"}>{deleteSuccessMessage}</Alert>
      )}
      {questions.map((question, index) => (
        <div key={index}>
          <h4 style={{ color: "GrayText" }}>
            {index + 1}. {question.question}
          </h4>
          <ul>
            {question.choices.map((choice, index) => (
              <li key={index}>{choice}</li>
            ))}
            <p className="text-success">
              Correct Answer : {question.correctAnswers} .
            </p>
            <div className="btn-group mb-4">
               
               {/* todo: add link to update question form  */}
              <Link to={`/update-quiz/${question.id}`}>
                <button
                className="btn btn-outline-info btn-sm m-1"
                onClick={()=>handelUpdate()}
                >
                    Update Question
                </button>
              </Link>
                <button
                className="btn btn-outline-danger btn-sm m-1"
                onClick={()=>handelDelete(question.id)}
                >
                    Delete Question
                </button>
            </div>
          </ul>
        </div>
      ))}
    </Container>
  );
};

export default GetAllQuiz;
