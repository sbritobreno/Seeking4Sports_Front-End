import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

/* components */
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'

/* pages */
import Home from './components/pages/Home'

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
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
