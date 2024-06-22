"use client";
interface Props {
  href: string;
  buttonText: string;
  className: string;
}

export default function InnerButton({ href, buttonText, className }: Props) {
  return (
    <div
      className={"btn" + className}
      onClick={() => {
        window.location.href = href;
      }}
    >
      {buttonText}
    </div>
  );
}
