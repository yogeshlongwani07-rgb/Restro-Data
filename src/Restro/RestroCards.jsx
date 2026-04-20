import "../css/RestroCards.css";
import { Link } from "react-router-dom";
export default function RestroCards({ restro }) {
  return (
    <div>
      <Link
        to={`/restro/${restro.id}/${restro.name}`}
        state={{ restro }}
        style={{ textDecoration: "none" }}
      >
        <div className="card yyz" style={{ width: "18rem" }}>
          <div className="card-header">{restro.name} </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">⭐ {restro.avgRating}</li>
            <li className="list-group-item">Locality : {restro.locality}</li>
            <li className="list-group-item">
              Delivery Time: {restro.sla.slaString}
            </li>
          </ul>
        </div>
      </Link>
    </div>
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
