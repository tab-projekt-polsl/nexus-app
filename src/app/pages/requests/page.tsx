import RequestBoard from "@/app/ui/components/RequestBoard";
import MyLayout from "@/app/ui/components/containers/MyLayout";
const requests: Array<RequestObj> = [
  { name: "card1", description: "desc1" },
  { name: "card2", description: "desc2" },
  { name: "card3", description: "desc3" },
  { name: "card4", description: "desc4" },
  { name: "card5", description: "desc5" },
  { name: "card6", description: "desc6" },
  { name: "card7", description: "desc7" },
  { name: "card8", description: "desc8" },
];


export default function Requests()
{
return(
  
  <MyLayout pageTitle="Requests">
  <div>
     <RequestBoard requests={requests} status="In progress"/>
     <RequestBoard requests={requests} status="Done"/>
     <RequestBoard requests={requests} status="Canceled"/>
  </div>
  </MyLayout>
 
 
);

}