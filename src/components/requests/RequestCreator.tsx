import { RequestController } from "@/database/controllers/request/request.controller";
import type { CreateRequestDTO } from "@/database/controllers/request/request.dto";
import { REQUEST_STATUS_ENUM } from "@/database/controllers/request/request.dto";
import Link from "next/link";
import { ClientController } from "@/database/controllers/client/client.controller";

export default async function RequestDetails() {
  const clientList = await ClientController.getClients();
  const createRequest = async (description: string, daysToComplete: number) => {
    const dateReg = new Date();
    const dateFinCancel = new Date();
    dateFinCancel.setDate(dateFinCancel.getDate() + daysToComplete);

    const requestInfo: CreateRequestDTO = {
      description: description,
      result: false,
      status: REQUEST_STATUS_ENUM.TODO,
      dateReg: dateReg,
      dateFinCancel: dateFinCancel,
    };
    await RequestController.createRequest(requestInfo);
  };

  return (
    <div className=" bg-base-100 h-full">
      <div className="card-body h-full">
        <h2 className="card-title">New Request</h2>
        <p></p>
        <p>
          {/*{client ? "Client:" : ""}*/}
          <div className="btn ml-2">
            {/*<Link href={`/management/client/${client.id}`}>{client.name}</Link>*/}
          </div>
        </p>
        <div className="">
          {/*{activities.length > 0 ? "Activities:" : ""}*/}
          {/*{activities.map((activity, index) => (*/}
          {/*  <div key={index} className="btn ml-2">*/}
          {/*    <Link href={`/activities/board/${activity.id}`}>*/}
          {/*      A-{activity.id}*/}
          {/*    </Link>*/}
          {/*  </div>*/}
          {/*))}*/}
        </div>
      </div>
    </div>
  );
}
