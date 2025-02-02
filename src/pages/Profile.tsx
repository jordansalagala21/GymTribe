import React, { useState, useEffect } from "react";
import { auth, db } from "../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  Box,
  TextField,
  Button,
  Typography,
  Chip,
  Autocomplete,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [preferredGym, setPreferredGym] = useState("");
  const navigate = useNavigate();

  const options = [
    "Cardio",
    "Swimming",
    "Push-Pull-Legs (PPL)",
    "Arnold Split",
    "Strength Training",
    "Yoga",
    "CrossFit",
    "HIIT",
    "Cycling",
  ];

  const gyms = [
    "College Avenue Gym",
    "Cook/Douglass Recreation Center",
    "Livingston Recreation Center",
    "Werblin Recreation Center",
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
          setPreferredGym(data.preferredGym || "");
        }
      }
    };
    fetchProfileData();
  }, []);

  const handleSaveProfile = async () => {
    const user = auth.currentUser;
    if (user) {
      await setDoc(doc(db, "profiles", user.uid), {
        name,
        age,
        preferences,
        preferredGym,
      });
      alert("Profile updated successfully!");
      navigate("/dashboard");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "auto",
        padding: 4,
        marginTop: 12,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          position: "absolute",
          top: "69%",
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
      <Typography variant="h4" textAlign="center" gutterBottom>
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
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        margin="normal"
      />

      {/* Gym Selection */}
      <FormControl fullWidth sx={{ marginTop: 3 }}>
        <InputLabel>Preferred Gym</InputLabel>
        <Select
          value={preferredGym}
          onChange={(e) => setPreferredGym(e.target.value)}
          label="Preferred Gym"
        >
          {gyms.map((gym, index) => (
            <MenuItem key={index} value={gym}>
              {gym}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Preferences */}
      <Typography variant="h6" sx={{ marginTop: 3 }}>
        Preferences
      </Typography>
      <Autocomplete
        multiple
        options={options}
        value={preferences}
        onChange={(_, newValue) => setPreferences(newValue)}
        renderTags={(value: string[], getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={option}
              {...getTagProps({ index })}
              sx={{ margin: "4px" }}
            />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} placeholder="Select preferences" />
        )}
        sx={{ marginTop: 2 }}
      />

      <Button
        variant="contained"
        fullWidth
        sx={{ marginTop: 4, backgroundColor: "#CC0033" }}
        onClick={handleSaveProfile}
      >
        Save Profile
      </Button>
    </Box>
  );
};

export default Profile;
