import React, { useEffect, useRef, useState } from "react";
import ErrorWindow from "./components/ErrorWindow";

const Timer = () => {
  const [count, setCount] = useState({ days: 0, hours: 0, min: 0, sec: 0 });
  const [run, setRun] = useState("Запустить таймер");
  const [error, setError] = useState({ days: false, hours: false, min: false, sec: false });
  const [errorShow, setErrorShow] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [enableBtn, setEnableBtn] = useState(true);
  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(false);
  let [currentValue, setCurValue] = useState(0);

  let inputDays = useRef(null);
  let inputHours = useRef(null);
  let inputMin = useRef(null);
  let inputSec = useRef(null);

  let arr = [inputDays, inputHours, inputMin, inputSec];

  useEffect(() => {
    let timeout;
    const startTimer = () => {
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
        setEnableBtn(false);
        setReadOnly(true);
        timer(stop);
      }
    };

    const timer = () => {
      timeout = setTimeout(timer, 1000);
      let days = Math.trunc(currentValue / (1000 * 60 * 60 * 24));
      let hours = Math.trunc((currentValue % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let min = Math.trunc((currentValue % (1000 * 60 * 60)) / (1000 * 60));
      let sec = Math.trunc((currentValue % (1000 * 60)) / 1000);
      inputDays.current.value = days;
      inputHours.current.value = hours;
      inputMin.current.value = min;
      inputSec.current.value = sec;
      localStorage.setItem("currentValue", currentValue);
      currentValue = currentValue - 1000;
      setCurValue(currentValue);
      if ((currentValue < 1000 && currentValue > 0) || currentValue < 0 || stop) {
        clearTimeout(timeout);
        arr.map((el) => {
          el.current.value = "";
        });
        localStorage.clear();
        setEnableBtn(true);
        setRun("Запустить таймер");
        setReadOnly(false);
        setCount({ days: 0, hours: 0, min: 0, sec: 0 });
        setStop(false);
        return true;
      }
    };

    const contTimer = () => {
      timeout = setTimeout(contTimer, 1000);
      setEnableBtn(false);
      setReadOnly(true);
      setRun("Таймер запущен");
      let afterUpdateVal = localStorage.getItem("currentValue");
      let days = Math.trunc(afterUpdateVal / (1000 * 60 * 60 * 24));
      let hours = Math.trunc((afterUpdateVal % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let min = Math.trunc((afterUpdateVal % (1000 * 60 * 60)) / (1000 * 60));
      let sec = Math.trunc((afterUpdateVal % (1000 * 60)) / 1000);
      setCount({ days: days, hours: hours, min: min, sec: sec });
      inputDays.current.value = days;
      inputHours.current.value = hours;
      inputMin.current.value = min;
      inputSec.current.value = sec;
      afterUpdateVal = afterUpdateVal - 1000;
      localStorage.setItem("currentValue", afterUpdateVal);
      if ((afterUpdateVal < 500 && afterUpdateVal > 0) || afterUpdateVal < 0 || stop) {
        clearTimeout(timeout);
        arr.map((el) => {
          el.current.value = "";
        });
        localStorage.clear();
        setEnableBtn(true);
        setRun("Запустить таймер");
        setReadOnly(false);
        setStart(false);
        setStop(false);
        setCount({ days: 0, hours: 0, min: 0, sec: 0 });
      }
    };
    if (localStorage.getItem("currentValue") !== null) {
      contTimer();
    }
    if (start) {
      startTimer();
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [start, stop]);

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
    if (count.days > 365 || count.days < 0) {
      return setError({ ...error, days: true });
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

    const validValue =
      new Date().getTime() + 1000 * 60 * 60 * 24 * count.days + 1000 * 60 * 60 * count.hours + 1000 * 60 * count.min + 1000 * count.sec;
    setCurValue(validValue - new Date().getTime());
  }, [count, readOnly]);

  return (
    <>
      <div className="control-wrapper">
        <button
          disabled={!enableBtn}
          className="btn"
          onClick={() => {
            setStart(true);
          }}
        >
          {run}
        </button>
        <button
          className="btn"
          onClick={() => {
            setStop(true);
          }}
        >
          Стоп
        </button>
        {errorShow ? <ErrorWindow style={{ textAlign: "center", marginTop: "20px", color: "tomato" }} error={error} /> : null}
      </div>

      <div className="timer">
        <div className="wrapper">
          <div className="days">
            <input
              type={"number"}
              ref={inputDays}
              placeholder="00"
              onChange={(e) => {
                setCount({ ...count, days: e.target.value });
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
