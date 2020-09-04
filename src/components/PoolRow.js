import React, { useState, useEffect } from "react";
import BN from "bn.js";

const BALANCE_DECIMALS = 1000000000000000000;
const APP_URL = "https://delphi.akropolis.io/savings/pool/";

// calculate avg apy from aprHistory
function calcAvg(aprHistory) {
  let sum = new BN(0);
  let weights = new BN(0);
  aprHistory.forEach((apr) => {
    sum = sum.add(new BN(apr.amount).mul(new BN(apr.duration)));
    weights = weights.add(new BN(apr.duration));
  });
  return sum.div(weights);
}

//TODO: add weekly calculation
// takes srewards query output from subgraph + rewardTokenNames to rewards weekly
function calcWeeklyRewardsComplex(srewards, rewardTokenNames) {
  let sum = {};
  rewardTokenNames.forEach((token) => {
    sum[token] = new BN(0);
  });
  let decimals = {};
  let result = {};

  srewards.forEach((reward) => {
    sum[reward.token.symbol] = sum[reward.token.symbol].add(
      new BN(reward.amount)
    );
    decimals[reward.token.symbol] = Math.pow(10, reward.token.decimals);
  });

  rewardTokenNames.forEach((token) => {
    result[token] = (sum[token] / decimals[token]).toLocaleString();
  });
  return JSON.stringify(result);
}

const PoolRow = (props) => {
  // each card uses this to grab rewards and set
  const [rewards, setRewards] = useState(null);
  // async function to grab rewards
  async function getRewards() {
    const rewards = await props.api.getRewardDetails(
      props.pool.aprHistory[0].pool.id
    );
    setRewards(rewards);
  }
  // run the function once

  useEffect(() => {
    getRewards();
    // eslint-disable-next-line react-hooks/exhaustive-deps,
  }, [props]);
  // open url in new tab
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  // pool name
  const name = props.pool.poolToken.name;
  // apr decimals
  const aprDecimals = Math.pow(10, props.aprDecimals);
  const aprHistory = props.pool.aprHistory;
  const apy = (calcAvg(aprHistory) * 100) / aprDecimals;
  // token list
  const tokens = props.pool.tokens;
  // extract name from tokens
  const tokenNames = tokens.map((token) => token.symbol);
  // get reward tokens
  const rewardTokens = props.pool.rewardTokens;
  // extract name from reward tokens
  const rewardTokenNames = rewardTokens.map((token) => token.symbol);
  // get pool id
  const poolId = aprHistory[0].pool.id;
  // this is the mainnet dapp url for the pool
  const url = `${APP_URL}${poolId}`;
  // current pool balance (liquidity)
  const liquidity = props.pool.balance.amount / BALANCE_DECIMALS;
  // user defined amount passed from parent
  const amount = props.amount;
  // // caclulated using amount and apr, TODO: use apy
  const yearly_earnings = (amount * apy) / 100;
  let weeklyRewardTokens = "";
  if (rewards && rewards[0]) {
    // reward
    weeklyRewardTokens = calcWeeklyRewardsComplex(rewards, rewardTokenNames);
    console.log(weeklyRewardTokens);
  }
  return (
    <tr
      onClick={() => {
        openInNewTab(url);
      }}
    >
      <td dataLabel="Pool Name"> {name}</td>
      <td dataLabel="APY">
        {apy.toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}
      </td>
      <td dataLabel="Liquidity">
        {liquidity.toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}
      </td>
      <td dataLabel="Deposit Currencies"> {tokenNames.toString()}</td>
      <td dataLabel="Weekly Pool Rewards"> {weeklyRewardTokens.toString()}</td>
      <td dataLabel="Yearly Profit">
        {yearly_earnings.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
    </tr>
  );
};

export default PoolRow;
