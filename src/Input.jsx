export default function Input({
  value,
  onChange,
  placeholder,
  setcity,
  ref = null,
}) {
  return (
    <input
      type="text"
      setcity={setcity}
      value={value}
      onChange={onChange}
      className="form-control"
      placeholder={placeholder}
      ref={ref}
    />
  );
}
