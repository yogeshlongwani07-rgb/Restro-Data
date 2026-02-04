import { useEffect, useState } from "react";
import getRestroData from "./functions/getRestroData";
import "./css/RestroName.css";
import EmptyState from "./NotSerached";
import Shimmer from "./Shimmer";
import { useCallback } from "react";
import cities from "./Data/CityData";
import { useLocation } from "react-router-dom";
import NotAvailableState from "./NoCitySearched";
import HeadingWithCards from "./HeadingWithCards";
import "./functions/FirstCapital.js";
import { useContext } from "react";
import { locationContext } from "./Context.jsx";
import randomHeadline from "./Data/Heading";

export default function RestroName() {
  const location = useLocation();
  const routeCity = location.state?.cityName;
  let [city, setCity] = useState(routeCity || "Sikar");
  let [restaurants, setRestaurants] = useState([]);
  let [serached, setSerached] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  let { islocation, setIslocation } = useContext(locationContext);
  const [searchedCity, setSearchedCity] = useState(routeCity || "Sikar");
  const [headline, setHeadline] = useState("");

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSerached(true);
      setLoading(true);
      setSuggestions([]);
      setIslocation(false);
      try {
        const result = await getRestroData(city, islocation);
        const { ans: data, cityname } = result;

        if (!data || data.length === 0) {
          setRestaurants([]);
        } else {
          setCity(cityname);
          setSearchedCity(cityname);
          setRestaurants(data);
          setHeadline(randomHeadline());
        }
      } catch (error) {
        setRestaurants([]);
      }

      setLoading(false);
    },
    [city],
  );

  useEffect(() => {
    if (!islocation) return;

    async function fetchLocationData() {
      setSerached(true);
      setLoading(true);

      const result = await getRestroData(city, true);
      const { ans: data, cityname } = result;
      setCity(cityname);
      setSearchedCity(cityname);
      setRestaurants(data || []);
      setLoading(false);
    }

    fetchLocationData();
  }, [islocation]);

  function onChangehandler(e) {
    const value = e.target.value.trim().capitalizeFirstLetter();
    setCity(value);

    if (value.length > 0) {
      const sugg = cities.filter((el) => {
        return el.toLowerCase().startsWith(value.toLowerCase());
      });
      setSuggestions(sugg);
    } else {
      setSuggestions([]);
    }
  }

  function suggClickHandler(item) {
    setCity(item);
    setSuggestions([]);
  }

  // navigator.geolocation.getCurrentPosition(
  //   (position) => {
  //     console.log(position.coords.latitude);
  //     console.log(position.coords.longitude);
  //   },
  //   (error) => {
  //     console.log(error.message);
  //   },
  // );

  // function filterOut4Plus() {
  //   let data = restaurants.filter((el) => {
  //     return el.avgRating > 4;
  //   });
  //   setLoading(true);
  //   setRestaurants(data);
  //   setLoading(false);
  // }

  return (
    <div className="xyz">
      <form action="#" onSubmit={onSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            value={city}
            onChange={onChangehandler}
            className="form-control"
            placeholder="Restaurants"
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-box">
              {suggestions.map((item, index) => (
                <li key={index} onClick={() => suggClickHandler(item)}>
                  {item}
                </li>
              ))}
            </ul>
          )}
          <button
            id="button-addon2"
            className="btn btn-secondary"
            type="submit"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </form>
      <div className="card-container">
        {!serached && <EmptyState />}

        {serached && loading && <Shimmer />}

        {serached && !loading && restaurants.length === 0 && (
          <NotAvailableState />
        )}

        {serached && !loading && restaurants.length > 0 && (
          <HeadingWithCards
            restaurants={restaurants}
            city={searchedCity}
            headline={headline}
          />
        )}
      </div>
    </div>
  );
}
