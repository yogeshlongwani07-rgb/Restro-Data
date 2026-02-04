import RestroCards from "./RestroCards";
function HeadingWithCards({ restaurants, city }) {
  return (
    <div>
      <h2 className="abc text-center fw-normal text-muted fst-italic mt-5">{`Eat What ${city} Loves`}</h2>
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
