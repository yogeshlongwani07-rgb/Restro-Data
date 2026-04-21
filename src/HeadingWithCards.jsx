import RestroCards from "./Restro/RestroCards";
function HeadingWithCards({ restaurants, city, headline }) {
  return (
    <div>
      {restaurants.length === 0 ? null : (
        <h2 className="headingWithCards text-center fw-normal text-muted fst-italic mt-5">
          {headline} <strong>{city}</strong>
        </h2>
      )}
      <div
        style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {restaurants.map((el) => (
          <RestroCards key={el.id} restro={el} />
        ))}
      </div>
    </div>
  );
}

export default HeadingWithCards;
