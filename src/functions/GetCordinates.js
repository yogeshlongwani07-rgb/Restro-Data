import { geocodingUrl } from "../Data/URL";

export default async function getCordinates(city, islocation) {
  if (islocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => reject(error),
      );
    });
  } else {
    let data = await fetch(geocodingUrl + city);

    let jsonData = await data.json();

    if (jsonData.results?.length) {
      return {
        latitude: jsonData.results[0].latitude,
        longitude: jsonData.results[0].longitude,
      };
    }

    return { latitude: 0, longitude: 0 };
  }
}
