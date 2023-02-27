import ReactTable from "react-table";
import React from "react";

const SummaryByCustomerMonths = ({ transactionData }) => {
  const columns = [
    {
      Header: "Customer",
      accessor: "name",
    },
    {
      Header: "Month",
      accessor: "month",
    },
    {
      Header: "# of Transactions",
      accessor: "numTransactions",
    },
    {
      Header: "Reward Points",
      accessor: "points",
    },
  ];

  return (
    <ReactTable
      data={transactionData.summaryByCustomer}
      defaultPageSize={10}
      columns={columns}
      SubComponent={(row) => {
        return (
          <div>
            {transactionData
              .getIndividualTransactions(row)
              .map((tran, index) => {
                return (
                  <div
                    className="container"
                    key={`${tran.transactionDt}-${index}`}
                  >
                    <div className="row">
                      <div className="col-8">
                        <strong>Transaction Date:</strong> {tran.transactionDt}{" "}
                        - <strong>$</strong>
                        {tran.amt} - <strong>Points: </strong>
                        {tran.points}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        );
      }}
    />
  );
};
export default SummaryByCustomerMonths;
