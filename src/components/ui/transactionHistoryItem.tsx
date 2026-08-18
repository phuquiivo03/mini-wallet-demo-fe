"use client";
import { Tranasction } from "@/lib/types";

type Props = {
  transaction: Tranasction;
};
function TransactionHistoryItem(props: Props) {
  const transaction = props.transaction;
  const isCredit = transaction.role == "receiver";

  return (
    <div className="w-full  flex  p-2 justify-between border-b-[1px] border-secondary">
      <div className="flex flex-col  min-w-0">
        <span className="text-foreground font-semibold text-[13px] ">
          {transaction.transactionId.substring(0, 14)}...
        </span>
        <span className="text-foreground text-foreground text-[13px]">
          {transaction.transactionId.substring(0, 14)}...
        </span>
      </div>
      <div className=" flex flex-col items-end">
        <span
          style={{
            color: isCredit ? "#5EA12A" : "#E5303F",
          }}
          className="font-semibold text-[13px]"
        >
          {isCredit ? "+" : ""}
          {transaction.amount}
        </span>
        <span className="text-foreground text-[10px]">
          {(transaction.createdAt as Date).toLocaleTimeString() || ""}
        </span>
      </div>
    </div>
  );
}

export default TransactionHistoryItem;
