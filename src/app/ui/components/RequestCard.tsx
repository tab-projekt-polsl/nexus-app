'use client'
interface Props {
  description: String;
  requestId: number;
}

export default function RequestCard(props: Props) {
 
  return (
    <div className="card  w-11/12  bg-base-100 shadow-xl mt-3 ml-auto mr-auto ">     
      <div className="card-body">
        <h2 className="card-title">{props.requestId}</h2>
        <p>{props.description}</p>
        <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={()=>document.getElementById(props.requestId).showModal()}>Show details</button>
    </div>
      </div>
    </div>
  );
}
