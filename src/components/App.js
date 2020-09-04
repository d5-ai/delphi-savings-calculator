import React, { Component } from "react";
import Overview from "./Overview";
import PoolTable from "./PoolTable";
import AmountBar from "./AmountBar";
import GraphApiInterface from "../api/TheGraphApi";

const API = new GraphApiInterface();

class App extends Component {
  state = {
    // stores all poolStats
    poolStats: [],
    // stores user input Amount
    userAmount: 0,
    // apr decimals
    aprDecimals: 8,
    activeMembers: 0,
  };

  // callback for when user submits amount
  onAmountSubmit = (amount) => {
    this.setState({ userAmount: amount });
  };

  // gets active members and updates state
  async updateActiveMemberCount() {
    const activeMembers = await API.getActiveMembersCount();
    this.setState({ activeMembers });
  }

  // gets pool stats and sets state
  async updatePoolSats() {
    console.log("Fetching pool data");
    const poolStats = await API.getDetailedPoolStats();
    this.setState({ poolStats });
  }

  // gets aprDecimals and sets state
  async updateAprDecimals() {
    const aprDecimals = await API.getAprDecimals();
    this.setState({ aprDecimals });
  }
  // load pool stats
  async componentDidMount() {
    await this.updateAprDecimals();
    await this.updateActiveMemberCount();
    await this.updatePoolSats();
    // run every 20 seconds
    setInterval(this.updatePoolSats.bind(this), 20000);
  }

  render() {
    return (
      <div
        style={{ fontFamily: '"Fira Code", monospace', textAlign: "center" }}
      >
        <h1>
          <br /> Delphi Akropolis Savings's Calculator
        </h1>
        <hr />
        <Overview activeMembers={this.state.activeMembers} />
        <hr />
        <div className="ui container">
          <AmountBar onSubmit={this.onAmountSubmit} />
        </div>
        <hr />

        <PoolTable
          pools={this.state.poolStats}
          amount={this.state.userAmount}
          aprDecimals={this.state.aprDecimals}
          api={API}
        />
      </div>
    );
  }
}
export default App;
