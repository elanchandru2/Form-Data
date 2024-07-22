import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './AdminPage';
import ContactForm from './Contact_Form';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactForm />} />
        <Route path="/admin" element={<AdminPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
