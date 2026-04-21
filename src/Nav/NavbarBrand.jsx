export default function NavbarBrand({ hiUser }) {
  return (
    <a className="navbar-brand fw-bold fs-4 text-success" href="/">
      Hi {hiUser.length > 0 ? hiUser : "User"},
    </a>
  );
}
