// src/pages/Home.tsx
import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { keyframes } from "@emotion/react";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PeopleIcon from "@mui/icons-material/People";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";

// Keyframe for fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#FFFFFF",
        padding: 3,
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          animation: `${fadeIn} 1s ease-out`,
          maxWidth: "800px",
          margin: "0 auto",
          padding: 4,
        }}
      >
        <Typography
          variant="h2"
          sx={{ color: "#CC0033", fontWeight: "bold", marginBottom: 2 }}
        >
          Welcome to Gymtribe
        </Typography>
        <Typography variant="h6" sx={{ color: "#000000", marginBottom: 4 }}>
          Discover your gym tribe! Find gyms nearby and connect with others
          following similar workout plans. Start your fitness journey with us!
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Button
            component={Link}
            to="/register"
            variant="contained"
            sx={{
              backgroundColor: "#CC0033",
              color: "#FFFFFF",
              "&:hover": { backgroundColor: "#AA0029" },
            }}
          >
            Register
          </Button>
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            sx={{
              borderColor: "#CC0033",
              color: "#CC0033",
              "&:hover": { backgroundColor: "#FBE9E9" },
            }}
          >
            Login
          </Button>
        </Box>
      </Box>

      {/* How It Works Section */}
      <Container sx={{ marginTop: 8, marginBottom: 8 }}>
        <Typography
          variant="h4"
          sx={{ color: "#CC0033", fontWeight: "bold", marginBottom: 4 }}
        >
          How It Works
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                boxShadow: 3,
                borderRadius: 2,
                position: "relative", // For positioning the badge
              }}
            >
              {/* Coming Soon Badge */}
              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "#FFC107",
                  color: "#000000",
                  padding: "4px 8px",
                  borderRadius: 8,
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                }}
              >
                Coming Soon
              </Box>

              <Avatar sx={{ bgcolor: "#CC0033", marginBottom: 2 }}>
                <SensorOccupiedIcon />
              </Avatar>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ color: "#CC0033", fontWeight: "bold", marginBottom: 2 }}
                >
                  View Gym Occupancy
                </Typography>
                <Typography variant="body1" sx={{ color: "#000000" }}>
                  Stay informed about the current gym capacity and plan your
                  workout sessions accordingly.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <Avatar sx={{ bgcolor: "#CC0033", marginBottom: 2 }}>
                <PeopleIcon />
              </Avatar>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ color: "#CC0033", fontWeight: "bold", marginBottom: 2 }}
                >
                  Connect with Others
                </Typography>
                <Typography variant="body1" sx={{ color: "#000000" }}>
                  Join a community of fitness enthusiasts and share your
                  journey.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <Avatar sx={{ bgcolor: "#CC0033", marginBottom: 2 }}>
                <FitnessCenterIcon />
              </Avatar>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ color: "#CC0033", fontWeight: "bold", marginBottom: 2 }}
                >
                  Get Fit Together
                </Typography>
                <Typography variant="body1" sx={{ color: "#000000" }}>
                  Follow personalized workout plans and achieve your fitness
                  goals.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Container sx={{ marginTop: 8, marginBottom: 8 }}>
        <Typography
          variant="h4"
          sx={{ color: "#CC0033", fontWeight: "bold", marginBottom: 4 }}
        >
          Why Choose Gymtribe?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ color: "#CC0033", fontWeight: "bold", marginBottom: 2 }}
                >
                  Comprehensive Directory
                </Typography>
                <Typography variant="body1" sx={{ color: "#000000" }}>
                  Access a wide range of gyms and fitness centers near you.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ color: "#CC0033", fontWeight: "bold", marginBottom: 2 }}
                >
                  Community Support
                </Typography>
                <Typography variant="body1" sx={{ color: "#000000" }}>
                  Engage with a supportive community of fitness enthusiasts.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                boxShadow: 3,
                borderRadius: 2,
                position: "relative", // To position the badge correctly
              }}
            >
              {/* Coming Soon Badge */}
              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "#FFC107",
                  color: "#000000",
                  padding: "4px 8px",
                  borderRadius: 8,
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                }}
              >
                Coming Soon
              </Box>

              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ color: "#CC0033", fontWeight: "bold", marginBottom: 2 }}
                >
                  Tailored Workouts
                </Typography>
                <Typography variant="body1" sx={{ color: "#000000" }}>
                  Get customized workout plans tailored to your fitness goals.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Container sx={{ marginTop: 8, marginBottom: 8 }}>
        <Typography
          variant="h4"
          sx={{ color: "#CC0033", fontWeight: "bold", marginBottom: 4 }}
        >
          What Our Users Say
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#000000",
                    fontStyle: "italic",
                    marginBottom: 2,
                  }}
                >
                  "Gymtribe helped me find the perfect gym and connect with
                  like-minded people. Highly recommended!"
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#CC0033", fontWeight: "bold" }}
                >
                  – John Doe
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#000000",
                    fontStyle: "italic",
                    marginBottom: 2,
                  }}
                >
                  "The personalized workout plans are amazing. I've never been
                  more motivated!"
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#CC0033", fontWeight: "bold" }}
                >
                  – Jane Smith
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#000000",
                    fontStyle: "italic",
                    marginBottom: 2,
                  }}
                >
                  "I love the community aspect. It feels like I'm part of a
                  fitness family!"
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#CC0033", fontWeight: "bold" }}
                >
                  – Alex Johnson
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#FBE9E9",
          padding: 8,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "#CC0033", fontWeight: "bold", marginBottom: 4 }}
        >
          Ready to Join the Tribe?
        </Typography>
        <Typography variant="h6" sx={{ color: "#000000", marginBottom: 4 }}>
          Sign up today and start your fitness journey with Gymtribe!
        </Typography>
        <Button
          component={Link}
          to="/register"
          variant="contained"
          sx={{
            backgroundColor: "#CC0033",
            color: "#FFFFFF",
            "&:hover": { backgroundColor: "#AA0029" },
          }}
        >
          Get Started
        </Button>
      </Box>

      {/* Footer Section */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#CC0033",
          color: "#FFFFFF",
          padding: 4,
          marginTop: "auto",
        }}
      >
        <Typography variant="body1">
          © 2023 Gymtribe. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
