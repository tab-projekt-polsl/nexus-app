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

    <div className="rounded-lg artboard phone-5 bg-base-200 overflow-auto mt-6">
      {children}
    </div>
 
  );
}
