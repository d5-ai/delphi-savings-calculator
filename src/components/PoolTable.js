import React, { Component } from "react";
import PoolRow from "./PoolRow";

class PoolTable extends Component {
  state = {
    // stores all poolStats
    pooList: [],
  };

  renderList() {
    const rend = this.props.pools.map((asset) => {
      console.log(asset);
      return (
        <PoolRow
          key={asset.poolToken.name}
          alt={asset.poolToken.name}
          pool={asset}
          amount={this.props.amount}
          aprDecimals={this.props.aprDecimals}
          api={this.props.api}
        />
      );
    });
    return rend;
  }

  render() {
    return (
      <table class="ui celled table stackable" style={{ textAlign: "right" }}>
        {" "}
        <thead>
          <tr>
            <th>Pool Name</th>
            <th>
              <button>APY</button>
            </th>
            <th>Liquidity</th>
            <th> Deposit Currencies</th>
            <th>Weekly Pool Rewards</th>
            <th>Yearly Profit</th>
          </tr>
        </thead>
        <tbody>{this.renderList()}</tbody>
      </table>
    );
  }
}

export default PoolTable;
