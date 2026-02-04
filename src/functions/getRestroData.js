import getCordinates from "./GetCordinates";
export default async function getRestroData(city, islocation) {
  try {
    let { latitude, longitude } = await getCordinates(city, islocation);
    let data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=" +
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

    let data2 = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
    );

    let jsonCityname = await data2.json();
    let { city: cityname } = jsonCityname;

    return { ans, cityname };
  } catch {
    console.log("City name is required. Please enter a valid city");
  }
}
