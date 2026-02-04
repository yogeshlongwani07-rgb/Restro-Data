const headlines = [
  "Top Rated Restaurants in ",
  "Best Food Places in ",
  "Popular Restaurants Near You in ",
  "Most Loved Restaurants in ",
  "Highly Rated Food Spots in ",

  "Your Next Favorite Meal in ",
  "Cravings Start Here in ",
  "Food Worth Ordering in ",
  "Taste Something Amazing in ",
  "Good Food Starts Here in ",

  "Where Hunger Meets Happiness in ",
  "Made For Your Taste Buds in ",
  "Because You Deserve Better Food in ",
  "Serving Happiness Daily in ",
  "Eat Better, Feel Better in ",

  "Discover Great Food in ",
  "Explore Local Favorites in ",
  "Handpicked Restaurants in ",
  "Curated Food Picks in ",
  "Trending Food Spots in ",

  "Order From The Best in ",
  "Find Your Perfect Meal in ",
  "Hot Picks Right Now in ",
  "Don’t Miss These Eats in ",
  "Must Try Restaurants in ",
];

function randomHeadline() {
  let random = Math.floor(Math.random() * headlines.length);
  return headlines[random];
}

export default randomHeadline;
