import ActionsTable from "./ActionsTable";
import type { SelectedRequest } from "@/database/controllers/request/request.dto";

interface Props{
req: SelectedRequest
}

export default function RequestDetails(props: Props){
  return(
    <dialog id={`${props.req.id}`} className="modal">
      <div className="modal-box overflow-y-auto w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">Request {props.req.id} details</h3>
        <p>Description: {props.req.description}</p>
        <p>Start Date:{`${props.req.dateReg}`}</p>
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




