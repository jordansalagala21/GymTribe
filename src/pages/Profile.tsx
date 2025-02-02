import React, { useState, useEffect } from "react";
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
  Avatar,
  Divider,
  Stack,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SchoolIcon from "@mui/icons-material/School";
import { auth, db } from "../services/firebase";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [preferredGym, setPreferredGym] = useState("");
  const [collegeYear, setCollegeYear] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
    "Functional Training",
    "Athletic Training",
  ];

  const gyms = [
    "College Avenue Gym",
    "Cook/Douglass Recreation Center",
    "Livingston Recreation Center",
    "Werblin Recreation Center",
  ];

  const collegeYears = ["Freshman", "Sophomore", "Junior", "Senior"];

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
          setCollegeYear(data.collegeYear || "");
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
        collegeYear,
      });
      setShowSnackbar(true);
      setTimeout(() => navigate("/dashboard"), 1500);
    }
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        // Delete the user profile from Firestore
        await deleteDoc(doc(db, "profiles", user.uid));

        // Delete the user account from Firebase Auth
        await user.delete();

        // Show success message and redirect to home page
        setShowSnackbar(true);
        setTimeout(() => navigate("/"), 1500);
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        padding: 4,
        marginTop: 8,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: 4,
        backgroundColor: "#fff",
      }}
    >
      {/* Header with Avatar */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ marginBottom: 3 }}
      >
        <Avatar sx={{ width: 56, height: 56, backgroundColor: "#CC0033" }}>
          <PersonIcon fontSize="large" />
        </Avatar>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Edit Profile
        </Typography>
      </Stack>

      <Divider sx={{ marginBottom: 3 }} />

      {/* Personal Information Section */}
      <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        Personal Information
      </Typography>

      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        helperText="Enter your full name."
      />

      <TextField
        fullWidth
        label="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        margin="normal"
        helperText="Enter your age in years."
      />

      <FormControl fullWidth sx={{ marginTop: 3 }}>
        <InputLabel>College Year</InputLabel>
        <Select
          value={collegeYear}
          onChange={(e) => setCollegeYear(e.target.value)}
          label="College Year"
          startAdornment={<SchoolIcon sx={{ marginRight: 1 }} />}
        >
          {collegeYears.map((year, index) => (
            <MenuItem key={index} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Gym Information Section */}
      <Typography variant="h6" sx={{ marginTop: 4, fontWeight: "bold" }}>
        Gym Information
      </Typography>

      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <InputLabel>Preferred Gym</InputLabel>
        <Select
          value={preferredGym}
          onChange={(e) => setPreferredGym(e.target.value)}
          label="Preferred Gym"
          startAdornment={<FitnessCenterIcon sx={{ marginRight: 1 }} />}
        >
          {gyms.map((gym, index) => (
            <MenuItem key={index} value={gym}>
              {gym}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Preferences Section */}
      <Typography variant="h6" sx={{ marginTop: 4, fontWeight: "bold" }}>
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

      {/* Save Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          marginTop: 4,
          backgroundColor: "#CC0033",
          padding: 1.5,
          fontSize: "1rem",
          fontWeight: "bold",
        }}
        onClick={handleSaveProfile}
      >
        Save Profile
      </Button>

      {/* Delete Account Button */}
      <Button
        variant="outlined"
        fullWidth
        sx={{
          marginTop: 2,
          color: "#CC0033",
          borderColor: "#CC0033",
          padding: 1.5,
          fontSize: "1rem",
          fontWeight: "bold",
        }}
        onClick={() => setShowDeleteDialog(true)}
      >
        Delete Account
      </Button>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      >
        <DialogTitle>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteAccount}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Alert */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={1500}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
