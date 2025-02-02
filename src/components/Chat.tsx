import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  Avatar,
  Stack,
  Divider,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { auth, db } from "../services/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  addDoc,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: any;
}

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const { friendId } = useParams<{ friendId: string }>();
  const location = useLocation();
  const friendName = location.state?.friendName || "Friend";

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [notification, setNotification] = useState<string | null>(null);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user || !friendId) return;

    const messagesQuery = query(
      collection(db, "messages"),
      where("chatParticipants", "array-contains", user.uid),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];

      // Detect if a new message has arrived and show a notification
      if (newMessages.length > messages.length) {
        const latestMessage = newMessages[newMessages.length - 1];
        if (latestMessage.senderId !== auth.currentUser?.uid) {
          showNotification(`${friendName} sent you a message`);
        }
      }

      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [friendId, messages.length]);

  const handleSendMessage = async () => {
    const user = auth.currentUser;
    if (!user || !newMessage.trim()) return;

    try {
      await addDoc(collection(db, "messages"), {
        senderId: user.uid,
        receiverId: friendId,
        message: newMessage.trim(),
        chatParticipants: [user.uid, friendId],
        timestamp: Timestamp.now(),
      });
      setNewMessage("");
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleExitChat = () => {
    navigate("/dashboard");
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000); // Hide notification after 3 seconds
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Notification Snackbar */}
      <Snackbar
        open={!!notification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="info" sx={{ width: "100%" }}>
          {notification}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          width: "100%",
          maxWidth: 1000,
          padding: 3,
          boxShadow: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          height: "80vh",
        }}
      >
        {/* Header with Exit Chat Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Chat with {friendName}</Typography>
          <IconButton onClick={handleExitChat}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ marginBottom: 2 }} />

        {/* Chat Messages */}
        <List
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            padding: 2,
            backgroundColor: "#f9f9f9",
            borderRadius: 2,
            marginBottom: 2,
          }}
        >
          {messages.map((msg) => {
            const isCurrentUser = msg.senderId === auth.currentUser?.uid;
            return (
              <ListItem
                key={msg.id}
                sx={{
                  display: "flex",
                  justifyContent: isCurrentUser ? "flex-end" : "flex-start",
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ maxWidth: "75%" }}
                >
                  {!isCurrentUser && (
                    <Avatar sx={{ bgcolor: "#757575" }}>
                      {friendName.charAt(0).toUpperCase()}
                    </Avatar>
                  )}
                  <Box
                    sx={{
                      backgroundColor: isCurrentUser ? "#CC0033" : "#e0e0e0",
                      color: isCurrentUser ? "#fff" : "#000",
                      padding: "8px 12px",
                      borderRadius: "20px",
                      fontSize: "0.95rem",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Typography variant="body1">{msg.message}</Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        marginTop: 0.5,
                        textAlign: "right",
                        fontSize: "0.75rem",
                      }}
                    >
                      {new Date(
                        msg.timestamp.seconds * 1000
                      ).toLocaleTimeString()}
                    </Typography>
                  </Box>
                </Stack>
              </ListItem>
            );
          })}
          <div ref={messageEndRef} />
        </List>

        {/* Message Input */}
        <TextField
          fullWidth
          placeholder="Type your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" fullWidth onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
