import { Link } from "react-router-dom";
import cities from "./Data/CityData";
import "./css/CityData.css";

function Cities() {
  return (
    <div className="cities-container">
      <Link to={`/`}>
        <button className="rd-back">← Back</button>
      </Link>
      <h1 className="cities-heading">
        Serving & Delivering to 700+ Cities with Fast Delivery
      </h1>

      <div className="cities-grid">
        {cities.map((city, index) => (
          <Link
            className="city-link"
            state={{ cityName: city }}
            to={"/"}
            key={index}
          >
            <div className="city-card">{city}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Cities;
