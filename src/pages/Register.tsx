import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Avatar,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
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

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(""); // Email validation error state
  const navigate = useNavigate();

  // Function to validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user profile data to Firestore
      await setDoc(doc(db, "profiles", user.uid), {
        name,
        age,
        email,
      });

      navigate("/dashboard"); // Redirect to dashboard on success
    } catch (err) {
      setError("Registration failed. Please try again.");
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

      {/* Registration Form */}
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
            <PeopleIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" fontWeight="bold">
            Create Your Account
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            Join us and find like-minded gym buddies!
          </Typography>
        </Box>

        <form onSubmit={handleRegister} style={{ width: "100%" }}>
          {/* Name Field */}
          <TextField
            fullWidth
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />

          {/* Age Field */}
          <TextField
            fullWidth
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            margin="normal"
            required
          />

          {/* Email Field with Validation */}
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (!isValidEmail(e.target.value)) {
                setEmailError("Please enter a valid email address.");
              } else {
                setEmailError("");
              }
            }}
            margin="normal"
            error={!!emailError}
            helperText={emailError}
            required
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

          {/* Register Button */}
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
            Register
          </Button>
        </form>

        {/* Already Registered Link */}
        <Typography sx={{ marginTop: 3, textAlign: "center" }}>
          Already registered?{" "}
          <Link to="/login" style={{ color: "#CC0033", fontWeight: "bold" }}>
            Login here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
