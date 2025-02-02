import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { gyms } from "../data/gym";

const GymList: React.FC = () => {
  return (
    <Grid container spacing={3}>
      {gyms.map((gym) => (
        <Grid item xs={12} md={6} key={gym.id}>
          <Card
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              height: "100%", // Ensure cards take up equal height
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent
              sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
            >
              {/* Gym Name */}
              <Stack direction="row" alignItems="center" spacing={2}>
                <FitnessCenterIcon sx={{ fontSize: 40, color: "#CC0033" }} />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {gym.name}
                </Typography>
              </Stack>

              {/* Location */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ marginTop: 2 }}
              >
                <LocationOnIcon sx={{ color: "#CC0033" }} />
                <Typography variant="body2" color="#CC0033">
                  {gym.location}
                </Typography>
              </Stack>

              {/* Amenities */}
              <Typography
                variant="body1"
                sx={{ marginTop: 2, fontWeight: "bold" }}
              >
                Amenities:
              </Typography>
              <Box
                sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginTop: 1 }}
              >
                {gym.amenities.map((amenity, index) => (
                  <Chip
                    key={index}
                    label={amenity}
                    variant="outlined"
                    sx={{ fontSize: "0.875rem" }}
                  />
                ))}
              </Box>

              {/* Spacer to push button to the bottom */}
              <Box sx={{ flexGrow: 1 }} />

              {/* View More Button */}
              <Button
                variant="outlined"
                fullWidth
                sx={{ marginTop: 3, borderColor: "#CC0033", color: "#CC0033" }}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default GymList;
