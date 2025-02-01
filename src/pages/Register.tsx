import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { TextField, Button, Typography, Box } from "@mui/material";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
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

      navigate("/preferences"); // Redirect to preferences after registration
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        align="center"
        fontFamily={"Roboto, sans-serif"}
        sx={{ marginBottom: 4, marginTop: 8, color: "#CC0033" }}
      >
        Join us and find like-minded gym buddies!
      </Typography>
      <Box
        sx={{
          maxWidth: 400,
          margin: "auto",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Create Your Account
        </Typography>

        <form onSubmit={handleRegister} style={{ width: "100%" }}>
          {/* Name Field */}
          <Typography sx={{ marginBottom: 1 }}>Your Full Name</Typography>
          <TextField
            fullWidth
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="none"
          />

          {/* Age Field */}
          <Typography sx={{ marginBottom: 1, marginTop: 3 }}>
            Your Age
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter your age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            margin="none"
          />

          {/* Email Field */}
          <Typography sx={{ marginBottom: 1, marginTop: 3 }}>
            Email Address
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="none"
          />

          {/* Password Field */}
          <Typography sx={{ marginBottom: 1, marginTop: 3 }}>
            Password
          </Typography>
          <TextField
            fullWidth
            placeholder="Create a password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="none"
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

          {/* Register Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 4, backgroundColor: "#CC0033" }}
          >
            Register
          </Button>
        </form>

        {/* Already Registered Link */}
        <Typography sx={{ marginTop: 3, textAlign: "center" }}>
          Already registered? <Link to="/login">Login here</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
