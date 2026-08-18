"use client";
import { Authen, User } from "@/lib/types";
import InputField from "../inputField";
import UserTag from "./userTag";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { createTransaction, getJob } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setTransferState } from "@/features/transfer/transferSlice";
const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
function TransferForm({ receiver }: { receiver: User }) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  if (!user) return;
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const transferState = useAppSelector((state) => state.transfer.transferState);
  async function handleTransfer({
    fromUserId,
    toUserId,
    amount,
    message,
  }: {
    fromUserId: string;
    toUserId: string;
    amount: number;
    message: string;
  }) {
    dispatch(setTransferState("processing"));
    const job = await createTransaction({
      fromUserId,
      toUserId,
      amount,
      currency: "VND",
      message,
    });

    for (let attempt = 0; attempt < 30; attempt += 1) {
      if (!user) return;
      const freshJob = await getJob(job.id);

      if (freshJob.status === "completed") {
        //
        console.log("set complete");
        dispatch(setTransferState("done"));
        return;
      }

      if (freshJob.status === "failed") {
        throw new Error("Transfer failed.");
      }

      await delay(2000);
    }

    throw new Error("Job polling timeout.");
  }

  return (
    <div className="mt-4!">
      <div className="min-h-20 rounded-[8px] border-secondary-foreground w-full border-[1px] mt-2! p-2 flex flex-col gap-2">
        <UserTag
          click={() => {}}
          name={receiver.name}
          phone={receiver.phoneNumber}
        />
        <InputField
          className="flex flex-row"
          id={""}
          label="Amount"
          type="number"
          placeholder="Amount"
          onChange={(e) => {
            setAmount(parseInt(e.target.value));
          }}
          value={`${amount}`}
        ></InputField>
        <InputField
          className=""
          id={""}
          label="Message"
          type="text"
          placeholder="Amount"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message as string}
        ></InputField>
        <Button
          onClick={() => {
            handleTransfer({
              fromUserId: user.id,
              toUserId: receiver.id,
              amount: amount,
              message: message,
            });
          }}
          className={"hover:opacity-100 opacity-90"}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default TransferForm;
