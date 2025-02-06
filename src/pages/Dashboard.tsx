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
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import YourFriends from "../components/YourFriends";
import FriendSuggestions from "../components/FriendSuggestions";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState<string | null>(null);
  const [, setUserName] = useState<string>("User");
  const [promotions] = useState<Array<{ gym: string; offer: string }>>([
    { gym: "College Avenue Gym", offer: "50% off annual membership!" },
    {
      gym: "Livingston Recreation Center",
      offer: "Free personal training session with new signup.",
    },
    {
      gym: "Sonny Werblin Recreation Center",
      offer: "Refer a friend and get a $25 credit.",
    },
  ]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || "User");
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  useEffect(() => {
    const fetchMessages = () => {
      const user = auth.currentUser;
      if (!user) return;

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
      <Navbar title="GymTribe" />

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
        <Grid container spacing={4}>
          {/* Explore Gyms Section */}
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

          {/* Gym Promotions Section */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ marginBottom: 2 }}
                >
                  <LocalOfferIcon sx={{ fontSize: 40, color: "#CC0033" }} />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Special Gym Promotions
                  </Typography>
                </Stack>
                <Box>
                  {promotions.map((promo, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{ marginTop: 1, color: "#555" }}
                    >
                      <strong>{promo.gym}:</strong> {promo.offer}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Fitness Progress Tracker Section */}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
