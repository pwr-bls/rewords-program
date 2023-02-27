import ReactTable from "react-table";
import React from "react";

const totalsByColumns = [
  {
    Header: "Customer",
    accessor: "name",
  },
  {
    Header: "Points",
    accessor: "points",
  },
];

const SummaryByCustomer = ({ transactionData }) => {
  return (
    <ReactTable
      data={transactionData.totalPointsByCustomer}
      columns={totalsByColumns}
      defaultPageSize={5}
    />
  );
};
export default SummaryByCustomer;
