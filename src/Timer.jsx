import React, { useCallback, useEffect, useRef, useState } from "react";
import MyInput from "./MyInput/MyInput";

const Timer = () => {
  const [count, setCount] = useState({ days: 0, hours: 0, min: 0, sec: 0 });
  const [run, setRun] = useState("Запустить таймер");
  const [sec, setSec] = useState(0);

  const useTimer = (value) => {
    let result = value;
    let timer = setInterval(() => {
      result--;
      if (result === 0) {
        clearInterval(timer);
      }
      return setSec(result);
    }, 1000);
  };

  return (
    <>
      <div className="btn" onClick={() => useTimer(count.sec)}>
        {run}
      </div>
      <div className="timer">
        <div className="wrapper">
          <div className="days">
            <MyInput
              onChange={(e) => {
                setCount({ ...count, days: e.target.value });
                console.log(count);
              }}
            />
            <span>Days</span>
          </div>
          <div className="hours">
            <MyInput
              onChange={(e) => {
                setCount({ ...count, hours: e.target.value });
                console.log(count);
              }}
            />
            <span>Hours</span>
          </div>
          <div className="min">
            <MyInput />
            <span>Minutes</span>
          </div>
          <div className="sec">
            <MyInput
              onChange={(e) => {
                setCount({ ...count, sec: e.target.value });
              }}
            />
            <span>Seconds</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timer;
