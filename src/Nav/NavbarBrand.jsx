import { Link } from "react-router-dom";

export default function NavbarBrand({ hiUser }) {
  return (
    <Link className="navbar-brand fw-bold fs-4 text-success" to="/">
      Hi {hiUser.length > 0 ? hiUser : "User"},
    </Link>
  );
}
