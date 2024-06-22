import RequestBoard from "@/components/requests/RequestBoard";

export default function RequestBoardPage({
  params,
}: {
  params: { requestId: number };
}) {
  return <RequestBoard focusOn={params.requestId} />;
}
