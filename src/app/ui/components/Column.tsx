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

    <div className="rounded-lg artboard phone-2 bg-slate-200 overflow-auto  m-8">
      {children}
    </div>
 
  );
}
