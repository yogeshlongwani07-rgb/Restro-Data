async function getCordinates(city) {
    let data = await fetch(
      "https://geocoding-api.open-meteo.com/v1/search?name=" + city
    );
    let jsonData = await data.json();
    if (jsonData.results && jsonData.results.length > 0) {
      return jsonData.results[0];
    }
    return {
      latitude: 0,
      longitude: 0,
    };
  }

  export default getCordinates;