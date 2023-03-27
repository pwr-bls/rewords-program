import { useState, useEffect, useCallback } from "react";
import fetch from "../api/data.service";
import { buildInfo } from "../utils/calculateRewards";

const useCalculateRewards = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [summaryByCustomer, setSummaryByCustomer] = useState([]);
  const [pointsPerTransaction, setPointsPerTransaction] = useState([]);
  const [totalPointsByCustomer, setTotalPointsByCustomer] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch().then((data) => {
      const rewardData = buildInfo(data);
      setSummaryByCustomer(rewardData.summaryByCustomer);
      setPointsPerTransaction(rewardData.pointsPerTransaction);
      setTotalPointsByCustomer(rewardData.totalPointsByCustomer);
      setTimeout(() => setIsLoading(false), 2000);
    });
  }, []);

  const getIndividualTransactions = useCallback(
    (row) => {
      console.log(row, pointsPerTransaction);
      return pointsPerTransaction?.filter((tRow) => {
        return (
          (row?.original?.custid === tRow.custid &&
            row?.original?.monthNumber === tRow.month) ||
          (row?.custid === tRow.custid && row?.monthNumber === tRow.month)
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
