import React, { useEffect, useRef, useState } from "react";

const Timer = () => {
  const [count, setCount] = useState({ days: 0, hours: 0, min: 0, sec: 0 });
  const [run, setRun] = useState("Запустить таймер");
  const [error, setError] = useState(false);
  const [errorInfo, setErrorInfo] = useState("");

  const useTimer = (value) => {
    if (error) {
      console.log(error);
      return setErrorInfo("Введите данные и нажмите повторно");
    }
    if (value.sec > 0) {
      setErrorInfo("");
      setRun("Таймер запущен");

      let timer = setInterval(() => {
        arr.map((el) => {
          el.current.readOnly = true;
        });
        inputSec.current.readOnly = true;
        value.sec--;
        inputSec.current.value = value.sec;
        if (value.sec === 0) {
          clearInterval(timer);
          inputSec.current.readOnly = false;
          setRun("Запустить таймер");
          inputSec.current.value = "";
        }
      }, 1000);
    } else {
      inputSec.current.value = "";
    }
    console.log(inputSec.current);
  };

  const checkError = (error) => {
    if (error) {
      return <div className="errorInfo">Введите данные правильно</div>;
    }
  };

  let inputDays = useRef(null);
  let inputHours = useRef(null);
  let inputMin = useRef(null);
  let inputSec = useRef(null);

  let arr = [inputDays, inputHours, inputMin, inputSec];

  const checkValue = (count) => {
    if (count.sec > 60) {
      return setError(true);
    }
    setError(false);
  };

  useEffect(() => {
    checkValue(count);
  }, [count]);

  return (
    <>
      <div className="btn" onClick={() => useTimer(count)}>
        {run}
      </div>
      {checkError(error)}
      <div className="timer">
        <div className="wrapper">
          <div className="days">
            <input
              ref={inputDays}
              placeholder="00"
              onChange={(e) => {
                setCount({ ...count, days: e.target.value });
                console.log(count);
              }}
              className={error ? "error" : null}
            />
            <span>Days</span>
          </div>
          <div className="hours">
            <input
              ref={inputHours}
              placeholder="00"
              onChange={(e) => {
                setCount({ ...count, hours: e.target.value });
              }}
              className={error ? "error" : null}
            />
            <span>Hours</span>
          </div>
          <div className="min">
            <input
              ref={inputMin}
              placeholder="00"
              onChange={(e) => {
                setCount({ ...count, min: e.target.value });
              }}
              className={error ? "error" : null}
            />
            <span>Minutes</span>
          </div>
          <div className="sec">
            <input
              ref={inputSec}
              placeholder="00"
              onChange={(e) => {
                setCount({ ...count, sec: e.target.value });
              }}
              className={error ? "error" : null}
            />
            <span>Seconds</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timer;
