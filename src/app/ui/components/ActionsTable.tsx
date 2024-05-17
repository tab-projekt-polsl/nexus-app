export default function ActionsTable()
{
  return(
    <div className="overflow-x-auto">
      <div className="flex items-center gap-3">
        <div className="font-bold">Set selected to:</div>
        <button className="btn btn-xs">Finished</button>
        <button className="btn btn-xs">Canceled</button>
        <button className="btn btn-xs">Active</button>
      </div>
      
      <table className="table">
      <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Id</th>
        <th>Name</th>
        <th>Register Date</th>
        <th>Status</th>
        <th>End Date</th>
        <th/>
        <th />
      </tr>
    </thead>
    <tbody>
      {/* rows */}
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
              <div className="font-bold">123</div>
          </div>
        </td>
        <td>Action name</td>
        <td>10.10.2010</td>
        <td className="font-bold">Active</td>
        <td>-</td>
        <th>
          <button className="btn btn-xs font-bold">details</button>
        </th>
      </tr>
      </tbody>
      </table>
    </div>
  );
}