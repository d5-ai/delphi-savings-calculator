import React from "react";
import PoolCard from "./PoolCard";

// This displays the whole list of asset's
const PoolList = (props) => {
  const renderList = props.pools.map((asset) => {
    return (
      <PoolCard
        key={asset.poolToken.name}
        alt={asset.poolToken.name}
        pool={asset}
        amount={props.amount}
        aprDecimals={props.aprDecimals}
        api={props.api}
      />
    );
  });

  return (
    <table class="ui celled table">
      {" "}
      <thead>
        <tr>
          <th>Pool Name</th>
          <th className="sorted ascending">APY</th>
          <th>Liquidity</th>
          <th> Deposit Currencies</th>
          <th>Weekly Pool Rewards</th>
          <th>Yearly Profit</th>
        </tr>
      </thead>
      <tbody>{renderList}</tbody>
    </table>
  );
};

export default PoolList;
