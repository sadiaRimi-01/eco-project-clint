import React, { use } from 'react';
import ChallengeCard from '../challenge/ChallengeCard';

const AllChallenges = ({allChallengesPromise}) => {
    
  const allChallenges = use(allChallengesPromise);

    return (
        <div>
            {
                allChallenges.map((allChallenge)=>(
                    <ChallengeCard key={allChallenge._id} challenge={allChallenge} />

                ))
            }
        </div>
    );
};

export default AllChallenges;