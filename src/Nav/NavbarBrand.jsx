import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../main";

export default function NavbarBrand() {
  const { user } = useContext(AuthContext);
  const name = user?.name?.split(" ")[0] || "";
  const hiUser = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  return (
    <Link className="navbar-brand fw-bold fs-4 text-success" to="/">
      Hi {hiUser.length > 0 ? hiUser : "User"},
    </Link>
  );
}
