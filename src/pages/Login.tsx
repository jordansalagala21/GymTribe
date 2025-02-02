import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Avatar,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { keyframes } from "@emotion/react";

// Fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirect to dashboard on success
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      setPassword(""); // Clear the password field on error
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #FFDEE9, #B5FFFC)",
        padding: 3,
        position: "relative",
      }}
    >
      {/* Watermark */}
      <Typography
        variant="h1"
        sx={{
          position: "absolute",
          top: "5%",
          left: "5%",
          opacity: 0.05,
          fontSize: "12rem",
          fontWeight: "bold",
          color: "#CC0033",
          pointerEvents: "none",
        }}
      >
        GymTribe
      </Typography>

      {/* Login Container */}
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 3,
          width: 400,
          animation: `${fadeIn} 1s ease-out`,
        }}
      >
        <Box sx={{ textAlign: "center", marginBottom: 3 }}>
          <Avatar
            sx={{
              bgcolor: "#CC0033",
              width: 64,
              height: 64,
              margin: "0 auto",
              marginBottom: 2,
            }}
          >
            <FitnessCenterIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" fontWeight="bold">
            Login to Your Account
          </Typography>
        </Box>

        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            autoComplete="email"
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            autoComplete="current-password"
          />

          {/* Error Message */}
          {error && (
            <Typography
              color="error"
              sx={{
                marginTop: 2,
                textAlign: "center",
                animation: `${fadeIn} 0.5s ease-out`,
              }}
            >
              {error}
            </Typography>
          )}

          {/* Login Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: 4,
              backgroundColor: "#CC0033",
              color: "#FFFFFF",
              "&:hover": { backgroundColor: "#AA0029" },
            }}
          >
            Login
          </Button>
        </form>

        {/* Register Link */}
        <Typography sx={{ marginTop: 3, textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#CC0033", fontWeight: "bold" }}>
            Register here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
