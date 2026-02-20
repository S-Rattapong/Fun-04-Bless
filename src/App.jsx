import React, { useMemo, useState } from "react";
import "./App.css";

function pad2(n) {
  return String(n).padStart(2, "0");
}

function formatTimestamp(d = new Date()) {
  // ตัวอย่างรูปแบบ: Mon Jan 27 2025 20:52:43
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return `${days[d.getDay()]} ${months[d.getMonth()]} ${pad2(d.getDate())} ${d.getFullYear()} ${pad2(
    d.getHours()
  )}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
}

function clampMin0(n) {
  return Math.max(0, n);
}

function CounterCard({ title, colorClass, value, onUp, onDown }) {
  return (
    <div className="card">
      <div className={`cardTitle ${colorClass}`}>{title}</div>
      <div className="cardValue">{value}</div>
      <div className="btnRow">
        <button className="btn" onClick={onUp} type="button">
          UP
        </button>
        <button className="btn" onClick={onDown} type="button">
          DOWN
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [man, setMan] = useState(0);
  const [woman, setWoman] = useState(0);

  // เก็บประวัติการกด Save
  // โครงสร้าง: { id, ts, man, woman, total }
  const [logs, setLogs] = useState([]);

  const total = useMemo(() => man + woman, [man, woman]);

  const handleSave = () => {
    const now = new Date();
    const entry = {
      id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
      ts: formatTimestamp(now),
      man,
      woman,
      total,
    };
    setLogs((prev) => [entry, ...prev]); // เอาอันล่าสุดขึ้นก่อน
  };

  const handleReset = () => {
    setMan(0);
    setWoman(0);
  };

  return (
    <div className="page">
      <h1 className="headline">Counter</h1>

      <div className="cards">
        <CounterCard
          title="Man"
          colorClass="man"
          value={man}
          onUp={() => setMan((v) => v + 1)}
          onDown={() => setMan((v) => clampMin0(v - 1))}
        />

        <CounterCard
          title="Woman"
          colorClass="woman"
          value={woman}
          onUp={() => setWoman((v) => v + 1)}
          onDown={() => setWoman((v) => clampMin0(v - 1))}
        />
      </div>

      <div className="actions">
        <button className="btn actionBtn" onClick={handleSave} type="button">
          Save
        </button>
        <button className="btn actionBtn" onClick={handleReset} type="button">
          Reset
        </button>
      </div>

      <div className="logBox">
        {logs.length === 0 ? (
          <div className="logEmpty">ยังไม่มีการบันทึก</div>
        ) : (
          <ul className="logList">
            {logs.map((x) => (
              <li key={x.id} className="logItem">
                [ {x.ts} ] : M:{x.man}, F:{x.woman}, T:{x.total}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
