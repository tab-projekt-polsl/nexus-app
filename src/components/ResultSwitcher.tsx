"use client";
import { BsCheckCircleFill, BsClockFill } from "react-icons/bs";

interface Props {
  item: any;
  updateAction: any;
  className?: string;
}
export default function ResultSwitcher({
  item,
  updateAction,
  className,
}: Props) {
  const newValue = item.result ? 0 : 1;
  return (
    <form action={updateAction}>
      <input type="hidden" name="id" value={item.id} />
      <input type="hidden" name="field" value="result" />
      <input type="hidden" name="value" value={newValue} />
      <div className="self-center flex-wrap">
        <button className={"btn " + className} type="submit">
          {item.result ? (
            <BsCheckCircleFill className="fill-green-600" />
          ) : (
            <BsClockFill className="fill-slate-600" />
          )}
        </button>
      </div>
    </form>
  );
}
