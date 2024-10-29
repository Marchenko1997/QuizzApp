"use client";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Question from "./Question";
import { Box, Button, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const Quiz = ({ questions }) => {
  const [isClient, setIsClient] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState(Array(questions.length).fill(null));
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    setIsClient(true); // Устанавливаем флаг после монтирования на клиенте
  }, []);

  if (!isClient) return null; // Если не клиент, ничего не рендерим

  const handleAnswerSelected = (isCorrect) => {
    setSelectedAnswer(isCorrect);
    const newProgress = [...progress];
    newProgress[currentQuestion] = isCorrect;
    setProgress(newProgress);

    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        border: "2px solid #46827f",
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      {!showResults ? (
        <>
          <Typography
            variant="h6"
            sx={{ color: "#46827f", fontWeight: "bold", mb: 2 }}
          >
            Question {currentQuestion + 1} of {questions.length}
          </Typography>
          <Question
            questionData={questions[currentQuestion]}
            onAnswerSelected={handleAnswerSelected}
            selectedAnswer={selectedAnswer}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleNextQuestion}
              sx={{ mt: 2 }}
              disabled={selectedAnswer === null}
            >
              Next
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
              gap: 1,
            }}
          >
            {progress.map((status, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                {status === true ? (
                  <CheckCircleIcon color="success" />
                ) : status === false ? (
                  <CheckCircleIcon color="error" />
                ) : (
                  <RadioButtonUncheckedIcon color="disabled" />
                )}
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5">Results</Typography>
          <Typography>
            You answered {correctAnswers} out of {questions.length} questions correctly.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

Quiz.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answers: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          isCorrect: PropTypes.bool.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default Quiz;
