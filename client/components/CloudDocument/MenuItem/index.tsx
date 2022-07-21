import React from "react";
// import remixiconUrl from "remixicon/fonts/remixicon.symbol.svg";

const MenuItem = ({ icon, title, action, isActive = null }: any) => {
  return (
    <button
      onClick={action}
      title={title}
    >
      {title}
    </button>
  );
};

export default MenuItem;
