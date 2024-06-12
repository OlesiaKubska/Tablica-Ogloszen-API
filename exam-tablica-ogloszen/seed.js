const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Announcement = require("./models/Announcement");

// Załaduj zmienne środowiskowe z pliku .env
dotenv.config();

// Połącz z bazą danych
mongoose
 .connect(process.env.CONNECTION_STRING, {
  dbName: process.env.DATABASE,
 })
 .then(() => console.log("MongoDB connected"))
 .catch((err) => {
  console.error(err.message);
  process.exit(1);
 });

const announcements = [
 {
  title: "Sprzedam rower",
  description: "Rower w dobrym stanie, używany przez 2 lata.",
  author: "Jan Kowalski",
  category: "Sport",
  tags: ["rower", "sport"],
  price: 500,
 },
 {
  title: "Wynajmę mieszkanie",
  description: "Mieszkanie w centrum miasta, 3 pokoje.",
  author: "Anna Nowak",
  category: "Nieruchomości",
  tags: ["mieszkanie", "wynajem"],
  price: 2000,
 },
 {
  title: "Korepetycje z matematyki",
  description: "Udzielę korepetycji z matematyki dla uczniów liceum.",
  author: "Piotr Zieliński",
  category: "Edukacja",
  tags: ["korepetycje", "matematyka"],
  price: 50,
 },
 {
  title: "Sprzedam samochód",
  description: "Samochód osobowy, rocznik 2015, niski przebieg.",
  author: "Karol Wiśniewski",
  category: "Motoryzacja",
  tags: ["samochód", "sprzedaż"],
  price: 30000,
 },
 {
  title: "Praca - programista",
  description: "Firma poszukuje programisty JavaScript.",
  author: "TechCorp",
  category: "Praca",
  tags: ["praca", "programista"],
  price: 0,
 },
 {
  title: "Sprzedam książki",
  description: "Zbiór książek do nauki programowania.",
  author: "Zofia Bąk",
  category: "Książki",
  tags: ["książki", "programowanie"],
  price: 200,
 },
 {
  title: "Usługi remontowe",
  description: "Oferuję usługi remontowe, malowanie, tapetowanie.",
  author: "Marek Dąbrowski",
  category: "Usługi",
  tags: ["remont", "usługi"],
  price: 1000,
 },
 {
  title: "Sprzedam meble",
  description: "Komplet mebli do salonu, stan bardzo dobry.",
  author: "Ewa Kowalczyk",
  category: "Meble",
  tags: ["meble", "sprzedaż"],
  price: 1500,
 },
 {
  title: "Zaginął kot",
  description: "Zaginął kot, czarny z białą plamką na brzuchu.",
  author: "Adam Wójcik",
  category: "Zwierzęta",
  tags: ["zaginiony", "kot"],
  price: 0,
 },
 {
  title: "Sprzedam rower - nowa cena",
  description: "Rower w dobrym stanie, używany przez 2 lata. Nowa cena!",
  author: "Jan Kowalski",
  category: "Sport",
  tags: ["rower", "sport"],
  price: 450,
 },
];

const seedDB = async () => {
 await Announcement.deleteMany({});
 await Announcement.insertMany(announcements);
 console.log("Database seeded!");
 mongoose.connection.close();
};

seedDB().catch((err) => {
 console.error(err);
 mongoose.connection.close();
});
