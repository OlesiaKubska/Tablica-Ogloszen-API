import React, { useState, useEffect } from "react";
import api from "../../api";

interface Announcement {
 _id: string;
 title: string;
 description: string;
 category: string;
 price: number;
}

const AnnouncementsList: React.FC = () => {
 const [announcements, setAnnouncements] = useState<Announcement[]>([]);

 useEffect(() => {
  const fetchAnnouncements = async () => {
   try {
    const response = await api.get("/announcements");
    setAnnouncements(response.data);
   } catch (error) {
    console.error("There was an error fetching the announcements!", error);
   }
  };

  fetchAnnouncements();
 }, []);

 return (
  <div>
   <h1>Ogłoszenia</h1>
   <ul>
    {announcements.map((announcement) => (
     <li key={announcement._id}>
      <h2>{announcement.title}</h2>
      <p>{announcement.description}</p>
      <p>Kategoria: {announcement.category}</p>
      <p>Cena: {announcement.price}</p>
     </li>
    ))}
   </ul>
  </div>
 );
};

export default AnnouncementsList;
