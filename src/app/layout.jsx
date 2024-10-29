"use client";

import React from "react";
import { CssBaseline } from "@mui/material";
import PropTypes from "prop-types";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Quiz App</title>
        <meta
          name="description"
          content="Quiz Application built with Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <CssBaseline />
        {children}
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
