"use client";
import { useEffect, useState } from "react";
import { Input } from "./input";
import { findManyByPhone, getBalance } from "@/lib/api";
import { Authen, User } from "@/lib/types";
import Popup from "./popup";
import UserTag from "./userTag";
import TransferForm from "./transferForm";
import { useAppSelector } from "@/store/hook";
import { useDispatch } from "react-redux";
import { setTransferState } from "@/features/transfer/transferSlice";
import Notification from "./notification";
import History from "./history";

function AppContent() {
  const [phone, setPhone] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [receiver, setReceiver] = useState<User>();
  const [balance, setBalance] = useState<number>(0);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  if (!user) return;
  const transferState = useAppSelector((state) => state.transfer.transferState);
  useEffect(() => {
    if (phone.length != 10) {
      setUsers([]);
      return;
    }
    findManyByPhone(phone).then((data) => {
      if (data.users) {
        setUsers(data.users);
      }
    });
  }, [phone]);

  useEffect(() => {
    if (!user) return;

    // fetch balance
    getBalance(user.account?.id as string).then((data) => {
      setBalance(data.balance);
    });
    console.log("refesh balance", transferState);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    if (transferState == "done") {
    }
    if (transferState == "done") {
      getBalance(user.account?.id as string).then((data) => {
        setBalance(data.balance);
      });
      dispatch(setTransferState("idle"));
      return;
    }
  }, [transferState]);
  return !user ? null : (
    <div className="p-4 relative">
      <Notification className="absolute left-0 top-0 z-999" />
      <div className="bg-transparent relative">
        <div className="p-2 border-b border-secondary mb-6!">
          <span className="text-[13px] text-foreground font-semibold block">
            {user.name}
          </span>
          <span className="text-[10px] text-foreground font-semibold">
            {balance}
          </span>{" "}
          <span className="text-[10px] text-primary font-semibold">VND</span>
        </div>
        <span className="text-primary font-bold text-[13px]">Transfer</span>
        <Input
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          className="bg-white p-1 pl-4 rounded-[8px] text-[16px] outline-0 active:bg-success active:outline-none text-black font-semibold focus-visible:outline-none"
        />
        <Popup
          className="absolute top-[106%] w-full p-2 border-secondary border-[1px] gap-2"
          show={users.length > 0}
        >
          {users.map((user, index) => {
            return (
              <UserTag
                key={index}
                click={() => {
                  setReceiver(user);
                  setPhone("");
                }}
                name={user.name}
                phone={user.phoneNumber}
              />
            );
          })}
        </Popup>
      </div>
      {receiver && <TransferForm receiver={receiver} />}
      <div className="mt-4!">
        <span className="text-foreground font-semibold  text-[13px]">
          Contact
        </span>
        <div className="min-h-20 rounded-[8px] border-secondary-foreground w-full border-[1px] mt-2!"></div>
      </div>
      <History></History>
    </div>
  );
}

export default AppContent;
