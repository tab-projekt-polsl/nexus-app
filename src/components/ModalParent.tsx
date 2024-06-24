"use client";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  className: string;
  buttonText: string;
  children: React.ReactNode;
  initialState?: boolean;
}

export function ModalParent({
  className,
  children,
  buttonText,
  initialState,
}: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [visible, setVisible] = useState(initialState);
  const [showChildren, setShowChildren] = useState(initialState);

  useEffect(() => {
    if (!modalRef.current) {
      return;
    }
    visible ? modalRef.current.showModal() : modalRef.current.close();
  }, [visible]);

  const onModalClose = () => {
    if (!modalRef.current) {
      return;
    }
    setVisible(false);
    setShowChildren(false);
  };

  const toggleModal = () => {
    setVisible(!visible);
    setShowChildren(!showChildren);
  };

  return (
    <>
      <button className={className} onClick={toggleModal.bind(null)}>
        {buttonText}
      </button>
      <dialog ref={modalRef} className="modal min-h-60 z-50">
        <div className="modal-box">{showChildren && children}</div>

        <form method="dialog" className="modal-backdrop">
          <button onClick={onModalClose}>close</button>
        </form>
      </dialog>
    </>
  );
}
