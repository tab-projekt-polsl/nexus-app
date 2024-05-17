import React from "react";
import Column from "./Column";
import RequestCard from "./RequestCard";
import RequestDetails from "./RequestsDetails";

interface RequestObj {
  name: String;
  description: String;
  requestId: string;
}
interface Props {
  requests: Array<RequestObj>;
  status: String;
}

export default function RequestBoard(props: Props) {
  return (
<div className="indicator mb-0.5 mt-8">
<span className="indicator-item indicator-top indicator-center badge badge-primary w-5/12 h-10 text-xl"> {props.status}</span>
    <Column>
      {props.requests.map((comp, key) => {
        return (
          <React.Fragment key={key}>
          <RequestCard
            name={comp.name}
            description={comp.description}
            key={key}
            requestId={comp.requestId}
          />
          <RequestDetails key={key} requestId={comp.requestId}/>
        </React.Fragment>
        );
      })}
      <RequestDetails requestId="mymodal1"/>
    </Column>
    </div>
  );
}
