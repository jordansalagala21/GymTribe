import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { auth, db } from "../services/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  getDoc,
} from "firebase/firestore";

interface FriendRequest {
  id: string;
  senderId: string;
  senderName: string;
}

const FriendRequests: React.FC = () => {
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const requestQuery = query(
        collection(db, "friendRequests"),
        where("receiverId", "==", user.uid),
        where("status", "==", "pending")
      );
      const requestSnapshot = await getDocs(requestQuery);

      const requestsData = await Promise.all(
        requestSnapshot.docs.map(async (docSnap) => {
          const senderDoc = await getDoc(
            doc(db, "profiles", docSnap.data().senderId)
          );
          const senderName = senderDoc.exists()
            ? senderDoc.data().name
            : "Unknown";
          return {
            id: docSnap.id,
            senderId: docSnap.data().senderId,
            senderName,
          };
        })
      );

      setRequests(requestsData);
    };

    fetchRequests();
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAcceptRequest = async (requestId: string, senderId: string) => {
    const user = auth.currentUser;
    if (!user) return;

    // Update the request status to accepted
    await updateDoc(doc(db, "friendRequests", requestId), {
      status: "accepted",
    });

    // Add mutual friendship in both directions
    const friendsCollection = collection(db, "friends");
    await Promise.all([
      addDoc(friendsCollection, {
        user1Id: user.uid,
        user2Id: senderId,
        createdAt: new Date(),
      }),
      addDoc(friendsCollection, {
        user1Id: senderId,
        user2Id: user.uid,
        createdAt: new Date(),
      }),
    ]);

    // Remove from the request list
    setRequests((prev) => prev.filter((req) => req.id !== requestId));
  };

  const handleDeclineRequest = async (requestId: string) => {
    // Update the request status to declined
    await updateDoc(doc(db, "friendRequests", requestId), {
      status: "declined",
    });

    // Remove from the request list
    setRequests((prev) => prev.filter((req) => req.id !== requestId));
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleMenuOpen}>
        <Badge badgeContent={requests.length} color="error">
          <NotificationsIcon sx={{ color: "#CC0033" }} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {requests.length === 0 ? (
          <MenuItem>No new friend requests</MenuItem>
        ) : (
          requests.map((request) => (
            <MenuItem key={request.id}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography>
                  {request.senderName} sent you a friend request
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() =>
                    handleAcceptRequest(request.id, request.senderId)
                  }
                >
                  Accept
                </Button>
                <Button
                  variant="text"
                  size="small"
                  color="error"
                  onClick={() => handleDeclineRequest(request.id)}
                >
                  Decline
                </Button>
              </Stack>
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default FriendRequests;
