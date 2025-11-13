import React from 'react';
import AllChallenges from '../componenets/allChallengs/AllChallenges';
const allChallengesPromise=fetch('https://ecotrack-virid.vercel.app/challenges')
.then(res=> res.json());


const Challanges = () => {
    return (
       <div className="">
           
            <div className='max-w-full mx-auto'> 
          
           <AllChallenges  allChallengesPromise={allChallengesPromise}></AllChallenges>
        </div>
        </div>
    );
};

export default Challanges;