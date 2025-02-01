// src/pages/Dashboard.tsx
import React, { useEffect } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import Navbar from "../components/Navbar";
import GymList from "../components/GymList";
import FriendSuggestions from "../components/FriendSuggestions";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar title="R GymTribe" />

      {/* Main Content */}
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5" sx={{ marginBottom: 4, textAlign: "center" }}>
          Welcome to Your Fitness Hub
        </Typography>

        {/* Grid Layout */}
        <Grid container spacing={3}>
          {/* Gym List Section */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Explore Gyms Near You
                </Typography>
                <GymList />
              </CardContent>
            </Card>
          </Grid>

          {/* Friend Suggestions Section */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  People You May Know
                </Typography>
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
