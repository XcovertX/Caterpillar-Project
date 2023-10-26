"use client";

type Props = {
    label: string,
    secondary?: boolean,
    fullWidth?: boolean,
    onClick: any,
    disabled?: boolean,
    outline?: boolean,
    large?: boolean
}

const Button = ({
  label,
  secondary,
  fullWidth,
  onClick,
  disabled,
  outline,
  large,
}: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`disabled:opacity-70 disabled:hover:bg-sky-500 disabled:cursor-default rounded-full font-semibold hover:bg-sky-400 hover:text-white transition border-2 
    ${fullWidth ? "w-full" : "w-fit"}
    ${secondary ? "bg-white" : "bg-sky-500"}
    ${secondary ? "text-black" : "text-white"}
    ${secondary ? "border-black" : "border-sky-500"}
    ${large ? "text-xl" : "text-md"}
    ${large ? "px-5" : "px-4"}
    ${large ? "py-3" : "py-2"}
    ${outline ? "bg-transparent" : ""}
    ${outline ? "border-white" : ""}
    ${outline ? "text-white" : ""}
    `}
    >
      {label}
    </button>
  );
}

export default Button;