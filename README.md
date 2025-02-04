# GymTribe Web Application

GymTribe is a fitness social networking web application that helps users connect with like-minded gym enthusiasts. The app allows users to register, edit their profile, send friend requests, chat with friends, and receive real-time notifications.

---

## **Features**

### **1. User Registration and Authentication**

- Create an account with name, age, email, and password.
- Email is validated in real-time during registration.
- Firebase Authentication is used to handle user login and signup.

### **2. User Profile Management**

- Edit and update profile information.
- Select preferences such as favorite workouts and preferred gym.
- Choose the year in college (e.g., Freshman, Sophomore).

### **3. Friend System**

- View friend suggestions based on matching workout preferences.
- Send friend requests and receive notifications.
- Accept or decline friend requests.
- Pending requests are marked in the suggestions list.

### **4. Real-time Chat**

- Start conversations with friends.
- View and send messages in real-time.
- Notifications appear when new messages arrive.

### **5. Notifications**

- Real-time alerts for new friend requests and incoming messages.
- Notification badge displayed on the navbar.

---

## **Technologies Used**

### **Frontend**

- React (with TypeScript)
- React Router for navigation
- Material UI for components and styling
- Firebase Authentication and Firestore

### **Backend**

- Firebase Firestore as a real-time database
- Firebase Authentication for user management

---

## **Project Structure**

```
GymTribe/
|-- src/
    |-- components/
        |-- Navbar.tsx
        |-- Register.tsx
        |-- Profile.tsx
        |-- FriendSuggestions.tsx
        |-- FriendRequests.tsx
        |-- YourFriends.tsx
        |-- Chat.tsx
    |-- services/
        |-- firebase.ts
    |-- App.tsx
    |-- index.tsx
|-- public/
|-- package.json
|-- README.md
```

---

## **Setup Instructions**

### **1. Prerequisites**

Make sure you have the following installed:

- Node.js
- npm or yarn

### **2. Clone the Repository**

```sh
$ git clone https://github.com/yourusername/gymtribe.git
$ cd gymtribe
```

### **3. Install Dependencies**

```sh
$ npm install
```

or

```sh
$ yarn install
```

### **4. Configure Firebase**

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Set up Authentication and Firestore.
3. Copy your Firebase configuration and paste it in `src/services/firebase.ts`.

Example `firebase.ts`:

```ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### **5. Run the Application**

```sh
$ npm start
```

or

```sh
$ yarn start
```

### **6. Access the Application**

Open your browser and navigate to: [http://localhost:3000](http://localhost:3000)

---

## **Available Scripts**

### **`npm start`**

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### **`npm build`**

Builds the app for production to the `build` folder.

### **`npm test`**

Launches the test runner in the interactive watch mode.

---

## **Future Enhancements**

- Implement a search feature for gyms and friends.
- Add the ability to block or report users.
- Introduce group chats for gym communities.
- Display gym events and workout sessions.

---

## **Contributing**

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## **License**

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## **Contact**

For any inquiries or support, please contact [your email].
