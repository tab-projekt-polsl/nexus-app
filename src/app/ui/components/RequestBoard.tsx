import Column from "./Column";
import RequestCard from "./RequestCard";

interface RequestObj {
  name: String;
  description: String;
}
interface Props {
  requests: Array<RequestObj>;
}

export default function RequestBoard(props: Props) {
  return (
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
  );
}
