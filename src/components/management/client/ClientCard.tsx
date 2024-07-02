import React from "react";
import { ModalParent } from "@/components/ModalParent";
import type { SelectedClient } from "@/database/controllers/client/client.dto";
import ClientDetails from "@/components/management/client/ClientDetails";
import ClientUpdater from "@/components/management/client/ClientUpdater";
import { ClientController } from "@/database/controllers/client/client.controller";
import updateClientAction = ClientController.updateClientAction;
import { AddressController } from "@/database/controllers/address/address.controller";

interface Props {
  client: SelectedClient;
  address: any;
  className: string;
  focus?: boolean;
}

export default async function ClientCard({
  client,
  className,
  focus,
  address,
}: Props) {
  return (
    <div
      className={
        "transition-all ease-in-out card w-72 bg-base-100 shadow-l hover:shadow-2xl " +
        className
      }
    >
      <div className="card-body flex-1 flex-row justify-between group">
        <div className="flex-col">
          <h2 className="card-title">{client.fname + " " + client.lname}</h2>
          <p className="text-gray-400">{client.tel}</p>
        </div>
        <ModalParent
          buttonText="Edit"
          className="transition-all ease-in-out opacity-0 group-hover:opacity-100 text-gray-500"
        >
          <ClientUpdater
            client={client}
            updateAction={updateClientAction}
            addressUpdateAction={
              AddressController.updateAddressByClientIdAction
            }
            address={address}
          />
        </ModalParent>
      </div>
      <div className="card-actions justify-center mb-5">
        <ModalParent
          buttonText="Details"
          className="btn btn-ghost"
          initialState={focus}
        >
          <ClientDetails clientId={client.id} />
        </ModalParent>
      </div>
    </div>
  );
}
