import { Input } from "@base-ui/react/input";
import { Field, FieldContent } from "./ui/field";
import { Label } from "./ui/label";

interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  className?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  className,
  ...props
}: InputFieldProps) {
  return (
    <Field className={className}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        className={
          "bg-white active:bg-[#f9f9f9] p-1 pl-4 rounded-[8px] text-[16px] outline-0 active:bg-success active:outline-none text-black font-semibold focus-visible:outline-none"
        }
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </Field>
  );
}
