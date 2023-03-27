import React from "react";
import Table from "../Table/Table";

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
    <Table
      data={transactionData.totalPointsByCustomer}
      columns={totalsByColumns}
    />
  );
};
export default SummaryByCustomer;
