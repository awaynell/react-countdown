import React, { useCallback, useEffect, useRef, useState } from "react";
import ErrorWindow from "./components/ErrorWindow";

const Timer = () => {
  const [count, setCount] = useState({ days: 0, hours: 0, min: 0, sec: 0 });
  const [run, setRun] = useState("Запустить таймер");
  const [error, setError] = useState({ days: false, hours: false, min: false, sec: false });
  const [errorShow, setErrorShow] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [enableBtn, setEnableBtn] = useState(false);

  let inputDays = useRef(null);
  let inputHours = useRef(null);
  let inputMin = useRef(null);
  let inputSec = useRef(null);

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
    if (Object.values(count).reduce((acc, sum) => sum + acc) > 0) {
      setError("");
      setRun("Таймер запущен");
      timer();
    }
  };

  const validValue =
    new Date().getTime() + 1000 * 60 * 60 * 24 * count.days + 1000 * 60 * 60 * count.hours + 1000 * 60 * count.min + 1000 * count.sec;
  let arr = [inputDays, inputHours, inputMin, inputSec];

  const timer = () => {
    setEnableBtn(true);
    let currentValue = validValue - new Date().getTime();
    console.log("currentValue: ", currentValue);
    let days = Math.trunc(currentValue / (1000 * 60 * 60 * 24));
    let hours = Math.trunc((currentValue % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let min = Math.trunc((currentValue % (1000 * 60 * 60)) / (1000 * 60));
    let sec = Math.trunc((currentValue % (1000 * 60)) / 1000);
    inputDays.current.value = days;
    inputHours.current.value = hours;
    inputMin.current.value = min;
    inputSec.current.value = sec;
    setReadOnly(true);
    let timeout = setTimeout(timer, 1000);
    if (currentValue < 1000 && currentValue > 0) {
      clearTimeout(timeout);
      setEnableBtn(false);
      setRun("Запустить таймер");
      setReadOnly(false);
      setCount({ days: 0, hours: 0, min: 0, sec: 0 });
    }
  };

  const checkValue = (count) => {
    setErrorShow(false);
    if (count.sec > 59 || count.sec < 0) {
      return setError({ ...error, sec: true });
    }
    if (count.min > 59 || count.min < 0) {
      return setError({ ...error, min: true });
    }
    if (count.hours > 24 || count.hours < 0) {
      return setError({ ...error, hours: true });
    }
    setError({ days: false, hours: false, min: false, sec: false });
  };

  useEffect(() => {
    checkValue(count);
    if (readOnly) {
      arr.map((el) => {
        el.current.readOnly = true;
      });
    }
    if (!readOnly) {
      arr.map((el) => {
        el.current.readOnly = false;
      });
    }
  }, [count, readOnly]);

  return (
    <>
      <button
        disabled={enableBtn}
        className="btn"
        onClick={() => {
          startTimer();
        }}
      >
        {run}
      </button>
      {errorShow ? <ErrorWindow style={{ textAlign: "center", marginTop: "20px", color: "tomato" }} error={error} /> : null}
      <div className="timer">
        <div className="wrapper">
          <div className="days">
            <input
              type={"number"}
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
              type={"number"}
              ref={inputHours}
              placeholder="00"
              onChange={(e) => {
                setCount({ ...count, hours: e.target.value });
              }}
              className={error.hours ? "error" : null}
            />
            {error.hours ? <ErrorWindow error={"Промежуток 0 - 24"} /> : null}
            <span>Hours</span>
          </div>
          <div className="min">
            <input
              type={"number"}
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
