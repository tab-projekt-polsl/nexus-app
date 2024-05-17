
export const metadata = {
  title: 'Requests'
}
import RequestBoard from "@/app/ui/components/RequestBoard";
import MyLayout from "@/app/ui/components/containers/MyLayout";
const requests: Array<RequestObj> = [
  { name: "card1", description: "desc1",requestId: "reqID1" },
  { name: "card2", description: "desc2",requestId: "reqID2" },
  { name: "card3", description: "desc3",requestId: "reqID3" },
  { name: "card4", description: "desc4",requestId: "reqID4" },
  { name: "card5", description: "desc5",requestId: "reqID5" },
  { name: "card6", description: "desc6",requestId: "reqID6" },
  { name: "card7", description: "desc7",requestId: "reqID7" },
  { name: "card8", description: "desc8",requestId: "reqID8" },
];


export default function Requests()
{
return(
  
  <MyLayout pageTitle="Requests">
  <div>
     <RequestBoard requests={requests} status="In progress"/>
     <RequestBoard requests={requests} status="In progress"/>
  </div>
  </MyLayout>
 
 
);

}