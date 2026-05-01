import "../css/shimmer.css";

export default function Shimmer() {
  return (
    <div className="shimmer-container">
      {Array.from({ length: 16 }).map((_, index) => (
        <div key={index} className="shimmer-card">
          <div className="shimmer-header" />
          <div className="shimmer-row" />
          <div className="shimmer-row" />
          <div className="shimmer-row small" />
        </div>
      ))}
    </div>
  );
}

//function done
