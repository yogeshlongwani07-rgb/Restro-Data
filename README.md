## 🌟 Overview

**Restro Data** is a full-featured, React-powered food delivery and restaurant discovery web application. Users can search for restaurants by city name or grant location access to auto-detect nearby restaurants. The app provides a seamless end-to-end experience — from browsing menus and adding items to a cart, to tracking an ongoing delivery.

Built with performance in mind using **Vite** as the build tool, and styled with a combination of **Bootstrap 5** and hand-crafted custom CSS for a polished, food-delivery-themed UI.

---

## 🚀 Live Demo

> ⚡ **Deployed on Vercel** — https://restro-data-xkg3.vercel.app/

---

## ✨ Features

| Feature                    | Description                                                                    |
| -------------------------- | ------------------------------------------------------------------------------ |
| 🔍 **City Search**         | Search restaurants by typing any city name with live suggestions               |
| 📍 **Location Detection**  | Auto-fetch nearby restaurants using browser geolocation                        |
| 🏪 **Restaurant Cards**    | Browse rich restaurant listings with ratings, cuisine types, and delivery info |
| 🍜 **Menu View**           | Explore full restaurant menus with categorized item listings                   |
| 🛒 **Cart Management**     | Add, remove, and review items before placing an order                          |
| 👤 **User Authentication** | Sign up, log in, and log out with session persistence                          |
| 📦 **Order History**       | View past orders and their statuses                                            |
| 🚚 **On-The-Way Tracking** | Track your delivery in real-time after order placement                         |
| 🎨 **Theme Toggle**        | Switch between Light, Dark, and System Default themes                          |
| 📱 **Fully Responsive**    | Works seamlessly across all screen sizes                                       |
| ⚡ **Loading Skeletons**   | Shimmer placeholders for a smooth loading experience                           |
| 🔒 **Protected Routes**    | Auth-gated pages for cart, orders, and profile                                 |
| 📄 **Terms & Support**     | Dedicated pages for terms of service and customer support                      |
| 🔁 **Scroll To Top**       | Automatic scroll restoration on route changes                                  |
| 🚫 **404 Handling**        | Custom not-found and no-results pages                                          |

---

## 🛠️ Tech Stack

| Layer                 | Technology                              |
| --------------------- | --------------------------------------- |
| **Framework**         | React 18.2                              |
| **Build Tool**        | Vite 5.4                                |
| **Routing**           | React Router DOM v6                     |
| **Styling**           | Bootstrap 5.3 + Custom CSS              |
| **HTTP Client**       | Axios + Fetch API                       |
| **Icons**             | Font Awesome (Free Solid)               |
| **Auth**              | Session-based auth via backend REST API |
| **Geocoding**         | Open-Meteo Geocoding API                |
| **Reverse Geocoding** | BigDataCloud API                        |
| **Deployment**        | Vercel (with SPA rewrite rules)         |
| **Node Requirement**  | Node.js `24.x`                          |

---

## 📁 Project Structure

```
Restro-Data-master/
├── index.html
├── vite.config.js
├── vercel.json
├── package.json
│
└── src/
    ├── main.jsx              # App entry — routing, AuthProvider, AuthContext
    ├── App.jsx               # Root component
    ├── Layout.jsx            # Persistent layout wrapper (Navbar + Footer)
    ├── ScrollToTop.jsx       # Scroll-to-top on route change
    │
    ├── Cities.jsx            # Cities listing page
    ├── CitySearchInput.jsx   # Autocomplete city search input
    ├── HeadingWithCards.jsx  # Section heading + restaurant card grid
    ├── cart.jsx              # Cart page
    ├── footer.jsx            # Site footer
    ├── onTheWay.jsx          # Delivery tracking page
    ├── orders.jsx            # Order history page
    ├── profile.jsx           # User profile page
    ├── terms.jsx             # Terms & conditions page
    ├── Support.jsx           # Support/contact page
    │
    ├── Nav/
    │   ├── Navbar.jsx        # Full navbar with theme toggle, scroll behavior
    │   ├── NavbarBrand.jsx   # Logo / brand component
    │   ├── NavBarLinks.jsx   # Navigation links
    │   ├── NavUtility.jsx    # Custom hook for nav state
    │   └── ThemeToggle.jsx   # Light / Dark / System theme switcher
    │
    ├── Restro/
    │   ├── RestroName.jsx    # Home page — location + city search logic
    │   ├── RestroCards.jsx   # Individual restaurant card component
    │   └── RestroMenu.jsx    # Full restaurant menu page
    │
    ├── Auth/
    │   ├── AuthButton.jsx          # Login / Logout / Sign Up button UI
    │   └── AuthenticationUtitlity.jsx  # Auth hooks: login, register, logout
    │
    ├── Dialog/
    │   ├── LoginDia.jsx      # Login modal dialog
    │   └── SignUpDia.jsx     # Sign-up modal dialog
    │
    ├── Pages/
    │   ├── NoCitySearched.jsx   # Empty state: no city entered
    │   ├── NoPageFound.jsx      # 404 page
    │   ├── NotSerached.jsx      # Empty state: no search yet
    │   └── Shimmer.jsx          # Loading skeleton component
    │
    ├── Data/
    │   ├── URL.js            # All external API base URLs
    │   ├── CityData.js       # Predefined city list for suggestions
    │   ├── MenuData.js       # Menu structure / category data
    │   ├── Heading.js        # Section heading strings
    │   └── Backup.js         # Fallback / mock data
    │
    ├── functions/
    │   ├── Context.jsx           # locationContext definition
    │   ├── FirstCapital.js       # Utility: capitalize first letter
    │   ├── GetCordinates.js      # Resolve city name → lat/lng coordinates
    │   └── getRestroData.js      # Core data-fetch: lat/lng → restaurant list
    │
    └── css/
        ├── App.css
        ├── Navbar.css
        ├── CityData.css
        ├── RestroCards.css
        ├── RestroName.css
        ├── RestaurantDetail.css
        ├── cart.css
        ├── orders.css
        ├── profile.css
        ├── onTheWay.css
        ├── support.css
        ├── shimmer.css
        ├── footer.css
        ├── terms.css
        └── PageNotFound.css
```

## 🌐 Environment & API Configuration

All external API endpoints are centralized in **`src/Data/URL.js`**:

```js
// Restaurant data (proxied backend)
export const RestroDataAPIUrl = "https://<your-backend>/api/restro?lat=";

// Reverse geocoding (city name from coordinates)
export const GetCityName =
  "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=";

// Forward geocoding (city name → coordinates)
export const geocodingUrl =
  "https://geocoding-api.open-meteo.com/v1/search?name=";

// Backend base URL (auth: login, signup, logout, session)
export const backendUrl = "https://<your-backend>";
```

### Backend Endpoints Expected

| Method | Endpoint                | Description                                      |
| ------ | ----------------------- | ------------------------------------------------ |
| `GET`  | `/session`              | Check if user is logged in                       |
| `POST` | `/login`                | Authenticate user (returns `userId`, `userName`) |
| `POST` | `/signup`               | Register new user                                |
| `POST` | `/logout`               | End session                                      |
| `GET`  | `/api/restro?lat=&lng=` | Fetch restaurant list by coordinates             |

---

## 🗺️ Available Routes

| Route               | Component          | Description                                   |
| ------------------- | ------------------ | --------------------------------------------- |
| `/`                 | `App → RestroName` | Home — city search & location-based discovery |
| `/Restro/:id/:name` | `RestroMenu`       | Full menu for a specific restaurant           |
| `/Restro/cities`    | `Cities`           | Browse all supported cities                   |
| `/cart`             | `Cart`             | Shopping cart                                 |
| `/onTheWay`         | `OnTheWay`         | Live delivery tracking                        |
| `/profile`          | `Profile`          | User profile                                  |
| `/orders`           | `Orders`           | Order history                                 |
| `/terms`            | `Terms`            | Terms & Conditions                            |
| `/support`          | `Support`          | Help & Support                                |
| `/*`                | `NopageFound`      | 404 — Page not found                          |

---

## 🔐 Authentication Flow

Restro Data uses **session-based authentication** managed by the backend:

1. On app load, `AuthProvider` calls `GET /session` to restore the logged-in state.
2. `AuthContext` (exported from `main.jsx`) provides `{ user, setUser, loading }` to the entire component tree.
3. User state is **persisted in `localStorage`** as a cache and synced with server session.
4. Login / Sign Up modals are rendered via `LoginDia` and `SignUpDia` components.
5. On logout, `POST /logout` is called and local state is cleared.
