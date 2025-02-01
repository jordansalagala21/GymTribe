// src/components/GymList.tsx
import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { gyms } from "../data/gym";

const GymList: React.FC = () => {
  return (
    <List>
      {gyms.map((gym) => (
        <ListItem key={gym.id}>
          <ListItemText
            primary={gym.name}
            secondary={`Location: ${gym.location}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default GymList;
