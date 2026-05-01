function NotAvailableState() {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>🚫 Oops! No Restaurants Found</h1>

      <p style={{ fontSize: "18px", color: "#555" }}>
        We’re not serving in this city yet, or the city name might be incorrect.
      </p>

      <p style={{ marginTop: "10px", color: "#888" }}>
        Try checking the spelling or search for a nearby major city.
      </p>
    </div>
  );
}

export default NotAvailableState;

// function done
