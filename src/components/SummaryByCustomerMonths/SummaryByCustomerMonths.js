import React from "react";
import Table from "../Table/Table";
import ToggleRow from "../ToggleRow/ToggleRow";

const SummaryByCustomerMonths = ({ transactionData }) => {
  const columns = [
    {
      Header: "Customer",
      accessor: "name",
      allowCollapse: true,
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

  const renderCollapsedData = (row) => {
    return transactionData.getIndividualTransactions(row).map((tran, index) => {
      return (
        <div className="container" key={`${tran.transactionDt}-${index}`}>
          <div className="row">
            <div>
              <strong>Transaction Date:</strong> {tran.transactionDt} -{" "}
              <strong>$</strong>
              {tran.amt} - <strong>Points: </strong>
              {tran.points}
            </div>
          </div>
        </div>
      );
    });
  };

  const renderToggleRow = (row, cols) => (isCollapsed, setIsCollapsed) => {
    return (
      <>
        <tr key={`${row.name}-${row.month}_row`}>
          {cols.map((column) => (
            <td
              key={`${row.name}-${row.month}_td_${column.accessor}`}
              onClick={() =>
                column.allowCollapse && setIsCollapsed((prev) => !prev)
              }
            >
              {column.allowCollapse && (
                <span className="toggle-icon">
                  {isCollapsed ? `\u25bc` : `\u25b6`}
                </span>
              )}
              {row[column.accessor]}
            </td>
          ))}
        </tr>
        {isCollapsed && (
          <tr key={`${row.name}-${row.month}_row_details`}>
            <td colSpan="5" key={`${row.name}-${row.month}_td_details`}>
              {renderCollapsedData(row)}
            </td>
          </tr>
        )}
      </>
    );
  };
  return (
    <>
      <Table
        columns={columns}
        data={transactionData.summaryByCustomer}
        rowRender={(row, cols) => {
          return (
            <ToggleRow
              key={`${row.name}-${row.month}`}
              renderRow={renderToggleRow(row, cols)}
            />
          );
        }}
      />
    </>
  );
};
export default SummaryByCustomerMonths;
