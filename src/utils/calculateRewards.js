export const calculatePoints = (amt) => {
  let points = 0;
  if (amt > 100) {
    points = 2 * (amt - 100) + 50;
  } else if (amt > 50 && amt <= 100) {
    points = amt - 50;
  } else {
    points = 0;
  }
  return points;
};

export const buildInfo = (data) => {
  const pointsPerTransaction = data.map((transaction) => {
    let points = calculatePoints(transaction.amt);
    const month = new Date(transaction.transactionDt).getMonth();
    return { ...transaction, points, month };
  });
  let byCustomer = {};
  let totalPointsByCustomer = {};
  pointsPerTransaction.forEach((pointsPerTransaction) => {
    let { custid, name, month, points, transactionDt } = pointsPerTransaction;
    if (!byCustomer[custid]) {
      byCustomer[custid] = [];
    }
    if (!totalPointsByCustomer[custid]) {
      totalPointsByCustomer[custid] = 0;
    }

    totalPointsByCustomer[custid] += points;

    if (byCustomer[custid][month]) {
      byCustomer[custid][month].points += points;
      byCustomer[custid][month].monthNumber = month;
      byCustomer[custid][month].numTransactions++;
    } else {
      byCustomer[custid][month] = {
        custid,
        name,
        month: new Date(transactionDt).toLocaleString("en-us", {
          month: "long",
        }),
        monthNumber: month,
        numTransactions: 1,
        points,
      };
    }
  });
  const summaryByCustomer = buildSummaryInfo(byCustomer, totalPointsByCustomer);
  const summary = summaryByCustomer.reduce((prev, current) => {
    prev[current.name] = (prev[current.name] || 0) + current.points;
    return prev;
  }, {});
  return {
    summaryByCustomer,
    pointsPerTransaction,
    byCustomer,
    totalPointsByCustomer: Object.keys(summary).map((key) => ({
      name: key,
      points: summary[key],
    })),
  };
};

export const buildSummaryInfo = (byCustomer, totalPointsByCustomer) => {
  let summary = [];
  for (let custKey in byCustomer) {
    byCustomer[custKey].forEach((cRow) => {
      cRow.totalPointsByCustomer = totalPointsByCustomer[custKey];
      summary.push(cRow);
    });
  }
  return summary;
};
