// src/pages/Dashboard.tsx
import React, { useEffect } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import Navbar from "../components/Navbar";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar title="R Gymtribe" />
    

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: 3,
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 4 }}>
          Welcome to Your Dashboard
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
