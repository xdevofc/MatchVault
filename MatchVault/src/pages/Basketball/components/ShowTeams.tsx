import handleScore from "../handlers/handleScore";


interface ShowTeamsProps {
  score: { teamA: number; teamB: number };
  isFinished: boolean;
  setScore: React.Dispatch<React.SetStateAction<{ teamA: number; teamB: number }>>;
}


const ShowTeams = ({
    score, isFinished, setScore 
}: showTeamsProps) =>{
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
        {["teamA", "teamB"].map((team) => (
          <div
            key={team}
            className="bg-neutral-800 rounded-2xl shadow-md p-6"
          >
            <h2 className="text-xl font-semibold mb-4 uppercase">
              {team === "teamA" ? "Team A" : "Team B"}
            </h2>
            <p className="text-5xl font-bold text-slate-100 mb-4">
              {score[team as "teamA" | "teamB"]}
            </p>
            <div className="flex justify-center flex-wrap gap-2 mb-2">
              {[1, 2, 3].map((val) => (
                <button
                  key={val}
                  onClick={() => {
                    handleScore({
    team: team as "teamA" | "teamB",
    points: val,
    prev: score[team as "teamA" | "teamB"],
    isFinished,
    setScore
  });
                  }}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded"
                >
                  +{val}
                </button>
              ))}
            </div>
            <div className="flex justify-center flex-wrap gap-2">
              {[1, 2, 3].map((val) => (
                <button
                  key={val}
                  onClick={() => {
  handleScore({
    team: team as "teamA" | "teamB",
    points: -val,
    prev: score[team as "teamA" | "teamB"],
    isFinished,
    setScore
  });
}}
                  className="px-3 py-1 text-sm bg-transparent border border-gray-600 text-white rounded hover:text-red-400"
                >
                  -{val}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
}

export default ShowTeams;