import { useEffect, useRef, useState } from "react";
import "../lit-components.js";

const styles = `
  :root {
    font-family: system-ui, -apple-system, Segoe UI, sans-serif;
    background: #f6f8fb;
    color: #1f2933;
  }

  .page {
    min-height: 100vh;
    display: grid;
    place-content: center;
  }

  .card {
    background: white;
    padding: 24px;
    border-radius: 14px;
    box-shadow: 0 12px 40px rgba(15, 107, 255, 0.08);
    width: 560px;
    max-width: 90vw;
  }

  .row {
    display: flex;
    gap: 12px;
    align-items: center;
    margin: 16px 0 8px;
  }

  .log {
    margin-top: 12px;
    color: #0f6bff;
    font-weight: 600;
  }
`;

function App() {
  const primaryRef = useRef(null);
  const secondaryRef = useRef(null);
  const [lastClick, setLastClick] = useState("пока ничего.");

  useEffect(() => {
    const primaryEl = primaryRef.current;
    const secondaryEl = secondaryRef.current;

    const handlePrimary = () => setLastClick("primary");
    const handleSecondary = () => setLastClick("secondary");

    primaryEl?.addEventListener("button-click", handlePrimary);
    secondaryEl?.addEventListener("button-click", handleSecondary);

    return () => {
      primaryEl?.removeEventListener("button-click", handlePrimary);
      secondaryEl?.removeEventListener("button-click", handleSecondary);
    };
  }, []);

  return (
    <div className="page">
      <style>{styles}</style>
      <div className="card">
        <hello-greeting
          name="React"
          message="Lit-компоненты рендерятся внутри JSX."
        ></hello-greeting>

        <div className="row">
          <lit-button ref={primaryRef} label="Primary"></lit-button>
          <lit-button
            ref={secondaryRef}
            variant="secondary"
            label="Secondary"
          ></lit-button>
        </div>

        <div className="log">Последний клик: {lastClick}</div>
      </div>
      <footer>
        <cookie-alert />
      </footer>
    </div>
  );
}

export default App;
