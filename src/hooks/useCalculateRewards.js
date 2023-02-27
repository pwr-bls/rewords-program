import { useState, useEffect, useCallback } from "react";
import fetch from "../api/data.service";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const useCalculateRewards = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [incomingData, setIncomingData] = useState([]);
  const [summaryByCustomer, setSummaryByCustomer] = useState([]);
  const [totalPointsByCustomer, setTotalPointsByCustomer] = useState([]);
  const [pointsPerTransaction, setPointsPerTransaction] = useState([]);

  useEffect(() => {
    setPointsPerTransaction(
      incomingData.map((transaction) => {
        let points = 0;
        let over100 = transaction.amt - 100;

        if (over100 > 0) {
          // A customer receives 2 points for every dollar spent over $100 in each transaction
          points += over100 * 2;
        }
        if (transaction.amt > 50) {
          // plus 1 point for every dollar spent over $50 in each transaction
          points += 50;
        }
        const month = new Date(transaction.transactionDt).getMonth();
        return { ...transaction, points, month };
      })
    );
  }, [incomingData]);

  useEffect(() => {
    // Calculate points per transaction
    if (!pointsPerTransaction || pointsPerTransaction.length === 0) {
      setSummaryByCustomer([]);
      setTotalPointsByCustomer([]);
      return;
    }
    let _byCustomer = {};
    let _totalPointsByCustomer = {};

    pointsPerTransaction.forEach((pointsPerTransaction) => {
      let { custid, name, month, points } = pointsPerTransaction;
      if (!_byCustomer[custid]) {
        _byCustomer[custid] = [];
      }
      if (!_totalPointsByCustomer[name]) {
        _totalPointsByCustomer[name] = 0;
      }
      _totalPointsByCustomer[name] += points;
      if (_byCustomer[custid][month]) {
        _byCustomer[custid][month].points += points;
        _byCustomer[custid][month].monthNumber = month;
        _byCustomer[custid][month].numTransactions++;
      } else {
        _byCustomer[custid][month] = {
          custid,
          name,
          monthNumber: month,
          month: months[month],
          numTransactions: 1,
          points,
        };
      }
    });

    // Calculate summary points by customer
    let tot = [];
    for (var custKey in _byCustomer) {
      _byCustomer[custKey].forEach((cRow) => {
        tot.push(cRow);
      });
    }
    setSummaryByCustomer(tot);
    let totByCustomer = [];
    for (custKey in _totalPointsByCustomer) {
      totByCustomer.push({
        name: custKey,
        points: _totalPointsByCustomer[custKey],
      });
    }
    // Calculate total points by customer
    setTotalPointsByCustomer(totByCustomer);
  }, [pointsPerTransaction]);

  useEffect(() => {
    setIsLoading(true);
    fetch().then((data) => {
      setIncomingData(data);
      setTimeout(() => setIsLoading(false), 2000);
    });
  }, []);

  const getIndividualTransactions = useCallback(
    (row) => {
      return pointsPerTransaction.filter((tRow) => {
        return (
          row.original.custid === tRow.custid &&
          row.original.monthNumber === tRow.month
        );
      });
    },
    [pointsPerTransaction]
  );

  return {
    summaryByCustomer,
    pointsPerTransaction,
    totalPointsByCustomer,
    getIndividualTransactions,
    isLoading,
  };
};
export default useCalculateRewards;
