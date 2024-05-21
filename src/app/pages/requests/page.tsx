import RequestBoard from "@/app/ui/components/RequestBoard";
import MyLayout from "@/app/ui/components/containers/MyLayout";
import { RequestController } from "@/database/controllers/request/request.controller";
import type { SelectedRequest } from "@/database/controllers/request/request.dto";

const requests: Array<RequestObj> = [
  { name: "card1", description: "desc1",requestId: "reqID1" },
  { name: "card2", description: "desc2",requestId: "reqID2" },
];

let tablicaReq: SelectedRequest[] = [];



export default function Requests()
{
  
  RequestController.getRequests().then((requests) => {
    tablicaReq = requests.map((item) => {
      return item;
    });
  });
return( 
  <MyLayout pageTitle="Requests">
  <div>
  <RequestBoard requests={tablicaReq} status="from data base"/>
  <RequestBoard requests={requests} status="In progress"/>
  </div>
  </MyLayout>
);

}