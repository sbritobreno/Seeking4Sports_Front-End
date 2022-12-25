import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

/* components */
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'

/* pages */
import Home from './components/pages/Home'
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import NewActivity from './components/pages/Sport/NewActivity'
import MyActivities from './components/pages/Sport/MyActivities'
import ActivityDetails from './components/pages/Sport/ActivityDetails'
import Profile from './components/pages/User/Profile'

/* context */
import {UserProvider} from './context/UserContext'

function App() {
  return (
    <Router forceRefresh={true}>
      <UserProvider>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/newactivity" element={<NewActivity />} />
            <Route path="/user/myactivities" element={<MyActivities />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/sport/:id" element={<ActivityDetails />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
