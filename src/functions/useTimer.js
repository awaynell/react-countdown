export const useTimer = (value, count, setCount) => {
  console.log("useTimer work");
  let counter = value;
  let timer = setInterval(() => {
    counter - 1;
    setCount(counter);
    console.log(count);
    if (counter === 0) {
      clearInterval(timer);
    }
  }, 1000);
};
