import getCordinates from "./GetCordinates";
export default async function getRestroData(city) {
  try {
    let { latitude, longitude } = await getCordinates(city);
    let data = await fetch(
      "https://backend-restro-data.vercel.app/api/restro?lat=" +
        latitude +
        "&lng=" +
        longitude,
    );
    let jsonData = await data.json();
    const cards = jsonData.data.cards;

    const restaurantCard = cards.find(
      (item) => item.card?.card?.gridElements?.infoWithStyle?.restaurants,
    );
    const restaurants =
      restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    let ans = restaurants.map((el) => {
      return el.info;
    });
    return ans;
  } catch {
    console.log("either wrong city name or empty box");
  }
}
