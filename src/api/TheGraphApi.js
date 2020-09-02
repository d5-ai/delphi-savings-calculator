import axios from "axios";

const API_URL =
  "https://api.thegraph.com/subgraphs/name/in19farkt/delphi-mainnet";
// querry to get first 1000 pool details using thegraph api
const POOL_STATS_QUERY = {
  query:
    "{\n\n  savingsPools(first: 1000) {\n    poolToken {\n      name\n    }\n    balance {\n      amount\n    }\n    apr {\n      id\n      amount\n      date\n      duration\n      pool {\n        id\n      }\n    }\n    rewards{\n      id\n      amount\n      date\n    }\n    tokens {\n      id\n      symbol\n      decimals\n    }\n    rewardTokens{\n      id\n      name\n      symbol\n      \n    }\n    \n    \n    \n  }\n}\n",
  variables: null,
};

async function getPoolAPYDetails() {
  // send post request to graph api with query term
  const response = await axios.post(API_URL, POOL_STATS_QUERY);
  return response.data;
}

export default getPoolAPYDetails;
