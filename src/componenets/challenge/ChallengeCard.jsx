import React from 'react';
import { Link } from 'react-router';

const ChallengeCard = ({challenge}) => {
    const {title,category,impactMetric}=challenge;
    return (
        <div className="card bg-base-100  shadow-sm">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <p>{impactMetric}</p>
    <p>Category: {category}</p>
    <div className="card-actions justify-end">
      <Link to={'/details'} className="btn btn-primary w-full">View Details</Link>
    </div>
  </div>
</div>
    );
};

export default ChallengeCard;