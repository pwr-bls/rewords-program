import React from "react";
import "./App.css";
import useCalculateRewards from "./hooks/useCalculateRewards";
import SummaryByCustomer from "./components/SummaryByCustomer";
import SummaryByCustomerMonths from "./components/SummaryByCustomerMonths";

function App() {
  const transactionData = useCalculateRewards();

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-10">
            <h2>Points Rewards System Totals by Customer Months</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <SummaryByCustomerMonths transactionData={transactionData} />
          </div>
        </div>
      </div>

      <div className="container pt-4">
        <div className="row">
          <div className="col-10">
            <h2>Points Rewards System Totals By Customer</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <SummaryByCustomer transactionData={transactionData} />
          </div>
        </div>
      </div>
      {transactionData.isLoading && (
        <div className="position-absolute App-modal">
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
}

export default App;
