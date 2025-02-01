import React, { useState, useEffect } from "react";
import { auth, db } from "../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const [age, setAge] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);

  const options = [
    "Cardio",
    "Swimming",
    "Push-Pull-Legs (PPL)",
    "Arnold Split",
    "Strength Training",
  ];

  useEffect(() => {
    const fetchProfileData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "profiles", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || "");
          setAge(data.age || "");
          setPreferences(data.preferences || []);
        }
      }
    };
    fetchProfileData();
  }, []);

  const handleTogglePreference = (option: string) => {
    setPreferences((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleSaveProfile = async () => {
    const user = auth.currentUser;
    if (user) {
      await setDoc(doc(db, "profiles", user.uid), { name, age, preferences });
      alert("Profile updated successfully!");
      navigate("/dashboard"); // Redirect to dashboard after saving
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Edit Profile
      </Typography>
      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        margin="normal"
      />
      <Typography variant="h6" sx={{ marginTop: 3 }}>
        Preferences
      </Typography>
      {options.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              checked={preferences.includes(option)}
              onChange={() => handleTogglePreference(option)}
            />
          }
          label={option}
        />
      ))}
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleSaveProfile}
      >
        Save Profile
      </Button>
    </Box>
  );
};

export default Profile;
