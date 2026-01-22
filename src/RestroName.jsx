import { useEffect, useState } from "react";
import getRestroData from "./functions/getRestroData";
import RestroCards from "./RestroCards";
import "./css/RestroName.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import EmptyState from "./NotSerached";
import Shimmer from "./Shimmer";
import Button from "./Button";
import Input from "./Input";
import { useRef } from "react";
import { useCallback } from "react";

export default function RestroName() {
  let [city, setCity] = useState("Sikar");
  let [restaurants, setRestaurants] = useState([]);
  let [serached, setSerached] = useState(false);
  const [loading, setLoading] = useState(false);
  // const inputRef = useRef(null);

  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSerached(true);
      setLoading(true);
      const data = await getRestroData(city);
      setRestaurants(data || []);
      setLoading(false);
    },
    [city],
  );

  function filterOut4Plus() {
    let data = restaurants.filter((el) => {
      return el.avgRating > 4;
    });
    setLoading(true);
    setRestaurants(data);
    setLoading(false);
  }

  return (
    <div className="xyz">
      <Link to="/" className="ncb">
        <h2>Restaurants Near Me</h2>
      </Link>
      <form action="#" onSubmit={onSubmit}>
        <div className="input-group mb-3">
          <Input
            // ref={inputRef}
            setCity={setCity}
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            placeholder={"Restaurants"}
          />
          <Button
            className={"btn btn-secondary"}
            type={"submit"}
            id={"button-addon2"}
            value={"Search for Your Place"}
          />
        </div>
      </form>
      <div
        className="dropdown ms-1"
        style={{ position: "relative", display: "inline-block" }}
      >
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <FontAwesomeIcon icon={faFilter} />
        </button>
        <ul className="dropdown-menu">
          <li>
            <button className="dropdown-item">Pizza</button>
          </li>
          <li>
            <button className="dropdown-item">Burger</button>
          </li>
          <li>
            <button className="dropdown-item">South Indian</button>
          </li>
        </ul>
      </div>
      <Button
        className={"btn btn-outline-success ms-1"}
        id={"button-addon3"}
        onClick={filterOut4Plus}
        value={"Filter 4+"}
      />
      <Button
        className={"btn btn-outline-success ms-2"}
        id={"button-addon3"}
        onClick={onSubmit}
        value={"Reset"}
      />
      <div className="card-container">
        {!serached && <EmptyState />}

        {serached && loading && <Shimmer />}

        {serached && !loading && restaurants.length === 0 && <EmptyState />}

        {serached &&
          !loading &&
          restaurants.map((el) => <RestroCards key={el.id} restro={el} />)}
      </div>
    </div>
  );
}
