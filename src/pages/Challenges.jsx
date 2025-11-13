import React from 'react';
import AllChallenges from '../componenets/allChallengs/AllChallenges';
const allChallengesPromise=fetch('http://localhost:3000/challenges')
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