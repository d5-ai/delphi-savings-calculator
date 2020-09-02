import React, { Component } from "react";
import Overview from "./Overview";
import PoolList from "./PoolList";
import AmountBar from "./AmountBar";
import getPoolAPYDetails from "../api/TheGraphApi";

class App extends Component {
  state = {
    // stores all poolStats
    poolStats: [],
    // stores user input Amount
    userAmount: 0,
  };

  // callback for when user submits amount
  onAmountSubmit = (amount) => {
    this.setState({ userAmount: amount });
  };

  // gets pool stats and sets state
  async updatePoolSats() {
    const poolDetails = await getPoolAPYDetails();
    this.setState({ poolStats: poolDetails.data.savingsPools });
    console.log(poolDetails.data.savingsPools);
  }

  // load pool stats
  async componentDidMount() {
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
        <Overview />
        <hr />
        <div className="ui container">
          <AmountBar onSubmit={this.onAmountSubmit} />
        </div>
        <hr />
        <PoolList pools={this.state.poolStats} amount={this.state.userAmount} />
      </div>
    );
  }
}
export default App;
