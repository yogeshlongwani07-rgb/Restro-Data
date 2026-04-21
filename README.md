````
# Restro Data

Restro Data is a React + Vite food discovery web application that helps users search restaurants by city, explore nearby options using location access, view restaurant details, manage cart items, and navigate through authentication and order-related pages.

## Features

- Search restaurants by city name
- Show city suggestions while typing
- Detect user location and fetch nearby restaurants
- Display restaurant cards and restaurant detail views
- Cart, orders, profile, and delivery flow pages
- Responsive navigation bar and footer
- Loading, empty-state, and not-found screens
- Client-side routing with React Router
- Bootstrap styling combined with custom CSS

## Tech Stack

- **Frontend:** React 18
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **Styling:** Bootstrap 5 + custom CSS
- **HTTP Client:** Axios
- **Icons:** Font Awesome

## Project Structure

```bash
src/
├── App.jsx
├── Layout.jsx
├── main.jsx
├── Cities.jsx
├── CitySearchInput.jsx
├── HeadingWithCards.jsx
├── cart.jsx
├── footer.jsx
├── onTheWay.jsx
├── orders.jsx
├── profile.jsx
├── terms.jsx
├── Nav/
├── Restro/
├── Dialog/
├── Pages/
├── Data/
├── functions/
└── css/
````

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
git clone <repository-url>
cd Restro-Data-master
npm install
```

### Run the Project

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Notes

- The app uses a backend API for restaurant and session data.
- Make sure the backend URL is configured correctly in the project files before running the app.
- Some pages rely on browser location access for nearby restaurant search.

## Available Pages

- Home page with city search
- Restaurant menu page
- Cities page
- Cart page
- On-the-way page
- Profile page
- Orders page
- Terms and conditions page
- 404 / not found page

## UI Highlights

- Clean food-delivery themed design
- Fixed navbar with a modern floating style
- Responsive cards and grids
- Professional empty states and loading skeletons
