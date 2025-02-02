import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";

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
        backgroundColor: "#F0F4F8",
        position: "relative",
      }}
    >
      {/* Watermark */}
      <Typography
        variant="h1"
        sx={{
          position: "absolute",
          top: "10%",
          left: "10%",
          opacity: 0.1,
          fontSize: "10rem",
          fontWeight: "bold",
          color: "#CC0033",
          pointerEvents: "none",
        }}
      >
        GymTribe
      </Typography>

      {/* Login Box */}
      <Paper elevation={4} sx={{ padding: 4, borderRadius: 3, width: 400 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Login to Your Account
        </Typography>

        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />

          {/* Password Field */}

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />

          {/* Error Message */}
          {error && (
            <Typography
              color="error"
              sx={{ marginTop: 2, textAlign: "center" }}
            >
              {error}
            </Typography>
          )}

          {/* Login Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 4, backgroundColor: "#CC0033" }}
          >
            Login
          </Button>
        </form>

        {/* Register Link */}
        <Typography sx={{ marginTop: 3, textAlign: "center" }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
