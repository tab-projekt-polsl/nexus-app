import ManagementBoard from "@/components/management/ManagementBoard";

export default function ManagementBoardPage({
  params,
}: {
  params: { employeeId: number };
}) {
  return <ManagementBoard focusOn={params.employeeId} focusItem="employee" />;
}
