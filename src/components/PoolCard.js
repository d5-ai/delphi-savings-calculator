import React from "react";

const BALANCE_DECIMALS = 1000000000000000000;
const APR_DECIMALS = 1000000;
const APP_URL = "https://delphi.akropolis.io/savings/pool/";

// This is part of the AssetList (displays each Asset)
const PoolCard = (props) => {
  // open url in new tab
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  const name = props.pool.poolToken.name;
  const tokens = props.pool.tokens;
  const rewardTokens = props.pool.rewardTokens;
  const poolId = props.pool.apr.pool.id;
  // this is the savings url
  const url = `${APP_URL}${poolId}`;
  // const rewards = props.pool.rewards;

  const rewardTokenNames = rewardTokens.map((token) => token.symbol);
  const tokenNames = tokens.map((token) => token.symbol);
  // this does not traslate into APY
  // TODO: fix this
  const apr = props.pool.apr.amount / APR_DECIMALS;
  const balance = props.pool.balance.amount / BALANCE_DECIMALS;
  const amount = props.amount / 1;
  const yearly_earnings = (amount * apr) / 100;
  return (
    <div
      className="ui segment"
      onClick={() => {
        openInNewTab(url);
      }}
    >
      <div>
        <div className="header">
          <h3>{name}</h3>
        </div>
        <div>
          APY:
          <b>{apr.toLocaleString()}% </b>
          Liquidity:
          <b>${balance.toLocaleString()}</b>
        </div>
        <div>
          Deposit:
          <b>{tokenNames.toString()} </b>
          RewardTokens:
          <b>{rewardTokenNames.toString()}</b>
        </div>
        <div>
          Yearly Profit:
          <b>${yearly_earnings.toLocaleString()}</b>
        </div>
      </div>
    </div>
  );
};

export default PoolCard;
