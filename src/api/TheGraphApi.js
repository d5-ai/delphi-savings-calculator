import axios from "axios";

class GraphApiInterface {
  constructor() {
    this.api_url =
      "https://api.thegraph.com/subgraphs/name/in19farkt/delphi-mainnet";
    this.queries = {
      SUBGRAGH_CONFIG: {
        query: `{subgraphConfig(id: "ID") { aprDecimals}}`,
      },
      POOL_STATS: {
        query:
          "{savingsPools(first: 1000) {\n    poolToken {\n      name\n    }\n    balance {\n      amount\n    }\n    apr {\n      id\n      amount\n      date\n      duration\n      pool {\n        id\n      }\n    }\n    rewards{\n      id\n      amount\n      date\n    }\n    tokens {\n      id\n      symbol\n      decimals\n    }\n    rewardTokens{\n      id\n      name\n      symbol\n      \n    }\n    \n    \n    \n  }\n}\n",
        variables: null,
      },
      GLOBAL_STATS: {
        query: `{globalStat(id: "ID"){\n activeMembersCount}}`,
      },
      POOL_STATS_DETAILED: {
        query:
          "{savingsPools(first: 1000) {\n    poolToken {\n      name\n    }\n    balance {\n      amount\n    }\n    aprHistory(first: 10) {\n      id\n      amount\n      date\n      duration\n      pool {\n        id\n      }\n    }\n    rewards{\n      id\n      amount\n      date\n    }\n    tokens {\n      id\n      symbol\n      decimals\n    }\n    rewardTokens{\n      id\n      name\n      symbol\n      \n    }\n    \n    \n    \n  }\n}\n",
      },
    };
  }

  async getAprDecimals() {
    const response = await axios.post(
      this.api_url,
      this.queries.SUBGRAGH_CONFIG
    );
    return response.data.data.subgraphConfig.aprDecimals;
  }
  async getRewardDetails(poolAddress, date) {
    const REWARDS_QUERY = {
      query: `{srewards(first: 1000, orderBy: date, orderDirection: desc, where: {pool: "${poolAddress}", date_gt: "${date}"}){pool{poolToken{name}}token{id name symbol decimals} amount date}}`,
    };
    const response = await axios.post(this.api_url, REWARDS_QUERY);
    return response.data.data;
  }

  async getDetailedPoolStats() {
    // send post request to graph api with query term
    const response = await axios.post(
      this.api_url,
      this.queries.POOL_STATS_DETAILED
    );
    console.log(response.data.data.savingsPools);

    return response.data.data.savingsPools;
  }

  async getActiveMembersCount() {
    const response = await axios.post(this.api_url, this.queries.GLOBAL_STATS);
    return response.data.data.globalStat.activeMembersCount;
  }
}

export default GraphApiInterface;
