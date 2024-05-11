import React from "react";

interface Props {
  title: String;
}

export default function Column(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>,
  props: Props,
) {
  return (
    <div className="artboard phone-6 bg-base-200">
      {children}
    </div>
  );
}
