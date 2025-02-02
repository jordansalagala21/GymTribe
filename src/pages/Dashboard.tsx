import React, { useEffect } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Grid, Card, CardContent, Stack } from "@mui/material";
import Navbar from "../components/Navbar";
import GymList from "../components/GymList";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
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
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
      <Navbar title="R GymTribe" />

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
