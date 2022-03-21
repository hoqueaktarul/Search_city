import "./styles.css";
import Loading from "./Loading";
import fetchcity from "./cities";
import { useState, useEffect } from "react";
export default function App() {
  const [search, setsearch] = useState(false);
  const [queary, setqueary] = useState();
  const [fetchdata, setfetchdata] = useState([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetchcity(queary).then((res) => {
      setfetchdata(res);
    });
    if (queary === "") {
      setsearch(false);
    }
  }, [queary]);

  return (
    <div className="App">
      <input
        placeholder="Search all indian city"
        value={queary}
        type="text"
        onChange={(e) => {
          setsearch(true);
          setqueary(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setShowResult(true);
          setTimeout(() => {
            setShowResult(false);
          }, 4000);
        }}
      >
        Search
      </button>
      {showResult ? (
        <div className="result">{fetchdata.length} results match.</div>
      ) : null}
      {search
        ? fetchdata.map((jf) => (
            <div>
              <p>
                <span className="okk">city:</span>
                {jf.city}({jf.state})
              </p>
            </div>
          ))
        : null}
      {search ? null : <Loading />}
    </div>
  );
}
