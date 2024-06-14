import React, { useState, ChangeEvent, FormEvent } from "react";
import api from "../../api";

const CreateAnnouncement: React.FC = () => {
 const [title, setTitle] = useState("");
 const [description, setDescription] = useState("");
 const [category, setCategory] = useState("");
 const [price, setPrice] = useState("");
 const [images, setImages] = useState<FileList | null>(null);

 const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("price", price);
  if (images) {
   for (let i = 0; i < images.length; i++) {
    formData.append("images", images[i]);
   }
  }

  await api.post("/announcements", formData, {
   headers: {
    "Content-Type": "multipart/form-data",
    username: "user1",
    password: "password1",
   },
  });

  setTitle("");
  setDescription("");
  setCategory("");
  setPrice("");
  setImages(null);
 };

 const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
   setImages(e.target.files);
  }
 };

 return (
  <div>
   <h1>Dodaj ogłoszenie</h1>
   <form onSubmit={handleSubmit}>
    <div>
     <label>Tytuł</label>
     <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
     />
    </div>
    <div>
     <label>Opis</label>
     <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      required
     ></textarea>
    </div>
    <div>
     <label>Kategoria</label>
     <input
      type="text"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      required
     />
    </div>
    <div>
     <label>Cena</label>
     <input
      type="number"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      required
     />
    </div>
    <div>
     <label>Obrazki</label>
     <input type="file" multiple onChange={handleImageChange} />
    </div>
    <button type="submit">Dodaj</button>
   </form>
  </div>
 );
};

export default CreateAnnouncement;
