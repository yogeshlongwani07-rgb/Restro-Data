export default function Button({
  className,
  id,
  onClick = null,
  value = null,
}) {
  return (
    <>
      <button className={className} id={id} onClick={onClick}>
        {value}
      </button>
    </>
  );
}
