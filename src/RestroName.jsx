import { useState } from "react";
import getRestroData from "./functions/getRestroData";
import "./css/RestroName.css";
import EmptyState from "./NotSerached";
import Shimmer from "./Shimmer";
import { useCallback } from "react";
import cities from "./Data/CityData";
import { useLocation } from "react-router-dom";
import NotAvailableState from "./NoCitySearched";
import HeadingWithCards from "./HeadingWithCards";

export default function RestroName() {
  const location = useLocation();
  const routeCity = location.state?.cityName;
  let [city, setCity] = useState(routeCity || "Sikar");
  let [restaurants, setRestaurants] = useState([]);
  let [serached, setSerached] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSerached(true);
      setLoading(true);
      setSuggestions([]);
      const data = await getRestroData(city);
      if (!data || data.length === 0) {
        setRestaurants([]);
      } else {
        setRestaurants(data);
      }
      setLoading(false);
    },
    [city],
  );

  function onChangehandler(e) {
    const value = e.target.value.trim();
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
      {/* <Link to="/" className="ncb">
        <h2>Restaurants Near Me</h2>
      </Link> */}
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

        {serached && !loading && (
          <HeadingWithCards restaurants={restaurants} city={city} />
        )}
      </div>
    </div>
  );
}
