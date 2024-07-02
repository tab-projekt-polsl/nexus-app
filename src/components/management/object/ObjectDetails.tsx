import { ObjectController } from "@/database/controllers/object/object.controller";
import Link from "next/link";
import { ClientController } from "@/database/controllers/client/client.controller";

interface Props {
  objectId: number;
}

export default async function ObjectDetails({ objectId }: Props) {
  const object = await ObjectController.getObject(objectId);
  const client = await ClientController.getClient(object.clientId);

  return (
    <div className=" bg-base-100 h-full">
      <div className="card-body h-full">
        <h2 className="card-title">O-{object.id}</h2>
        <p>{object.name}</p>
        <p>Type: {object.objectType}</p>
        <p>
          Client:{" "}
          <Link href={`/management/client/${client.id}`}>
            <div className="btn ml-2">{client.fname + " " + client.lname}</div>
          </Link>
        </p>
      </div>
    </div>
  );
}
