import {
  Authen,
  Balance,
  Job,
  Tranasction,
  TransferPayload,
  User,
} from "@/lib/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3000";

type ApiEnvelope<T> = {
  data: T;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  const body = (await response.json()) as ApiEnvelope<T>;
  return body.data;
}

export function getUser(userId: string): Promise<User> {
  return request<User>(`/users/${userId}`);
}

export function getBalance(accountId: string): Promise<Balance> {
  return request<Balance>(`/accounts/${accountId}/balance`);
}

export function createTransaction(payload: TransferPayload): Promise<Job> {
  return request<Job>("/transactions", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getJob(jobId: string): Promise<Job> {
  return request<Job>(`/jobs/${jobId}`);
}

export function login(phone: string, password: string) {
  const body = { phoneNumber: phone, password };
  return request<Authen>("/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function findManyByPhone(phone: string) {
  return request<{
    users: User[];
  }>(`/users?options={"where": {"phoneNumber": "${phone}"}}`);
}

export function getUserTransactions(
  page: number,
  limit: number,
  authenToken: string,
) {
  return request<Tranasction[]>(
    `/transactions/users?options={"page":${page}, "limit": ${limit}}`,
    {
      headers: {
        "x-token": authenToken,
      },
    },
  );
}
