import RestroCards from "./Restro/RestroCards";

function HeadingWithCards({ restaurants, city, headline }) {
  return (
    <div>
      {restaurants.length === 0 ? null : (
        <h2 className="headingWithCards">
          {headline} <strong>{city}</strong>
        </h2>
      )}
      <div className="restro-grid">
        {restaurants.map((el) => (
          <RestroCards key={el.id} restro={el} />
        ))}
      </div>
    </div>
  );
}

export default HeadingWithCards;
