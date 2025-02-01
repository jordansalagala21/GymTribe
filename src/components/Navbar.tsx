import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

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
        <Typography variant="h4" sx={{ color: "#CC0033", fontWeight: "bold" }}>
          {title}
        </Typography>
        <div>
          <Button
            onClick={handleProfileClick}
            sx={{ color: "#CC0033", textTransform: "none" }}
          >
            Hi!{username}
          </Button>
          <Button onClick={handleLogout} sx={{ color: "#CC0033" }}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
