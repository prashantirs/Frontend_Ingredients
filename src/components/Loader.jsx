import React from "react";
import { Oval } from "react-loader-spinner";
const Loader = () => {
  return (
    <Oval
      height={25}
      width={60}
      color="#7a3efb"
      wrapperStyle={{margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      // wrapperStyle={{margin: 'auto',display:'flex'}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#87aded"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

export default Loader;
