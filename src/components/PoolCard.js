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
  // pool name
  const name = props.pool.poolToken.name;
  // token list
  const tokens = props.pool.tokens;
  // extract name from tokens
  const tokenNames = tokens.map((token) => token.symbol);
  // get reward tokens
  const rewardTokens = props.pool.rewardTokens;
  // extract name from reward tokens
  const rewardTokenNames = rewardTokens.map((token) => token.symbol);
  // list of reward amount,date,id
  const rewards = props.pool.rewards;
  // TODO: parse into more useful info (currently just displays the list of amounts (date ignored))
  const rewardList = rewards.map((reward) =>
    (reward.amount / BALANCE_DECIMALS).toLocaleString()
  );
  // get pool id
  const poolId = props.pool.apr.pool.id;
  // this is the mainnet dapp url for the pool
  const url = `${APP_URL}${poolId}`;
  // TODO: this should be parsed differently,  this does not traslate into APY
  const apr = props.pool.apr.amount / APR_DECIMALS;
  // current pool balance (liquidity)
  const liquidity = props.pool.balance.amount / BALANCE_DECIMALS;
  // user defined amount passed from parent
  const amount = props.amount;
  // caclulated using amount and apr, TODO: use apy
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
          <b>${liquidity.toLocaleString()}</b>
        </div>
        <div>
          Deposit:
          <b>{tokenNames.toString()} </b>
          RewardTokens:
          <b>{rewardTokenNames.toString()}</b>
        </div>
        <div style={{ fontSize: "0.78em" }}>
          Historical Rewards: <b>{rewardList.toString()}</b>
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
