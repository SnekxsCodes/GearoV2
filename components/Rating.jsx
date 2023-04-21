import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Rating({ value }) {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(Math.round(value * 5));
  }, [value]);

  console.log("rating:", rating); // add console log statement to show rating value

  return (
    <div className="rating">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? "star filled" : "star empty"}>
          <FontAwesomeIcon icon={faStar} />
        </span>
      ))}
    </div>
  );
}
