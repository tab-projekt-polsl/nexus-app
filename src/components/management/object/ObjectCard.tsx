import React from "react";
import type { SelectedObject } from "@/database/controllers/object/object.dto";
import { OBJECT_TYPE_ENUM } from "@/database/controllers/object/object.dto";
import { ModalParent } from "@/components/ModalParent";
import ObjectDetails from "@/components/management/object/ObjectDetails";
import ObjectUpdater from "@/components/management/object/ObjectUpdater";
import { ObjectController } from "@/database/controllers/object/object.controller";
import updateObjectAction = ObjectController.updateObjectAction;
import { ClientController } from "@/database/controllers/client/client.controller";

interface Props {
  object: SelectedObject;
  className: string;
  focus?: boolean;
}

export default async function ObjectCard({ object, className, focus }: Props) {
  return (
    <div
      className={
        "transition-all ease-in-out card w-72 bg-base-100 shadow-l hover:shadow-2xl " +
        className
      }
    >
      <div className="card-body flex-1 flex-row justify-between group">
        <div className="flex-col">
          <h2 className="card-title">O-{object.id}</h2>
          <p>{object.name}</p>
        </div>
        <ModalParent
          buttonText="Edit"
          initialState={focus}
          className="transition-all ease-in-out opacity-0 group-hover:opacity-100 text-gray-500"
        >
          <ObjectUpdater
            object={object}
            updateAction={updateObjectAction}
            types={Object.values(OBJECT_TYPE_ENUM) as string[]}
            clients={await ClientController.getClients()}
          />
        </ModalParent>
      </div>

      <div className="card-actions justify-center mb-5">
        <ModalParent
          buttonText="Details"
          className="btn btn-ghost"
          initialState={focus}
        >
          <ObjectDetails objectId={object.id} />
        </ModalParent>
      </div>
    </div>
  );
}
