"use client";

import LoginForm from "./ui/loginForm";
import AppContent from "./ui/appContent";
import { useAppSelector } from "@/store/hook";
const iphoneCaseColors = [
  "#F5E6D3",
  "#F77E2D",
  "#091318",
  "#B3CEE5",
  "#6D6348",
];
export default function PhoneScreen() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const borderColor = Math.floor(Math.random() * 5);
  return (
    <div
      style={{
        borderColor: iphoneCaseColors[borderColor],
      }}
      className={"rounded-[23px] border-[4px] "}
    >
      <div className="w-[336px] h-[675px] rounded-2xl border-black justify-center border-[6px] p-5  flex relative bg-[#fff7e6] overflow-x-hidden">
        <div className="w-full absolute left-0 top-0 flex justify-center">
          <div className=" w-[36%] h-[18px] rounded-t-none rounded-[4px] bg-[#000] "></div>
        </div>
        {!isAuthenticated ? <LoginForm></LoginForm> : <AppContent />}
      </div>
    </div>
  );
}
