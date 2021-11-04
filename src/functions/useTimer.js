export const useTimer = (value, inputEl) => {
  console.log("useTimer work");
  let counter = value;
  let timer = setInterval(() => {
    counter - 1;
    console.log(inputEl.current.value);
    if (counter === 0) {
      clearInterval(timer);
    }
    return inputEl.current.value;
  }, 1000);
};
