import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import { auth, db } from "../services/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

interface User {
  id: string;
  name: string;
  preferences: string[];
}

const FriendSuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setError("User not logged in.");
          setLoading(false);
          return;
        }

        // Fetch current user preferences
        const userDoc = await getDocs(collection(db, "profiles"));
        const currentUserPreferences = userDoc.docs
          .find((doc) => doc.id === user.uid)
          ?.data().preferences;

        if (!currentUserPreferences || currentUserPreferences.length === 0) {
          setError(
            "No preferences found for the current user. Make sure to set your preferences in your profile."
          );
          setLoading(false);
          return;
        }

        // Query users with matching preferences
        const userQuery = query(
          collection(db, "profiles"),
          where("preferences", "array-contains-any", currentUserPreferences)
        );
        const suggestionSnapshot = await getDocs(userQuery);

        const suggestedUsers = suggestionSnapshot.docs
          .filter((doc) => doc.id !== user.uid) // Exclude current user
          .map((doc) => ({ id: doc.id, ...doc.data() })) as User[];

        setSuggestions(suggestedUsers);
      } catch (err) {
        setError("Failed to fetch friend suggestions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", padding: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Friend Suggestions
      </Typography>
      {suggestions.length === 0 ? (
        <Typography>No friend suggestions available.</Typography>
      ) : (
        <Grid container spacing={3}>
          {suggestions.map((user) => (
            <Grid item xs={12} md={6} key={user.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography>
                    Preferences: {user.preferences.join(", ")}
                  </Typography>
                  <Button variant="outlined" sx={{ mt: 1 }}>
                    Send Friend Request
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FriendSuggestions;
