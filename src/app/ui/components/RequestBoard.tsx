"use client"
import React, { useEffect, useState } from 'react';

import Column from "./Column";
import RequestCard from "./RequestCard";
import RequestDetails from "./RequestsDetails";
import type { SelectedRequest } from "@/database/controllers/request/request.dto";

interface Props {
  requests: Array<SelectedRequest>;
  status: String;
}

export default function RequestBoard(props: Props) {
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  useEffect(() => {
    if (props.requests.length > 0) {
      setDataLoaded(true);
    }
  }, [props.requests]);
  return (
    <div className="indicator mb-0.5 mt-8">
      <span className="indicator-item indicator-top indicator-center badge badge-primary w-5/12 h-10 text-xl">
        {props.status}
      </span>
      <Column>
        {dataLoaded ? (
          // Data was load
          props.requests.map((comp, key) => (
            <React.Fragment key={key}>
              <RequestCard
                requestId={comp.id}
                description={comp.description}
                key={key}
              />
              <RequestDetails req={comp}  />
            </React.Fragment>
          ))
        ) : (
          // Loading...
         <div><span className="loading loading-spinner loading"/></div> 
        )}   
      </Column>
    </div>
  );
}