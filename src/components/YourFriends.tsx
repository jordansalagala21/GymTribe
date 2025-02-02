import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Avatar,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../services/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

interface Friend {
  id: string;
  name: string;
}

const YourFriends: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const friendsQuery = query(
        collection(db, "friends"),
        where("user1Id", "==", user.uid)
      );
      const friendsSnapshot = await getDocs(friendsQuery);

      const friendsData = await Promise.all(
        friendsSnapshot.docs.map(async (docSnap) => {
          const friendId = docSnap.data().user2Id;
          const friendDoc = await getDocs(collection(db, "profiles"));
          const friendProfile = friendDoc.docs
            .find((doc) => doc.id === friendId)
            ?.data();
          return {
            id: friendId,
            name: friendProfile?.name || "Unknown",
          };
        })
      );

      setFriends(friendsData);
    };

    fetchFriends();
  }, []);

  const handleMessage = (friendId: string, friendName: string) => {
    navigate(`/chat/${friendId}`, { state: { friendName } });
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Your Friends
      </Typography>
      <Grid container spacing={3}>
        {friends.map((friend) => (
          <Grid item xs={12} key={friend.id}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                boxShadow: 2,
                padding: 2,
              }}
            >
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  backgroundColor: "#3f51b5",
                  marginRight: 2,
                }}
              >
                {friend.name.charAt(0).toUpperCase()}
              </Avatar>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {friend.name}
                </Typography>
              </CardContent>
              <Button
                variant="outlined"
                startIcon={<ChatIcon />}
                onClick={() => handleMessage(friend.id, friend.name)}
              >
                Message
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default YourFriends;
