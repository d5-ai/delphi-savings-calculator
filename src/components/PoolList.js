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
      />
    );
  });

  return <div className="ui relaxed divided list">{renderList}</div>;
};

export default PoolList;
