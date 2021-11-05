import React, { useCallback, useEffect, useRef, useState } from "react";
import ErrorWindow from "./components/ErrorWindow";

const Timer = () => {
  const [count, setCount] = useState({ days: 0, hours: 0, min: 0, sec: 0 });
  const [run, setRun] = useState("Запустить таймер");
  const [error, setError] = useState({ days: false, hours: false, min: false, sec: false });
  const [errorShow, setErrorShow] = useState(false);
  const [start, setStart] = useState(false);

  const startTimer = (value) => {
    if (
      error.days === true ||
      error.hours === true ||
      error.min === true ||
      error.sec === true ||
      Object.values(count).reduce((acc, sum) => sum + acc) === 0
    ) {
      console.log("error: ", error);
      setErrorShow(true);
      return setError("Введите верные данные и нажмите повторно");
    }
    if (value.sec > 0) {
      setError("");
      setRun("Таймер запущен");
      setStart(true);
      let validValue =
        new Date().getTime() + 1000 * 60 * 60 * 24 * value.days + 1000 * 60 * 60 * value.hours + 1000 * 60 * value.min + 1000 * value.sec;
      arr.map((el) => {
        el.current.readOnly = true;
      });
      let timer = setInterval(() => {
        let currentValue = validValue - new Date().getTime();
        console.log(currentValue);
        setCount({
          days: Math.round(currentValue / (1000 * 60 * 60 * 24)),
          hours: Math.floor((currentValue % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          min: Math.floor((currentValue % (1000 * 60 * 60)) / (1000 * 60)),
          sec: Math.floor((currentValue % (1000 * 60)) / 1000),
        });
        if (value.sec === 0) {
          clearInterval(timer);
          inputSec.current.readOnly = false;
          setStart(false);
          setRun("Запустить таймер");
          inputSec.current.value = "";
        }
      }, 1000);
    } else {
      inputSec.current.value = "";
    }
    console.log(inputSec.current);
  };

  let inputDays = useRef(null);
  let inputHours = useRef(null);
  let inputMin = useRef(null);
  let inputSec = useRef(null);

  let arr = [inputDays, inputHours, inputMin, inputSec];

  const checkValue = (count) => {
    setErrorShow(false);
    if (count.sec > 59 || count.sec < 0) {
      return setError({ ...error, sec: true });
    }
    if (count.min > 59 || count.min < 0) {
      return setError({ ...error, min: true });
    }
    setError({ days: false, hours: false, min: false, sec: false });
  };

  useEffect(() => {
    checkValue(count);
  }, [count]);

  return (
    <>
      <div className="btn" onClick={() => startTimer(count)}>
        {run}
      </div>
      {errorShow ? <ErrorWindow style={{ textAlign: "center", marginTop: "20px", color: "tomato" }} error={error} /> : null}
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
              className={error.days ? "error" : null}
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
              className={error.hours ? "error" : null}
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
              className={error.min ? "error" : null}
            />
            {error.min ? <ErrorWindow error={"Промежуток 0 - 59"} /> : null}
            <span>Minutes</span>
          </div>
          <div className="sec">
            <input
              type={"number"}
              ref={inputSec}
              placeholder="00"
              onChange={(e) => {
                setCount({ ...count, sec: e.target.value });
              }}
              className={error.sec ? "error" : null}
            />
            {error.sec ? <ErrorWindow error={"Промежуток 0 - 59"} /> : null}
            <span>Seconds</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timer;
