
"use client"; 

import React from "react";
import Quiz from "../components/Quiz";
import questions from "../data/questions.json";
import { Container, Box } from "@mui/material";

const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <Container maxWidth="sm">
        <Quiz questions={questions} />
      </Container>
    </Box>
  );
};

export default HomePage;
