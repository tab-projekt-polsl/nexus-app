interface Props {
  name: String;
  description: String;
}

export default function ActivityCard(props: Props) {
  return (
    <div className="card  w-11/12  bg-base-100 shadow-xl mt-3 ml-auto mr-auto ">     
      <div className="card-body">
        <h2 className="card-title">{props.name}</h2>
        <p>{props.description}</p>
        <div className="card-actions justify-end">
      <button className="btn btn-primary">Show details</button>
    </div>
      </div>
    </div>
  );
}
