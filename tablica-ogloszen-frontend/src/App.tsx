import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AnnouncementsList from "./components/AnnouncementsList/AnnouncementsList";
import CreateAnnouncement from "./components/CreateAnnouncement/CreateAnnouncement";
import "./App.css";

const App: React.FC = () => {
 return (
  <Router>
   <div>
    <nav>
     <ul>
      <li>
       <Link to="/">Ogłoszenia</Link>
      </li>
      <li>
       <Link to="/create">Dodaj ogłoszenie</Link>
      </li>
     </ul>
    </nav>
    <div className="container">
     <Routes>
      <Route path="/" element={<AnnouncementsList />} />
      <Route path="/create" element={<CreateAnnouncement />} />
     </Routes>
    </div>
   </div>
  </Router>
 );
};

export default App;
