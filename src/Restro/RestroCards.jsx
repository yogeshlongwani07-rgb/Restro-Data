import "../css/RestroCards.css";
import { Link } from "react-router-dom";
export default function RestroCards({ restro }) {
  return (
    <Link
      to={`/Restro/${restro.id}/${restro.name}`}
      state={{ restro }}
      className="restro-card-link"
    >
      <div className="restro-card">
        <div className="restro-card-body">
          <h3 className="restro-card-name">{restro.name}</h3>
          <div className="restro-card-meta">
            <span className="restro-card-rating">⭐ {restro.avgRating}</span>
            <span className="restro-card-dot">·</span>
            <span className="restro-card-time">{restro.sla.slaString}</span>
          </div>
          <p className="restro-card-locality">📍 {restro.locality}</p>
        </div>
        <span className="restro-card-arrow">›</span>
      </div>
    </Link>
  );
}

// import "../css/RestroCards.css";
// import { Link } from "react-router-dom";

// export default function RestroCards({ restro }) {
//   const info = restro?.info;

//   return (
//     <div>
//       <Link
//         to={`/restro/${info?.id}/${info?.name}`}
//         state={{ restro }}
//         style={{ textDecoration: "none" }}
//       >
//         <div className="card yyz" style={{ width: "18rem" }}>
//           <div className="card-header">{info?.name}</div>

//           <ul className="list-group list-group-flush">
//             <li className="list-group-item">
//               ⭐ {info?.avgRating || "N/A"}
//             </li>

//             <li className="list-group-item">
//               Locality: {info?.locality}
//             </li>

//             <li className="list-group-item">
//               Delivery Time: {info?.sla?.slaString || "N/A"}
//             </li>
//           </ul>
//         </div>
//       </Link>
//     </div>
//   );
// }
