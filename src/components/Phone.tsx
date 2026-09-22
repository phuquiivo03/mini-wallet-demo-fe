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
export default function PhoneScreen({ index }: { index: number }) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return (
    <div
      className={
        "rounded-[23px]] relative  w-[272px]  h-[570px] p-5 rounded-[28px]   border-[1px] border-[#ece6e8]"
      }
    >
      <div className="device-card-head">
        <span className="device-name">Device {index + 1}</span>
        <span className="device-status">
          <span className="dot animate-pulse"></span>Online (Socket)
        </span>
      </div>
      <div className="w-full absolute left-0 top-16 flex justify-center">
        <div className=" w-[36%] h-[18px] rounded-t-none rounded-[12px] z-100 bg-[#000] "></div>
      </div>
      <div className="w-full h-[451px] rounded-[32px] border-black justify-center border-[10px]   flex  flex-col relative bg-[#fff7e6] overflow-x-hidden">
        <div className="overflow-auto">
          {!isAuthenticated ? <LoginForm></LoginForm> : <AppContent />}
        </div>
      </div>
      <div className="device-card-foot">
        <button type="button">Remove</button>
      </div>
    </div>
  );
}
