
export const metadata = {
  title: 'Activites'
}
import ActivityBoard from "@/app/ui/components/ActivityBoard";
import ActivityForm from "@/app/ui/components/ActivityForm";
import MyLayout from "@/app/ui/components/containers/MyLayout";



const activites: Array<ActivitesObj> = [
  { name: "card1", description: "desc1",requestId: "reqID1" },
  { name: "card2", description: "desc2",requestId: "reqID2" },
  { name: "card3", description: "desc3",requestId: "reqID3" },
  { name: "card4", description: "desc4",requestId: "reqID4" },
  { name: "card5", description: "desc5",requestId: "reqID5" },
  { name: "card6", description: "desc6",requestId: "reqID6" },
  { name: "card7", description: "desc7",requestId: "reqID7" },
  { name: "card8", description: "desc8",requestId: "reqID8" },
];


export default function Activites()
{
return(
      <MyLayout pageTitle="Activites">
    <div className="mt-6">
      <div className="mb-8">
      <ActivityForm/>

      </div>
     <ActivityBoard activities={activites} label="Activ"/>
     <ActivityBoard activities={activites} label="Canceled"/>
    </div>
    
  </MyLayout>


);

}