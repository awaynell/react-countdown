import React from "react";

const MyInput = (count) => {
  return (
    <fieldset>
      <input className="myInput" {...count} type="text" placeholder="00" />
    </fieldset>
  );
};

export default MyInput;
