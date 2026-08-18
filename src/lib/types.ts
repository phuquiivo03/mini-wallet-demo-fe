export type Account = {
  id: string;
};

export type User = {
  id: string;
  name: string;
  email?: string;
  account?: Account;
  phoneNumber: string;
};

export type Balance = {
  balance: number;
  currency?: string;
};

export type JobStatus = "pending" | "completed" | "failed";

export type Job<T = unknown> = {
  id: string;
  data: T;
  action: string;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
};

export type TransferPayload = {
  fromUserId: string;
  toUserId: string;
  amount: number;
  currency: "VND";
  message: string;
};

export type Authen = {
  id: string;
  name: string;
  phoneNumber: string;
  account?: Account;
  authenToken: string;
  refeshToken: string;
};

export type Tranasction = {
  transactionId: string;
  amount: string;
  role: "sender" | "receiver";
  createdAt: string | Date;
};
