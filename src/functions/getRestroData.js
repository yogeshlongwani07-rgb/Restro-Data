import getCordinates from "./GetCordinates";
import { RestroDataAPIUrl, GetCityName } from "../Data/URL";
export default async function getRestroData(city, islocation) {
  try {
    let { latitude, longitude } = await getCordinates(city, islocation);
    let data = await fetch(RestroDataAPIUrl + latitude + "&lng=" + longitude);
    let jsonData = await data.json();
    console.log(jsonData);
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
      GetCityName + `${latitude}&longitude=${longitude}&localityLanguage=en`,
    );

    let jsonCityname = await data2.json();
    let cityname = jsonCityname.city;

    return { ans, cityname };
  } catch (error) {
    console.log(error);
    return { ans: [], cityname: "" };
  }
}
