import React, { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import Navbar from "../components/Navbar";
import GymList from "../components/GymList";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import YourFriends from "../components/YourFriends";
import FriendSuggestions from "../components/FriendSuggestions";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  useEffect(() => {
    const fetchMessages = () => {
      const user = auth.currentUser;
      if (!user) return;

      // Query messages where the user is a participant
      const messagesQuery = query(
        collection(db, "messages"),
        where("chatParticipants", "array-contains", user.uid),
        where("timestamp", ">", Timestamp.now())
      );

      const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const messageData = change.doc.data();
            if (messageData.senderId !== user.uid) {
              showNotification("You have a new message!");
            }
          }
        });
      });

      return unsubscribeMessages;
    };

    const unsubscribe = fetchMessages();
    return () => unsubscribe && unsubscribe();
  }, []);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000); // Auto-hide after 3 seconds
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
      <Navbar title="R GymTribe" />

      {/* Notification Snackbar */}
      <Snackbar
        open={!!notification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="info" sx={{ width: "100%" }}>
          {notification}
        </Alert>
      </Snackbar>

      <Box sx={{ padding: 4 }}>
        <Typography
          variant="h5"
          sx={{ marginBottom: 4, textAlign: "center", fontWeight: "bold" }}
        >
          Welcome to Your Fitness Hub
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ marginBottom: 2 }}
                >
                  <FitnessCenterIcon sx={{ fontSize: 40, color: "#CC0033" }} />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Explore Gyms Near You
                  </Typography>
                </Stack>
                <GymList />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            {/* Your Friends Section */}
            <Card sx={{ boxShadow: 3, borderRadius: 2, marginBottom: 4 }}>
              <CardContent>
                <YourFriends />
              </CardContent>
            </Card>

            {/* People You May Know Section */}
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ marginBottom: 2 }}
                >
                  <PeopleAltIcon sx={{ fontSize: 40, color: "#CC0033" }} />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    People You May Know
                  </Typography>
                </Stack>
                <FriendSuggestions />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
