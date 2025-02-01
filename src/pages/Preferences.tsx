import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";

const Preferences: React.FC = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<string[]>([]);

  const options = [
    "Cardio",
    "Swimming",
    "Push-Pull-Legs (PPL)",
    "Arnold Split",
    "Strength Training",
  ];

  const handleToggle = (option: string) => {
    setPreferences((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleSavePreferences = async () => {
    const user = auth.currentUser;
    if (user) {
      await setDoc(doc(db, "preferences", user.uid), { preferences });
      navigate("/dashboard");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Set Your Preferences
      </Typography>
      {options.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              checked={preferences.includes(option)}
              onChange={() => handleToggle(option)}
            />
          }
          label={option}
        />
      ))}
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleSavePreferences}
      >
        Save Preferences
      </Button>
    </Box>
  );
};

export default Preferences;
