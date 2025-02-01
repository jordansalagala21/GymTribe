// src/pages/Dashboard.tsx
import React, { useEffect } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in; redirect to login if not
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
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
      <Button
        variant="contained"
        sx={{ backgroundColor: "#CC0033", color: "#FFFFFF" }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;
