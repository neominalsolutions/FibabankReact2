// Primative Type (React Memo)
import React, { memo } from "react";

type HeaderProps = {
  logo: string;
};

const Header = ({ logo }: HeaderProps) => {
  console.log("Header");

  return (
    <>
      <h1>Header</h1>
      <img width="250px" height="250px" src={logo} />
    </>
  );
};

// export default Header;
// export default React.memo(Header);
export default memo(Header);
