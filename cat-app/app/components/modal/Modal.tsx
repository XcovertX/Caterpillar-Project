"use client";
import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../Button";

type Props = {
  isOpen: boolean;
  onClose: any;
  onSubmit: any;
  title: string;
  body: JSX.Element;
  actionLabel: string;
  footer: JSX.Element;
  disabled: boolean;
}

function Modal({ isOpen, onClose, onSubmit, title, body, actionLabel, footer, disabled }: Props) {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    onClose();
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [onSubmit, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
    <div
      className="
        justify-center 
        items-center 
        flex 
        overflow-x-hidden 
        overflow-y-auto 
        fixed 
        inset-0 
        z-50 
        outline-none 
        focus:outline-none
        bg-neutral-800
        bg-opacity-70
      "
    >
      <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
        {/*content*/}
        <div className="
          h-full
          lg:h-auto
          border-0 
          rounded-lg 
          shadow-lg 
          relative 
          flex 
          flex-col 
          w-full 
          bg-black 
          outline-none 
          focus:outline-none
          "
        >
          {/*header*/}
          <div className="
            flex 
            items-center 
            justify-between 
            px-10
            pt-10
            mx-2
            rounded-t
            "
          >
            <h3 className="text-3xl font-semibold text-white">
              {title}
            </h3>
            <button
              className="
                p-1 
                ml-auto
                border-0 
                text-white
                hover:text-sky-500
                transition
              "
              onClick={handleClose}
            >
              <AiOutlineClose size={20} />
            </button>
          </div>
          {/*body*/}
          <div className="relative p-10 flex-auto">
            {body}
          </div>
          {/*footer*/}
          <div className="flex flex-col gap-2 px-10 pb-10">
            <Button disabled={disabled} label={actionLabel} secondary fullWidth large onClick={handleSubmit} />
            {footer}
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default Modal;