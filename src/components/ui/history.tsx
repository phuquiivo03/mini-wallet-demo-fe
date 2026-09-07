"use client";
import { Tranasction } from "@/lib/types";
import { useEffect, useState } from "react";
import TransactionHistoryItem from "./transactionHistoryItem";
import { useAppSelector } from "@/store/hook";

function History() {
  const [transactions, setTransactions] = useState<Tranasction[]>([]);
  const authToken = useAppSelector((state) => state.auth.authToken);
  useEffect(() => {
    if (!authToken) return;
    fetch(`/api/transaction/user/${authToken}`)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
      });
  }, [authToken]);
  const fomatByDate = (transactions: Tranasction[]) => {
    const formatedDate = transactions.map((tsx) => {
      return {
        ...tsx,
        createdAt: new Date(tsx.createdAt),
      };
    });
    return Object.values(
      formatedDate.reduce<Record<string, Tranasction[]>>(
        (current: Record<string, Tranasction[]>, tx: Tranasction) => {
          (current[(tx.createdAt as Date).toDateString()] ??= []).push(tx);
          return current;
        },
        {},
      ),
    );
  };
  return (
    <div className="mt-4!">
      <span className="text-foreground font-semibold  text-[13px]">
        History
      </span>
      <div className="min-h-20 rounded-[8px] border-secondary-foreground w-full border-[1px] mt-2!">
        {fomatByDate(transactions).map((group, index) => {
          return (
            <div key={index} className="p-2 bg-mute rounded-[8px]">
              <span className="text-foreground text-[13px] font-bold mb-2! border-b-[1px] border-primary w-full block pb-2">
                {(group[0].createdAt as Date).toLocaleDateString()}
              </span>
              {group.map((tsx, index) => {
                return <TransactionHistoryItem key={index} transaction={tsx} />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default History;
