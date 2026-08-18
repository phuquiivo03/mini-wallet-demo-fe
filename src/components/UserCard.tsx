"use client";

import { FormEvent, useMemo, useState } from "react";
import { User } from "@/lib/types";

type UserCardProps = {
  user: User;
  allUsers: User[];
  balanceLabel: string;
  transferStatus: string;
  onTransfer: (input: { fromUserId: string; toUserId: string; amount: number; message: string }) => Promise<void>;
};

export default function UserCard({
  user,
  allUsers,
  balanceLabel,
  transferStatus,
  onTransfer,
}: UserCardProps) {
  const receivers = useMemo(() => allUsers.filter((candidate) => candidate.id !== user.id), [allUsers, user.id]);
  const [toUserId, setToUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const parsedAmount = Number(amount);
    if (!toUserId || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Select receiver and enter valid amount.");
      return;
    }

    try {
      setIsSubmitting(true);
      await onTransfer({
        fromUserId: user.id,
        toUserId,
        amount: parsedAmount,
        message,
      });
      setAmount("");
      setMessage("");
    } catch (submissionError) {
      const text = submissionError instanceof Error ? submissionError.message : "Transfer failed";
      setError(text);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <article className="user-card">
      <header className="user-card__header">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </header>

      <p className="user-card__balance">{balanceLabel}</p>

      <form className="transfer-form" onSubmit={handleSubmit}>
        <label>
          To
          <select value={toUserId} onChange={(event) => setToUserId(event.target.value)} required>
            <option value="">Select user</option>
            {receivers.map((receiver) => (
              <option key={receiver.id} value={receiver.id}>
                {receiver.name} ({receiver.id})
              </option>
            ))}
          </select>
        </label>

        <label>
          Amount
          <input
            type="number"
            min="1"
            step="1"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="1000"
            required
          />
        </label>

        <label>
          Message
          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Optional note"
          />
        </label>

        <button type="submit" disabled={isSubmitting || receivers.length === 0}>
          {isSubmitting ? (
            <span className="button-content">
              Send
              <span className="spinner" aria-hidden="true" />
            </span>
          ) : (
            "Send"
          )}
        </button>
      </form>

      {transferStatus ? <p className="status">{transferStatus}</p> : null}
      {error ? <p className="error">{error}</p> : null}
    </article>
  );
}
