import ManagementBoard from "@/components/management/ManagementBoard";

export default function ManagementBoardPage({
  params,
}: {
  params: { clientId: number };
}) {
  return <ManagementBoard focusOn={params.clientId} focusItem="client" />;
}
