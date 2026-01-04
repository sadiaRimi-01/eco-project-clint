
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line,
  PieChart, Pie, Cell
} from "recharts";

const COLORS = ["#22c55e", "#4ade80", "#16a34a", "#86efac"];

const DashboardOverview = () => {
  const { user } = useContext(AuthContext);

  const [stats, setStats] = useState({});
  const [challenges, setChallenges] = useState([]);
  const [userChallenges, setUserChallenges] = useState([]);
  const [events, setEvents] = useState([]);

  /* ---------------- FETCH DATA ---------------- */

  useEffect(() => {
    fetch("http://localhost:3000/stats")
      .then(res => res.json())
      .then(setStats);

    fetch("http://localhost:3000/challenges")
      .then(res => res.json())
      .then(setChallenges);

    fetch(`http://localhost:3000/userChallenges/${user?.uid}`)
      .then(res => res.json())
      .then(setUserChallenges);

    fetch("http://localhost:3000/events")
      .then(res => res.json())
      .then(setEvents);
  }, [user]);

  /* ---------------- PREPARE DATA ---------------- */

  const categoryData = Object.values(
    challenges.reduce((acc, cur) => {
      acc[cur.category] = acc[cur.category]
        ? { ...acc[cur.category], value: acc[cur.category].value + 1 }
        : { name: cur.category, value: 1 };
      return acc;
    }, {})
  );

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-3xl font-bold text-green-600">
          🌍 Dashboard Overview
        </h1>
        <p className="text-base-content mt-1">
          Track your impact, progress & eco journey
        </p>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
       
        <StatCard title="My Challenges" value={userChallenges.length} />
        <StatCard title="Upcoming Events" value={events.length} />
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Bar Chart */}
        <ChartCard title="Participants Per Challenge">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={challenges.slice(0, 6)}>
              <XAxis dataKey="title" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="participants" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Line Chart */}
        <ChartCard title="My Progress">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userChallenges}>
              <XAxis dataKey="challengeId" hide />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="progress"
                stroke="#16a34a"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Pie Chart */}
        <ChartCard title="Challenge Categories">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={90}>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-base-200 rounded-xl shadow p-5">
        <h3 className="text-lg font-semibold mb-3 text-green-600">
          📋 My Joined Challenges
        </h3>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Challenge ID</th>
                <th>Progress</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {userChallenges.map((c, i) => (
                <tr key={c._id}>
                  <td>{i + 1}</td>
                  <td className="truncate max-w-[120px]">{c.challengeId}</td>
                  <td>
                    <progress
                      className="progress progress-success w-32"
                      value={c.progress}
                      max="100"
                    />
                  </td>
                  <td>{new Date(c.lastUpdated).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

/* ---------------- SMALL COMPONENTS ---------------- */

const StatCard = ({ title, value }) => (
  <div className="bg-base-200 p-4 rounded-xl shadow text-center">
    <h4 className="text-sm text-base-content">{title}</h4>
    <p className="text-3xl font-bold text-green-600 mt-1">
      {value ?? 0}
    </p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-base-200 p-5 rounded-xl shadow">
    <h3 className="text-lg font-semibold mb-3 text-green-600">
      {title}
    </h3>
    {children}
  </div>
);

export default DashboardOverview;



















































// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../provider/AuthProvider";
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
//   LineChart, Line,
//   PieChart, Pie, Cell
// } from "recharts";

// const COLORS = ["#22c55e", "#4ade80", "#16a34a", "#86efac"];

// const DashboardOverview = () => {
//   const { user } = useContext(AuthContext);

//   const [stats, setStats] = useState({});
//   const [challenges, setChallenges] = useState([]);
//   const [userChallenges, setUserChallenges] = useState([]);
//   const [events, setEvents] = useState([]);

//   /* ---------------- FETCH DATA ---------------- */

//   useEffect(() => {
//     fetch("http://localhost:3000/stats")
//       .then(res => res.json())
//       .then(setStats);

//     fetch("http://localhost:3000/challenges")
//       .then(res => res.json())
//       .then(setChallenges);

//     fetch(`http://localhost:3000/userChallenges/${user?.uid}`)
//       .then(res => res.json())
//       .then(setUserChallenges);

//     fetch("http://localhost:3000/events")
//       .then(res => res.json())
//       .then(setEvents);
//   }, [user]);

//   /* ---------------- PREPARE DATA ---------------- */

//   const categoryData = Object.values(
//     challenges.reduce((acc, cur) => {
//       acc[cur.category] = acc[cur.category]
//         ? { ...acc[cur.category], value: acc[cur.category].value + 1 }
//         : { name: cur.category, value: 1 };
//       return acc;
//     }, {})
//   );

//   /* ---------------- UI ---------------- */

//   return (
//     <div className="space-y-8 bg-base-100 text-base-content">

//       {/* ================= HEADER ================= */}
//       <div>
//         <h1 className="text-3xl font-bold text-green-600">
//           🌍 Dashboard Overview
//         </h1>
//         <p className="text-base-content mt-1">
//           Track your impact, progress & eco journey
//         </p>
//       </div>

//       {/* ================= STATS CARDS ================= */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
//         <StatCard title="My Challenges" value={userChallenges.length} />
//         <StatCard title="Upcoming Events" value={events.length} />
//       </div>

//       {/* ================= CHARTS ================= */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* Bar Chart */}
//         <ChartCard title="Participants Per Challenge">
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={challenges.slice(0, 6)}>
//               <XAxis dataKey="title" hide />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="participants" fill="#22c55e" />
//             </BarChart>
//           </ResponsiveContainer>
//         </ChartCard>

//         {/* Line Chart */}
//         <ChartCard title="My Progress">
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={userChallenges}>
//               <XAxis dataKey="challengeId" hide />
//               <YAxis />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="progress"
//                 stroke="#16a34a"
//                 strokeWidth={3}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </ChartCard>

//         {/* Pie Chart */}
//         <ChartCard title="Challenge Categories">
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={90}>
//                 {categoryData.map((_, i) => (
//                   <Cell key={i} fill={COLORS[i % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </ChartCard>
//       </div>

//       {/* ================= TABLE ================= */}
//       <div className="bg-base-200 rounded-xl shadow p-5">
//         <h3 className="text-lg font-semibold mb-3 text-green-600">
//           📋 My Joined Challenges
//         </h3>

//         <div className="overflow-x-auto">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Challenge ID</th>
//                 <th>Progress</th>
//                 <th>Last Updated</th>
//               </tr>
//             </thead>
//             <tbody>
//               {userChallenges.map((c, i) => (
//                 <tr key={c._id}>
//                   <td>{i + 1}</td>
//                   <td className="truncate max-w-[120px]">{c.challengeId}</td>
//                   <td>
//                     <progress
//                       className="progress progress-success w-32"
//                       value={c.progress}
//                       max="100"
//                     />
//                   </td>
//                   <td>{new Date(c.lastUpdated).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//     </div>
//   );
// };

// /* ---------------- SMALL COMPONENTS ---------------- */

// const StatCard = ({ title, value }) => (
//   <div className="bg-base-200 p-4 rounded-xl shadow text-center">
//     <h4 className="text-sm text-base-content">{title}</h4>
//     <p className="text-3xl font-bold text-green-600 mt-1">
//       {value ?? 0}
//     </p>
//   </div>
// );

// const ChartCard = ({ title, children }) => (
//   <div className="bg-base-200 p-5 rounded-xl shadow">
//     <h3 className="text-lg font-semibold mb-3 text-green-600">
//       {title}
//     </h3>
//     {children}
//   </div>
// );

// export default DashboardOverview;
