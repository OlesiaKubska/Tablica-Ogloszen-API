# 🚀 Tablica Ogłoszeń API

Tablica Ogłoszeń to aplikacja do zarządzania ogłoszeniami online. Aplikacja umożliwia tworzenie, aktualizowanie, usuwanie oraz przeglądanie ogłoszeń. Aplikacja wspiera dodawanie obrazków do ogłoszeń oraz posiada dokumentację API za pomocą Swaggera.

##  📄 Spis treści

- 🚀 [Tablica Ogłoszeń API] 🚀 (#tablica-ogłoszeń-api)
  - 📄 [Spis treści] 📄 (#spis-treści)
  - 📝 [Wymagania] 📝 (#wymagania)
  - 💾 [Instalacja] 💾 (#instalacja)
  - ▶️ [Uruchomienie] ▶️ (#uruchomienie)
  - 🌐 [Endpointy API] 🌐 (#endpointy-api)
    - 🗒️ [Announcements] 🗒️ (#announcements)
    - ❤️ [Heartbeat] ❤️ (#heartbeat)
  - 📚 [Dokumentacja Swagger] 📚 (#dokumentacja-swagger)
  - ✍️ [Autor] ✍️ (#autor)

## 📝 Wymagania

- Node.js v12 lub nowszy
- MongoDB

## 💾 Instalacja

1. Sklonuj repozytorium:
    ```bash
    git clone https://github.com/TwojeUzytkownik/Tablica-Ogloszen.git
    cd Tablica-Ogloszen
    ```

2. Zainstaluj zależności:
    ```bash
    npm install
    ```

3. Utwórz plik `.env` na podstawie przykładu `.env.example` i wypełnij odpowiednimi wartościami:
    ```plaintext
    PORT=4700
    CONNECTION_STRING="mongodb+srv://username:password@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority"
    DATABASE="mydatabase"
    USER1_USERNAME=user1
    USER1_PASSWORD=password1
    USER2_USERNAME=user2
    USER2_PASSWORD=password2
    USER3_USERNAME=user3
    USER3_PASSWORD=password3
    ```

## ▶️ Uruchomienie

1. Upewnij się, że MongoDB jest uruchomiony.
2. Uruchom serwer:
    ```bash
    node server.js
    ```

## 🌐 Endpointy API

### 🗒️ Announcements

- **GET /api/announcements**: Pobierz wszystkie ogłoszenia
- **POST /api/announcements**: Utwórz nowe ogłoszenie
  - Headers:
    - `username`: Nazwa użytkownika
    - `password`: Hasło użytkownika
  - Body (form-data):
    - `title`: Tytuł ogłoszenia
    - `description`: Opis ogłoszenia
    - `category`: Kategoria ogłoszenia
    - `tags`: Tagi ogłoszenia
    - `price`: Cena ogłoszenia
    - `images`: Obrazki ogłoszenia

- **GET /api/announcements/:id**: Pobierz ogłoszenie po ID
- **PUT /api/announcements/:id**: Zaktualizuj ogłoszenie po ID
  - Headers:
    - `username`: Nazwa użytkownika
    - `password`: Hasło użytkownika
  - Body (form-data):
    - `title`: Tytuł ogłoszenia
    - `description`: Opis ogłoszenia
    - `category`: Kategoria ogłoszenia
    - `tags`: Tagi ogłoszenia
    - `price`: Cena ogłoszenia
    - `images`: Obrazki ogłoszenia

- **DELETE /api/announcements/:id**: Usuń ogłoszenie po ID
  - Headers:
    - `username`: Nazwa użytkownika
    - `password`: Hasło użytkownika

### ❤️ Heartbeat

- **GET /heartbeat**: Zwraca aktualny czas serwera

## 📚 Dokumentacja Swagger

Dokumentacja API jest dostępna pod adresem:
[http://localhost:4700/api-docs](http://localhost:4700/api-docs)

## ✍️ Autor

Olesia Kubska
