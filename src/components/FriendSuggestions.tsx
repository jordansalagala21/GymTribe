import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Stack,
  Avatar,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SchoolIcon from "@mui/icons-material/School";
import { auth, db } from "../services/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

interface User {
  id: string;
  name: string;
  preferences: string[];
  collegeYear: string;
}

const FriendSuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [sendingRequest, setSendingRequest] = useState<{
    [id: string]: boolean;
  }>({});

  useEffect(() => {
    const fetchSuggestions = async () => {
      const user = auth.currentUser;
      if (!user) return;

      // Fetch the current user's preferences
      const userDoc = await getDocs(collection(db, "profiles"));
      const currentUserPreferences = userDoc.docs
        .find((doc) => doc.id === user.uid)
        ?.data().preferences;

      // Exclude users with pending or accepted friend requests
      const requestsQuery = query(
        collection(db, "friendRequests"),
        where("senderId", "==", user.uid),
        where("status", "in", ["pending", "accepted"])
      );
      const requestSnapshot = await getDocs(requestsQuery);
      const excludedIds = requestSnapshot.docs.map(
        (doc) => doc.data().receiverId
      );

      // Query users with matching preferences and filter out excluded IDs
      const userQuery = query(
        collection(db, "profiles"),
        where("preferences", "array-contains-any", currentUserPreferences)
      );
      const suggestionSnapshot = await getDocs(userQuery);

      const suggestedUsers = suggestionSnapshot.docs
        .filter((doc) => !excludedIds.includes(doc.id) && doc.id !== user.uid)
        .map((doc) => ({ id: doc.id, ...doc.data() })) as User[];

      setSuggestions(suggestedUsers);
    };

    fetchSuggestions();
  }, []);

  const handleSendFriendRequest = async (receiverId: string) => {
    const user = auth.currentUser;
    if (!user) return;

    setSendingRequest((prev) => ({ ...prev, [receiverId]: true }));

    try {
      await addDoc(collection(db, "friendRequests"), {
        senderId: user.uid,
        receiverId,
        status: "pending",
        createdAt: new Date(),
      });
      alert("Friend request sent!");
    } catch (error) {
      console.error("Error sending friend request:", error);
    } finally {
      setSendingRequest((prev) => ({ ...prev, [receiverId]: false }));
    }
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {suggestions.map((user) => (
          <Grid item xs={12} key={user.id}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                boxShadow: 2,
                padding: 2,
              }}
            >
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  backgroundColor: "#CC0033",
                  marginRight: 2,
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {user.name}
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ marginTop: 1 }}
                >
                  <SchoolIcon sx={{ color: "#757575" }} />
                  <Typography variant="body2" color="textSecondary">
                    {user.collegeYear}
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  Preferences: {user.preferences.join(", ")}
                </Typography>
              </CardContent>
              <Button
                variant="outlined"
                startIcon={<PersonAddIcon />}
                sx={{ borderColor: "#CC0033", color: "#CC0033" }}
                onClick={() => handleSendFriendRequest(user.id)}
                disabled={sendingRequest[user.id]}
              >
                {sendingRequest[user.id] ? "Sending..." : "Add Friend"}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FriendSuggestions;
