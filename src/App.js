import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

/* components */
import Navbar from "./components/layout/Navbar";
import MobileNavbar from "./components/layout/MobileNavbar";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import Message from "./components/layout/Message";

/* pages */
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import VerifyEmail from "./components/pages/Auth/VerifyEmail";
import NewActivity from "./components/pages/Sport/NewActivity";
import MyActivities from "./components/pages/Sport/MyActivities";
import ActivityDetails from "./components/pages/Sport/ActivityDetails";
import Profile from "./components/pages/User/Profile";
import EditActivity from "./components/pages/Sport/EditActivity";

/* context */
import { UserProvider } from "./context/UserContext";

function App() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <Router forceRefresh={true}>
      <UserProvider>
        {isMobile ? <MobileNavbar/> : <Navbar/>}
        <Message />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/confirming_email/:email/:username" element={<VerifyEmail />} />
            <Route path="/sport/newactivity" element={<NewActivity />} />
            <Route path="/sport/myactivities" element={<MyActivities />} />
            <Route path="/sport/editactivity/:id" element={<EditActivity />} />
            <Route path="/sport/:id" element={<ActivityDetails />} />
            <Route path="/user/profile" element={<Profile />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
