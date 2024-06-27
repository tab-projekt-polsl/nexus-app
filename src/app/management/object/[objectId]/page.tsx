import ManagementBoard from "@/components/management/ManagementBoard";

export default function ManagementBoardPage({
  params,
}: {
  params: { objectId: number };
}) {
  return <ManagementBoard focusOn={params.objectId} focusItem="object" />;
}
