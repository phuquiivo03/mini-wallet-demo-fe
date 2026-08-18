import React from "react";

type Props = {
  show: boolean;
  children: React.ReactNode;
  className: string;
};
function Popup(props: Props) {
  return props.show ? (
    <div
      className={`${props.className} rounded-[8px] bg-white transition-all duration-300 ease-in shadow-2xl`}
    >
      {props.children}
    </div>
  ) : (
    <></>
  );
}

export default Popup;
