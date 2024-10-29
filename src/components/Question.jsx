"use client";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography } from "@mui/material";

const Question = ({ questionData, onAnswerSelected }) => {
  const [answerIndex, setAnswerIndex] = useState(null);

  useEffect(() => {
    setAnswerIndex(null); 
  }, [questionData]);

  const handleAnswerClick = (answer, index) => {
    if (answerIndex === null) {
      setAnswerIndex(index);
      onAnswerSelected(answer.isCorrect);
    }
  };

  return (
    <Box>
      <Typography variant="body1" sx={{ mb: 2 }} suppressHydrationWarning>
        {questionData.question}
      </Typography>
      {questionData.answers.map((answer, index) => (
        <Button
          key={index}
          fullWidth
          onClick={() => handleAnswerClick(answer, index)}
          suppressHydrationWarning
          sx={{
            mb: 1,
            backgroundColor:
              answerIndex === index
                ? answer.isCorrect
                  ? "green"
                  : "red"
                : "#d3d3d3",
            color: answerIndex === index ? "white" : "black",
            "&:hover": {
              backgroundColor:
                answerIndex === null
                  ? "#bfbfbf"
                  : answerIndex === index && answer.isCorrect
                  ? "green"
                  : "red",
            },
          }}
          disabled={answerIndex !== null} 
        >
          {answer.text}
        </Button>
      ))}
    </Box>
  );
};

Question.propTypes = {
  questionData: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        isCorrect: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  selectedAnswer: PropTypes.bool, 
};

export default Question;
