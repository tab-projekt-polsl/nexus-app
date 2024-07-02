
import ActivityBoard from "@/components/activities/ActivityBoard";

export default function ActivityBoardPage({
  params,
}: {
  params: { activityId: number };
}) {
  return <ActivityBoard focusOn={params.activityId} />;
}
