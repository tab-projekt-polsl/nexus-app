import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

interface Props {
  className?: string;
  shiftAction: any;
  elementText: string;
  elementId: number;
}

export default function SequenceShifter({
  className,
  shiftAction,
  elementText,
  elementId,
}: Props) {
  return (
    <div className={"flex flex-row group/shifter " + className}>
      <form
        action={shiftAction}
        method="post"
        className="max-w-0 opacity-0 group-hover/shifter:max-w-20 group-hover/shifter:opacity-100 transition-all ease-in-out"
      >
        <input type="hidden" name="id" value={elementId} />
        <input type="hidden" name="direction" value="left" />
        <button className="btn btn-ghost" type="submit">
          <BiLeftArrow />
        </button>
      </form>
      <div className="align-middle w-max btn btn-ghost no-animation">
        {elementText}
      </div>
      <form
        action={shiftAction}
        method="post"
        className="max-w-0 opacity-0 group-hover/shifter:max-w-20 group-hover/shifter:opacity-100 transition-all ease-in-out"
      >
        <input type="hidden" name="id" value={elementId} />
        <input type="hidden" name="direction" value="right" />
        <button className="btn btn-ghost" type="submit">
          <BiRightArrow />
        </button>
      </form>
    </div>
  );
}
