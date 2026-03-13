# Restro Data — React + Vite Food Discovery Application

Restro Data is a React + Vite based food discovery application that allows users to search restaurants by city or by their current location, view restaurant details, and interact with basic authentication flows such as login, signup, and logout.

The project primarily focuses on frontend product behavior and API integration. Restaurant data is retrieved from backend API endpoints configured in the application.

---

## Features

- Search restaurants by city name
- Show city suggestions while typing
- Detect user geolocation and fetch nearby restaurants
- Display restaurant detail pages
- Handle loading states and empty results
- Authentication UI flows for signup, login, and logout
- Client-side routing with React Router

---

## Tech Stack

| Category    | Technology             |
| ----------- | ---------------------- |
| Frontend    | React 18               |
| Build Tool  | Vite                   |
| Routing     | React Router           |
| UI          | Bootstrap + Custom CSS |
| HTTP Client | Fetch + Axios          |
| Icons       | Font Awesome           |

---

## Project Structure

```
src/
├── App.jsx            # Root layout with context provider
├── main.jsx           # App bootstrap and router setup
│
├── Nav/               # Navbar and authentication trigger UI
├── Restro/            # Restaurant list, cards, and detail pages
├── Auth/              # Authentication utilities
├── Dialog/            # Login and signup modal dialogs
├── functions/         # API helpers (geolocation and restaurant fetch)
├── Data/              # Static data and API base URLs
└── css/               # Component and page styles
```
