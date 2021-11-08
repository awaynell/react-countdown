export const checkValue = (count, error, setErrorShow, setError) => {
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
