import { ClientController } from "@/database/controllers/client/client.controller";
import { ObjectController } from "@/database/controllers/object/object.controller";
import type { SelectedObject } from "@/database/controllers/object/object.dto";
import Link from "next/link";

interface Props {
  clientId: number;
}

export default async function ClientDetails({ clientId }: Props) {
  const client = await ClientController.getClient(clientId);
  const objects = await ObjectController.getObjectsByClientId(clientId);
  const address = await ClientController.getAddressByClientId(clientId);
  return (
    <div className=" bg-base-100 h-full">
      <div className="card-body h-full">
        <h2 className="card-title">{client.fname + client.lname}</h2>
        <p>{client.tel}</p>
        <p>
          {address?.street +
            " " +
            address?.homeNumber +
            " " +
            address?.zipCode +
            " " +
            address?.city}
        </p>
        <div className="">
          {objects.length > 0 ? "Objects:" : ""}
          {objects.map((object: SelectedObject, index) => (
            <Link key={index} href={`/management/object/${object.id}`}>
              <div className="btn ml-2">{object.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
