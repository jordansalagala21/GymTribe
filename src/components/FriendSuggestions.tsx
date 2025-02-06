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
  bio?: string;
  photoURL?: string;
}

const FriendSuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [sendingRequest, setSendingRequest] = useState<{
    [id: string]: boolean;
  }>({});
  const [pendingRequests, setPendingRequests] = useState<Set<string>>(
    new Set()
  );
  const [, setFriendIds] = useState<Set<string>>(new Set());
  const [currentUserPreferences, setCurrentUserPreferences] = useState<
    string[]
  >([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const user = auth.currentUser;
      if (!user) return;

      // Step 1: Fetch pending friend requests
      const requestsQuery = query(
        collection(db, "friendRequests"),
        where("senderId", "==", user.uid),
        where("status", "==", "pending")
      );
      const requestSnapshot = await getDocs(requestsQuery);
      const pendingIds = new Set(
        requestSnapshot.docs.map((doc) => doc.data().receiverId)
      );
      setPendingRequests(pendingIds);

      // Step 2: Fetch friends of the current user
      const friendsQuery = query(
        collection(db, "friends"),
        where("user1Id", "==", user.uid)
      );
      const friendsSnapshot = await getDocs(friendsQuery);
      const friendsIdsSet = new Set(
        friendsSnapshot.docs.map((doc) => doc.data().user2Id)
      );
      setFriendIds(friendsIdsSet);

      // Step 3: Fetch current user's preferences
      const userDoc = await getDocs(collection(db, "profiles"));
      const userProfile = userDoc.docs
        .find((doc) => doc.id === user.uid)
        ?.data();
      const userPreferences = userProfile?.preferences || [];
      setCurrentUserPreferences(userPreferences);

      // Step 4: Fetch suggestions and filter
      const userQuery = query(
        collection(db, "profiles"),
        where("preferences", "array-contains-any", userPreferences)
      );
      const suggestionSnapshot = await getDocs(userQuery);

      const suggestedUsers = suggestionSnapshot.docs
        .filter((doc) => !friendsIdsSet.has(doc.id) && doc.id !== user.uid) // Exclude friends and the current user
        .map((doc) => ({ id: doc.id, ...doc.data() })) as User[];

      setSuggestions(suggestedUsers);
    };

    fetchSuggestions();
  }, []);

  const calculateMatchRate = (userPreferences: string[]): number => {
    if (!currentUserPreferences.length) return 0;

    const matchedPreferences = userPreferences.filter((pref) =>
      currentUserPreferences.includes(pref)
    );
    return Math.round(
      (matchedPreferences.length / currentUserPreferences.length) * 100
    );
  };

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

      // Add the receiver ID to the pendingRequests set
      setPendingRequests((prev) => new Set(prev).add(receiverId));
    } catch (error) {
      console.error("Error sending friend request:", error);
    } finally {
      setSendingRequest((prev) => ({ ...prev, [receiverId]: false }));
    }
  };

  return (
    <Box>
      {suggestions.length === 0 && (
        <Typography
          variant="body1"
          color="#CC0033"
          textAlign="center"
          sx={{ marginTop: 3 }}
        >
          No suggestions available at the moment. Make sure to add your
          preferences in the profile section!
        </Typography>
      )}
      <Grid container spacing={3}>
        {suggestions.map((user) => {
          const matchRate = calculateMatchRate(user.preferences);

          return (
            <Grid item xs={12} key={user.id}>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  boxShadow: 2,
                  padding: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: 6,
                    backgroundColor: "#f7f7f7",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    backgroundColor: "#CC0033",
                    marginRight: 2,
                  }}
                  src={user.photoURL}
                  alt={user.name}
                >
                  {!user.photoURL && user.name.charAt(0).toUpperCase()}
                </Avatar>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {user.name}
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                    {user.bio || "No bio available"}
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
                  <Typography
                    variant="body2"
                    sx={{ marginTop: 1, fontWeight: "bold", color: "#CC0033" }}
                  >
                    Match Rate: {matchRate}%
                  </Typography>
                </CardContent>

                {/* Display Pending or Add Friend button */}
                {pendingRequests.has(user.id) ? (
                  <Button variant="outlined" disabled>
                    Pending
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    startIcon={<PersonAddIcon />}
                    sx={{ borderColor: "#CC0033", color: "#CC0033" }}
                    onClick={() => handleSendFriendRequest(user.id)}
                    disabled={sendingRequest[user.id]}
                  >
                    {sendingRequest[user.id] ? "Sending..." : "Add Friend"}
                  </Button>
                )}
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default FriendSuggestions;
