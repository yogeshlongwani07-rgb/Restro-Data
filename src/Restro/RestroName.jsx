import { useEffect, useState, useRef } from "react";
import getRestroData from "../functions/getRestroData.js";
import "../css/RestroName.css";
import EmptyState from "../Pages/NotSerached.jsx";
import Shimmer from "../Pages/Shimmer.jsx";
import { useCallback } from "react";
import cities from "../Data/CityData.js";
import { useLocation } from "react-router-dom";
import NotAvailableState from "../Pages/NoCitySearched.jsx";
import HeadingWithCards from "../HeadingWithCards.jsx";
import "../functions/FirstCapital.js";
import { useContext } from "react";
import { locationContext } from "../functions/Context.jsx";
import randomHeadline from "../Data/Heading.js";
import CitySearchInput from "../CitySearchInput.jsx";
// import { staticResult } from "../Data/Backup.js";

export default function RestroName() {
  const location = useLocation();
  const routeCity = location.state?.cityName;
  let [city, setCity] = useState(routeCity || "");
  let [restaurants, setRestaurants] = useState([]);
  let [serached, setSerached] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  let { islocation, setIslocation } = useContext(locationContext);
  const [searchedCity, setSearchedCity] = useState(routeCity || "");
  const [headline, setHeadline] = useState("");
  let inputRef = useRef(null);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIslocation(() => false);
      setSerached(true);
      setLoading(true);
      setSuggestions([]);

      try {
        const result = await getRestroData(city, islocation);
        // const result = staticResult;
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
    [city, islocation],
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!islocation) return;

    async function fetchLocationData() {
      setSerached(true);
      setLoading(true);
      // const result = staticResult;
      const result = await getRestroData(city, islocation);
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

  useEffect(() => {
    if (!routeCity) return;

    const fetchData = async () => {
      setSerached(true);
      setLoading(true);
      setSuggestions([]);
      setIslocation(false);

      try {
        const result = await getRestroData(routeCity, false);
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [routeCity]);
  return (
    <div className="xyz">
      <CitySearchInput
        onSubmit={onSubmit}
        city={city}
        onChangehandler={onChangehandler}
        inputRef={inputRef}
        suggestions={suggestions}
        suggClickHandler={suggClickHandler}
      />
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
