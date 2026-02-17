export default function CitySearchInput({
  onSubmit,
  city,
  onChangehandler,
  inputRef,
  suggestions,
  suggClickHandler,
}) {
  return (
    <form action="#" onSubmit={onSubmit}>
      <div className="input-group mb-3">
        <input
          type="text"
          value={city}
          onChange={onChangehandler}
          className="form-control"
          placeholder="City name here"
          ref={inputRef}
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
        <button id="button-addon2" className="btn btn-secondary" type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </form>
  );
}
