// src/pages/Home.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#FFFFFF",
        padding: 3,
      }}
    >
      <Typography
        variant="h2"
        sx={{ color: "#CC0033", fontWeight: "bold", marginBottom: 2 }}
      >
        Welcome to Gymtribe
      </Typography>
      <Typography variant="h6" sx={{ color: "#000000", marginBottom: 4 }}>
        Discover your gym tribe! Find gyms nearby and connect with others
        following similar workout plans. Start your fitness journey with us!
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          component={Link}
          to="/register"
          variant="contained"
          sx={{
            backgroundColor: "#CC0033",
            color: "#FFFFFF",
            "&:hover": { backgroundColor: "#AA0029" },
          }}
        >
          Register
        </Button>
        <Button
          component={Link}
          to="/login"
          variant="outlined"
          sx={{
            borderColor: "#CC0033",
            color: "#CC0033",
            "&:hover": { backgroundColor: "#FBE9E9" },
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
