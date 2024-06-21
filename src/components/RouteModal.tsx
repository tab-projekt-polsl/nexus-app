"use client";
import React, { createElement, useEffect, useRef, useState } from "react";

interface Props {
  className: string;
  route: string;
  buttonText: string;
}

export function RouteModal({ className, route, buttonText }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [visible, setVisible] = useState(false);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    if (!modalRef.current) {
      return;
    }
    visible ? modalRef.current.showModal() : modalRef.current.close();

    console.log("modalRef.current", modalRef.current);
  }, [visible]);

  const onModalClose = () => {
    if (!modalRef.current) {
      return;
    }
    setVisible(false);
    setShowIframe(false);
  };

  const toggleModal = () => {
    setVisible(!visible);
    setShowIframe(!showIframe);
  };

  return (
    <>
      <button className={className} onClick={toggleModal.bind(null)}>
        {buttonText}
      </button>
      <dialog ref={modalRef} className="modal min-h-60">
        <div className="modal-box">
          {showIframe && (
            // eslint-disable-next-line react/iframe-missing-sandbox
            <iframe
              src={route}
              sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-modals allow-top-navigation-by-user-activation"
              allowFullScreen={true}
              className="modal-content w-full min-h-72 h-full"
            />
          )}
        </div>

        <form method="dialog" className="modal-backdrop">
          <button onClick={onModalClose}>close</button>
        </form>
      </dialog>
    </>
  );
}
