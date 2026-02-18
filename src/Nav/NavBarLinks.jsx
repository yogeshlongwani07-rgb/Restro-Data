export default function NavBarLinks({ setIslocation, islocation }) {
  return (
    <ul className="navbar-nav ms-4 align-items-center gap-3">
      <li className="nav-item">
        <a className="nav-link fw-semibold text-muted" href="/Restro/cities">
          700+ Cities Covered
        </a>
      </li>

      <li className="nav-item">
        <button
          className={
            islocation
              ? "nav-link fw-semibold text-success"
              : "nav-link fw-semibold text-muted"
          }
          onClick={() => setIslocation(true)}
        >
          <i className="fa-solid fa-location-arrow fa-lg"></i>
          &nbsp; Allow Location
        </button>
      </li>
    </ul>
  );
}
