import { createTransaction, getJob } from "@/lib/api";
import { useState } from "react";

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
function useTransfer() {
  const [transferStatuses, setTransferStatuses] = useState<
    Record<string, string>
  >({});
  const transfer = async ({
    fromUserId,
    toUserId,
    amount,
    message,
  }: {
    fromUserId: string;
    toUserId: string;
    amount: number;
    message: string;
  }) => {
    const job = await createTransaction({
      fromUserId,
      toUserId,
      amount,
      currency: "VND",
      message,
    });

    for (let attempt = 0; attempt < 30; attempt += 1) {
      const freshJob = await getJob(job.id);
      setTransferStatuses((current) => ({
        ...current,
        [job.id]: `Transfer status: ${freshJob.status}`,
      }));

      if (freshJob.status === "failed") {
        throw new Error("Transfer failed.");
      }
      if (freshJob.status === "completed") {
        return freshJob;
      }
      if (attempt < 29) {
        await delay(2000);
      }
    }

    throw new Error("Job polling timeout.");
  };
  return { transferStatuses, transfer };
}

export default useTransfer;
