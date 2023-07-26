import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [slopeAngle, setSlopeAngle] = useState(0);

  const updateSlopeAngle = () => {
    const run = window.innerWidth * 0.8;
    const rise = window.innerHeight * 0.8;
    setSlopeAngle((Math.atan(rise / run) * 180) / Math.PI);
  };

  useEffect(() => {
    const run = window.innerWidth * 0.8;
    const rise = window.innerHeight * 0.8;
    setSlopeAngle((Math.atan(rise / run) * 180) / Math.PI);

    addEventListener("resize", updateSlopeAngle);
  }, []);

  return (
    <main>
      <div className="wrap">
        <div id="Foreground">
          <nav
            className="navBar"
            style={{
              transform: `translate(-50%, 50%) rotate(-${slopeAngle}deg)`,
            }}
          >
            <ul>
              <li>About</li>
              <li>Resume</li>
              <li>Projects</li>
              <li>Contact</li>
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}

export default App;
