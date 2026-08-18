type Props = {
  name: string;
  phone: string;
  click: () => void;
};
function UserTag(props: Props) {
  const { name, phone, click } = props;
  return (
    <div
      onClick={click}
      className="flex gap-2 items-center w-full rounded-[8px] border-[1px] border-secondary p-2 bg-secondary"
    >
      <div className="w-6 h-6 rounded-full bg-primary self-start"></div>
      <div className="flex flex-col gap-1">
        <span className="text-primary text-[13px] font-semibold">{name}</span>
        <span className="text-foreground text-[8px] ">{phone}</span>
      </div>
    </div>
  );
}

export default UserTag;
