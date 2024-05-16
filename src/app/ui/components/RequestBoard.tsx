import Column from "./Column";
import RequestCard from "./RequestCard";

interface RequestObj {
  name: String;
  description: String;
}
interface Props {
  requests: Array<RequestObj>;
  status: String;
}

export default function RequestBoard(props: Props) {
  return (
<div className="indicator mb-0.5 mt-3">
<span className="indicator-item indicator-top indicator-center badge badge-primary w-5/12 h-10 text-xl"> {props.status}</span>
    <Column>
      {props.requests.map((comp, key) => {
        return (
          <RequestCard
            name={comp.name}
            description={comp.description}
            key={key}
          />
        );
      })}
    </Column>
    </div>
  );
}
