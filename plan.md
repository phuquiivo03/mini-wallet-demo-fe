## Purpose

This proect use to test transaction flow

## Techstack

Nextjs

## Screens -features

### Accoutns managements screen

- An UI enable user to login and manage account (multi accounts in a screen), each user will be in a card

## Components

- UserCard:
  - show user.name, user.email, and balance (fetch /accounts/user.account.id/balance)
  - A small transfer form: to (selection for all existing users), amount, message and send button.

## Flow

- AccountManagement screen -> Add accounts: There are "+"icon to add new account, in the first step, just take userid and save to authen for a user. (after input userId and click "login" button -> fetch api to get user info and show to card (/users/id))
- Transfer: create transaction in usercard using Transfer endpoint -> receive job data -> get /jobs/jobId to get status to display in ui. When status is complete -> re fetch receiver and senders balance

## Env

backendUrl = localhost:3000

## Rule

- all data from server will be return in { data: Data} format
- Transfer endpoint: `curl --location 'http://localhost:3000/transactions' \
--header 'Content-Type: application/json' \
--data '{
    "fromUserId": string,
    "toUserId": string,
    "amount": number,
    "currency": "VND",
    "message": string
}'`

## DTOs - consts

Job = {
id: string;
data: any;
action: MQActions;
status: JobStatus;
createdAt: Date;
updatedAt: Date;
}
TransactionStatus = {
PENDING: "pending",
COMPLETED: "completed",
FAILED: "failed",
};
