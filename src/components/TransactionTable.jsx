import React, { useState, useEffect } from "react";
import "../Style/style.css";

function Transaction() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://mempool.space/api/mempool/recent?limit=10")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const formatBTCValue = (value) => {
    return parseFloat(value) + " BTC";
  };

  return (
    <div className="desktop">
      <div class="sub-navbar" bis_skin_checked="1">
        <div className="container sub-nav-container">
          <div className="sub-nav">
            <a href="_">Dashboard</a>
            <a href="blocks/recent">Blocks</a>
            <a className="active" href="tx/recent">
              Transactions
            </a>
          </div>
        </div>
        <form className="search">
          <div className="search-bar">
            <input
              className="form-control search-bar-input"
              type="search"
              name="a"
              placeholder="Search for block height, hash, transaction, or address"
              autoFocus
              required
              autoComplete="off"
              aria-label="Search"
            />
            <a className="qrcode-link" href="scan-qr">
              <img
                src="https://blockstream.info/img/icons/qrcode.svg"
                alt="QR Code"
              />
            </a>
            <button className="search-bar-submit" type="image"></button>
          </div>
        </form>
      </div>

      <div className="transactions-header">
        <h2 className="transactions-table-header">Latest Transactions</h2>
      </div>

      <table className="transactions-table">
        <thead>
          <tr className="transactions-table-row">
            <th className="transactions-table-cell transaction-id-header">
              Transaction ID
            </th>
            <th className="transactions-table-cell value-header">Value</th>
            <th className="transactions-table-cell size-header">Size</th>
            <th className="transactions-table-cell fee-header">Fee</th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction, index) => (
            <tr key={index} className="transactions-table-row">
              <td className="transactions-table-cell transaction-id">
                {transaction.txid}
              </td>
              <td className="transactions-table-cell value">
                {formatBTCValue(transaction.value)}
              </td>
              <td className="transactions-table-cell size">
                {transaction.vsize} vB
              </td>
              <td className="transactions-table-cell fee">
                {(
                  parseFloat(transaction.fee) / parseFloat(transaction.vsize)
                ).toFixed(1)}{" "}
                sat/vB
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transaction;
