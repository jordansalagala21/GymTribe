import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import FriendRequests from "./FriendRequests"; // Import FriendRequests component

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const fetchUsername = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "profiles", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUsername(docSnap.data().name || "User");
        } else {
          setUsername("User");
        }
      }
    };

    fetchUsername();
  }, []);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        boxShadow: "none",
        padding: 0,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: "48px" }}>
        {/* Title with custom font */}
        <Typography
          variant="h4"
          sx={{
            color: "#CC0033",
            fontWeight: "bold",
            fontFamily: "'IM Fell French Canon SC', serif",
          }}
        >
          {title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Friend Requests Notification */}
          <FriendRequests />

          {/* Profile Button */}
          <Button
            onClick={handleProfileClick}
            sx={{ color: "#CC0033", textTransform: "none" }}
          >
            Hi! {username}
          </Button>

          {/* Logout Button */}
          <Button onClick={handleLogout} sx={{ color: "#CC0033" }}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
