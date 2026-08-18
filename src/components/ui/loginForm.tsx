import { useEffect, useState } from "react";
import InputField from "../inputField";
import { login } from "@/lib/api";
import { useLocalStorage } from "@/hooks/useLocalstorage";
import { setAuthToken, setUser } from "@/features/auth/authSlices";
import { useAppDispatch, useAppSelector } from "@/store/hook";

function LoginForm() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState<{
    phone: string;
    password: string;
  }>({ phone: "", password: "" });
  const { keys, set, get } = useLocalStorage();
  const handleSubmit = () => {
    setLoading(true);
    console.log("authen ", loginData.phone, loginData.password);
    login(loginData.phone, loginData.password)
      .then((data) => {
        setLoading(false);
        console.log("set login data: ", data);
        dispatch(setUser(data));
        dispatch(setAuthToken(data.authenToken));
        set(keys.auth.authToken, data.authenToken);
        set(keys.auth.refeshToken, data.refeshToken);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  return (
    <div className="h-[100%] flex items-center">
      <div className="flex items-center p-10 flex-col justify-center border-[1px] rounded-2xl border-amber-100 bg-secondary">
        <span className="text-center text-primary font-bold text-xl block mb-10!">
          Login
        </span>
        <div className=" flex flex-col gap-4">
          <InputField
            type="text"
            id={"phone"}
            placeholder="Type phone number"
            className=" p-1 pl-4 rounded-[8px] text-[16px] outline-0 "
            onChange={(e) => {
              setLoginData({ ...loginData, phone: e.target.value });
            }}
            label="Phone number"
            value={loginData.phone}
          />
          <InputField
            type="password"
            id={"password"}
            label="Password"
            className="p-1 pl-4 rounded-[8px] text-[16px] outline-0 active:bg-success"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => {
              setLoginData({ ...loginData, password: e.target.value });
            }}
          />
          <button
            onClick={handleSubmit}
            className="rounded-2xl text-white bg-secondary font-bold cursor-pointer hover:opacity-70 mt-4!  relative"
          >
            Login
            {loading && (
              <div className="w-3 h-3 border border-[1px] border-amber-200 animate-spin absolute top-[30%] right-[20px]"></div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
