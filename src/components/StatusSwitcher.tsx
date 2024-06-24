"use client";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

interface Props {
  array: any;
  item: any;
  updateAction: any;
  direction: boolean; // false for left, true for right
  className?: string;
}
export default function StatusSwitcher({
  array,
  item,
  updateAction,
  direction,
  className,
}: Props) {
  const newStatus =
    array.indexOf(item.status) > 0 && !direction
      ? array[array.indexOf(item.status) - 1]
      : array.indexOf(item.status) < array.length - 1 && direction
        ? array[array.indexOf(item.status) + 1]
        : item.status;

  return (
    <form action={updateAction}>
      <input type="hidden" name="id" value={item.id} />
      <input type="hidden" name="field" value="status" />
      <input type="hidden" name="value" value={newStatus} />
      <button className={"btn " + className} type="submit">
        {direction ? <BsArrowRight /> : <BsArrowLeft />}
      </button>
    </form>
  );
}
