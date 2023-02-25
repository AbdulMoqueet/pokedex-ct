import React from "react";

const Loader = () => {
  return (
    <div className="bg-[#00000050] h-screen w-screen fixed top-0 left-0 z-10 grid place-items-center">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
