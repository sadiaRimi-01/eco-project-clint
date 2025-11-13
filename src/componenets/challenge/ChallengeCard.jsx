import React, { useContext } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const ChallengeCard = ({ challenge }) => {
  const { title, category, impactMetric, imageUrl, _id } = challenge;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleJoinChallenge = () => {
    if (user) {
      navigate(`/challenges/join/${_id}`);
    } else {
      navigate("/auth/login", { state: { from: `/challenges/join/${_id}` } });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 border border-emerald-200">
      <figure className="h-52 overflow-hidden rounded-t-2xl">
        <img
          className="w-full h-full object-cover hover:scale-110 transition duration-500"
          src={imageUrl}
          alt={title}
        />
      </figure>

      <div className="p-5">
        <h2 className="text-xl font-bold text-emerald-700 mb-2">{title}</h2>
        <p className="text-gray-700 mb-1">
          <strong>Impact:</strong> {impactMetric}
        </p>
        <p className="text-gray-700 mb-2 md:mb-4">
          <strong>Category:</strong>{" "}
          <span className="text-emerald-600">{category}</span>
        </p>

       
        <div className="flex flex-col gap-2">
          <Link
            to={`/challenges/${_id}`}
            className="btn w-full bg-emerald-500 hover:bg-emerald-600 border-none text-white transition"
          >
            View Details
          </Link>

          <button
            onClick={handleJoinChallenge}
            className="btn w-full bg-green-600 hover:bg-green-700 border-none text-white transition"
          >
            Join Challenge
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
