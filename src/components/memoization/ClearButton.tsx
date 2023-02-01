// UseCallback

import React from "react";

type ClearButtonProps = {
  handleClear(): void;
};

// alt child component bir state güncellemsi yapılacağına dair kendinden bir event emit ediyor
const ClearButton = ({ handleClear }: ClearButtonProps) => {
  console.log("ClearButton");

  return (
    <>
      <h1>
        <button onClick={handleClear}>Clear List</button>
      </h1>
    </>
  );
};

export default React.memo(ClearButton);
