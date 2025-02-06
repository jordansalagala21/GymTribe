import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  Card,
  CardContent,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { keyframes } from "@emotion/react";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PeopleIcon from "@mui/icons-material/People";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import StarIcon from "@mui/icons-material/Star";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  interface FeatureCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    comingSoon?: boolean;
  }

  const FeatureCard = ({
    icon: Icon,
    title,
    description,
    comingSoon = false,
  }: FeatureCardProps) => (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(204, 0, 51, 0.1)",
        borderRadius: 4,
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-8px)",
        },
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ position: "relative" }}>
          {comingSoon && (
            <Box
              sx={{
                position: "absolute",
                top: -12,
                right: -12,
                backgroundColor: "#FFC107",
                color: "#000",
                px: 2,
                py: 0.5,
                borderRadius: "20px",
                fontSize: "0.75rem",
                fontWeight: "bold",
                zIndex: 1,
              }}
            >
              Coming Soon
            </Box>
          )}
          <Avatar
            sx={{
              bgcolor: "#CC0033",
              width: 56,
              height: 56,
              mb: 2,
              boxShadow: "0 4px 20px rgba(204, 0, 51, 0.2)",
            }}
          >
            <Icon />
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ backgroundColor: "#FAFAFA" }}>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "90vh",
          background: "linear-gradient(135deg, #CC0033 0%, #FF1F5A 100%)",
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
          pt: 8,
          pb: 16,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ animation: `${fadeIn} 1s ease-out` }}>
                <Typography
                  variant={isMobile ? "h3" : "h1"}
                  sx={{
                    color: "#FFF",
                    fontWeight: 800,
                    mb: 3,
                    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  Find Your Fitness
                  <br />
                  Community
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    mb: 4,
                    maxWidth: "500px",
                  }}
                >
                  Join Gymtribe to discover nearby gyms, connect with workout
                  buddies, and achieve your fitness goals together.
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: "#FFF",
                      color: "#CC0033",
                      px: 4,
                      py: 1.5,
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.9)",
                      },
                    }}
                  >
                    Get Started
                  </Button>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: "#FFF",
                      color: "#FFF",
                      px: 4,
                      py: 1.5,
                      "&:hover": {
                        borderColor: "rgba(255,255,255,0.9)",
                        bgcolor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    Login
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container
        maxWidth="lg"
        sx={{
          mt: -10,
          mb: 10,
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard
              icon={SensorOccupiedIcon}
              title="Real-time Gym Occupancy"
              description="Check current gym capacity and plan your workouts efficiently"
              comingSoon
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard
              icon={PeopleIcon}
              title="Connect with Others"
              description="Find workout partners and build your fitness community"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard
              icon={FitnessCenterIcon}
              title="Personalized Plans"
              description="Get customized workout routines based on your goals"
            />
          </Grid>
        </Grid>
      </Container>

      {/* Testimonials */}
      <Box sx={{ bgcolor: "#FFF", py: 10 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              mb: 6,
              color: "#CC0033",
            }}
          >
            Success Stories
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                quote:
                  "Gymtribe transformed my fitness journey. I've found amazing workout partners and achieved goals I never thought possible!",
                author: "Sarah Mitchell",
                role: "Member since 2024",
              },
              {
                quote:
                  "The real-time gym occupancy feature saves me so much time. No more waiting for equipment or overcrowded spaces.",
                author: "James Wilson",
                role: "Fitness Enthusiast",
              },
              {
                quote:
                  "As a personal trainer, I love how Gymtribe connects me with clients who share my passion for fitness.",
                author: "Emma Rodriguez",
                role: "Personal Trainer",
              },
            ].map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    bgcolor: "#FAFAFA",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: 4,
                    p: 2,
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        color: "#FFC107",
                        mb: 2,
                      }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} fontSize="small" />
                      ))}
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 3,
                        fontStyle: "italic",
                        color: "text.secondary",
                      }}
                    >
                      "{testimonial.quote}"
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {testimonial.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: "#CC0033",
          color: "#FFF",
          py: 10,
          clipPath: "polygon(0 15%, 100% 0, 100% 85%, 0 100%)",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 3 }}>
            Ready to Transform Your Fitness Journey?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of fitness enthusiasts who have found their tribe
          </Typography>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#FFF",
              color: "#CC0033",
              px: 6,
              py: 2,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.9)",
              },
            }}
          >
            Join Gymtribe Today
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "#1A1A1A", color: "#FFF", py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                © 2025 Gymtribe. All rights reserved.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
