import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { gyms } from "../data/gym";

const gymTimings: { [key: string]: string[] } = {
  "College Avenue Gym": [
    "Mon-Thu: 7AM-11PM",
    "Fri: 7AM-9PM",
    "Sat: 11AM-7PM",
    "Sun: 11AM-9PM",
  ],
  "Cook/Douglass Recreation Center": [
    "Mon-Thu: 8AM-11PM",
    "Fri: 8AM-7PM",
    "Sat: 11AM-7PM",
    "Sun: 11AM-9PM",
  ],
  "Livingston Recreation Center": [
    "Mon-Thu: 8AM-11PM",
    "Fri: 8AM-7PM",
    "Sat: 11AM-7PM",
    "Sun: 11AM-9PM",
  ],
  "Werblin Recreation Center": [
    "Mon-Thu: 7AM-11PM",
    "Fri: 7AM-9PM",
    "Sat: 11AM-7PM",
    "Sun: 11AM-9PM",
  ],
};

const GymList: React.FC = () => {
  return (
    <Grid container spacing={4} sx={{ padding: 4 }}>
      {gyms.map((gym) => (
        <Grid item xs={12} md={6} key={gym.id}>
          <Card
            sx={{
              boxShadow: 4,
              borderRadius: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ padding: 3, flexGrow: 1 }}>
              {/* Gym Name */}
              <Stack direction="row" alignItems="center" spacing={2}>
                <FitnessCenterIcon sx={{ fontSize: 40, color: "#CC0033" }} />
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  {gym.name}
                </Typography>
              </Stack>

              {/* Divider */}
              <Divider sx={{ marginY: 2 }} />

              {/* Location */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <LocationOnIcon sx={{ color: "#CC0033" }} />
                <Typography variant="body2" sx={{ color: "#555" }}>
                  {gym.location}
                </Typography>
              </Stack>

              {/* Amenities */}
              <Typography
                variant="body1"
                sx={{ marginTop: 2, fontWeight: "bold", color: "#333" }}
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
                    sx={{
                      fontSize: "0.875rem",
                      color: "#333",
                      borderColor: "#CC0033",
                    }}
                  />
                ))}
              </Box>

              {/* Gym Timings */}
              <Typography
                variant="body1"
                sx={{ marginTop: 3, fontWeight: "bold", color: "#333" }}
              >
                Timings:
              </Typography>
              <Stack
                direction="row"
                alignItems="flex-start"
                spacing={1}
                sx={{ marginTop: 1 }}
              >
                <ScheduleIcon sx={{ color: "#CC0033" }} />
                <Box>
                  {gymTimings[gym.name]?.map((timing, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{ color: "#555" }}
                    >
                      {timing}
                    </Typography>
                  ))}
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default GymList;
