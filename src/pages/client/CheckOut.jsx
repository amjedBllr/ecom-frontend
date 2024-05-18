import React, { useState } from "react";
import SellerOrder from "../../components/SellerOrder.jsx";
import ClientOrder from "../../components/ClientOrder.jsx";
const CheckOut = () => {
  return (
    <div id="seller-orders">
      <div className="title">
        <h2>
          Orders
          <br />
          <span>(Confirmed purchases)</span>
        </h2>
        <p></p>
        <hr />
      </div>
      <div className="orders">
        <ClientOrder dimens={0} confirmed={true} />
        <ClientOrder dimens={65} confirmed={true} />
        <ClientOrder dimens={0} confirmed={true} />
        <ClientOrder dimens={0} confirmed={true} />
      </div>
      <hr />
      <div className="orders">
        <ClientOrder dimens={0} confirmed={false} />
        <ClientOrder dimens={65} confirmed={false} />
        <ClientOrder dimens={0} confirmed={false} />
        <ClientOrder dimens={0} confirmed={false} />
      </div>
    </div>
  );
};

export default CheckOut;
