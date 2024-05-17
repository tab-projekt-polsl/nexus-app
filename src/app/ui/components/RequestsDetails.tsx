import ActionsTable from "./ActionsTable";

export default function RequestDetails({
  requestId
}:{
  requestId: string
})
{
  return(
<dialog id={requestId} className="modal">
  <div className="modal-box overflow-y-auto w-11/12 max-w-5xl">
    <h3 className="font-bold text-lg">Request: {requestId} details</h3>
    <p>Description:</p>
    <p>Start Date:</p>
    <p>Actions:</p>
    <ActionsTable/>
    <p className="py-4">Press ESC key or click outside to close</p>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
  );
}





