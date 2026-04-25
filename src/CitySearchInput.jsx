export default function CitySearchInput({
  onSubmit,
  city,
  onChangehandler,
  inputRef,
  suggestions,
  suggClickHandler,
}) {
  return (
    <form
      action="#"
      onSubmit={onSubmit}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div className="search-bar-outer">
        <span className="search-bar-icon">
          <i className="fa-solid fa-location-dot"></i>
        </span>
        <input
          type="text"
          value={city}
          onChange={onChangehandler}
          className="search-bar-input"
          placeholder="Search a city…"
          ref={inputRef}
          autoComplete="off"
        />
        <button className="search-bar-btn" type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
          <span>Search</span>
        </button>

        {suggestions.length > 0 && (
          <ul className="suggestions-box">
            {suggestions.map((item, index) => (
              <li key={index} onClick={() => suggClickHandler(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}
