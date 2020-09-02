import React from "react";

// This is part of the AssetList (displays each Asset)
const PoolCard = (props) => {
  const name = props.pool.poolToken.name;
  const apr = props.pool.apr.amount / 1000000;
  const balance = props.pool.balance.amount / 100000000000000000;

  return (
    <div className="ui segment">
      <div>
        <div className="header">{name}</div>
        <div>APY: {apr} % </div>
        <div>Liquidity: ${balance} </div>
      </div>
    </div>
  );
};

export default PoolCard;
