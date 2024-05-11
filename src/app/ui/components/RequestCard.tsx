interface Props {
  name: String;
  description: String;
}

export default function RequestCard(props: Props) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{props.name}</h2>
        <p>{props.description}</p>
      </div>
    </div>
  );
}
