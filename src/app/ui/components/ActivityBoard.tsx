import ActivityCard from "./ActivityCard";
import Column from "./Column";


interface RequestObj {
  name: String;
  description: String;
}
interface Props {
  activities: Array<RequestObj>;
  label: String;
}

export default function ActivityBoard(props: Props) {
  return (
<div className="indicator mb-0.5">
<span className="indicator-item indicator-top indicator-center badge badge-primary w-5/12 h-10 text-xl"> {props.label}</span>
    <Column >
      {props.activities.map((comp, key) => {
        return (
          <ActivityCard
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
