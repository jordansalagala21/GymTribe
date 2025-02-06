import React, { useState, useEffect, ChangeEvent } from "react";
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
import { auth, db, storage } from "../services/firebase";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);
  const [preferredGym, setPreferredGym] = useState("");
  const [collegeYear, setCollegeYear] = useState("");
  const [bio, setBio] = useState(""); // New bio field
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoURL, setPhotoURL] = useState<string>("");
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
          setBio(data.bio || ""); // Load bio
          setPhotoURL(data.photoURL || "");
        }
      }
    };
    fetchProfileData();
  }, []);

  const handleSaveProfile = async () => {
    const user = auth.currentUser;
    if (user) {
      let updatedPhotoURL = photoURL;

      // Upload the profile photo if a new one is selected
      if (profilePhoto) {
        try {
          const storageRef = ref(storage, `profile_photos/${user.uid}`);
          await uploadBytes(storageRef, profilePhoto);
          updatedPhotoURL = await getDownloadURL(storageRef);
        } catch (error) {
          console.error("Error uploading profile photo:", error);
        }
      }

      // Save the profile data to Firestore
      await setDoc(doc(db, "profiles", user.uid), {
        name,
        age,
        preferences,
        preferredGym,
        collegeYear,
        bio, // Save bio
        photoURL: updatedPhotoURL,
      });

      setShowSnackbar(true);
      setTimeout(() => navigate("/dashboard"), 1500);
    }
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await deleteDoc(doc(db, "profiles", user.uid));
        await user.delete();
        setShowSnackbar(true);
        setTimeout(() => navigate("/"), 1500);
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        alert("Invalid file type. Please upload a JPEG or PNG image.");
      } else if (file.size > maxSize) {
        alert("File size exceeds the 5MB limit. Please upload a smaller file.");
      } else {
        setProfilePhoto(file);
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setPhotoURL(fileReader.result as string); // Display preview of uploaded image
        };
        fileReader.readAsDataURL(file);
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
        <Avatar
          sx={{ width: 56, height: 56, backgroundColor: "#CC0033" }}
          src={photoURL}
          alt="Profile Photo"
        >
          {!photoURL && <PersonIcon fontSize="large" />}
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
      />

      <TextField
        fullWidth
        label="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        margin="normal"
        helperText="Tell us something about yourself (max 300 characters)."
        inputProps={{ maxLength: 300 }}
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

      {/* Upload Profile Photo */}
      <Typography variant="h6" sx={{ marginTop: 4, fontWeight: "bold" }}>
        Upload Profile Photo
      </Typography>
      <Button variant="outlined" component="label" sx={{ marginTop: 2 }}>
        Choose File
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handlePhotoChange}
        />
      </Button>

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
            undone. Your profile and all associated data will be permanently!
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
          Profile updated successfully! Taking you back in 3s...!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
