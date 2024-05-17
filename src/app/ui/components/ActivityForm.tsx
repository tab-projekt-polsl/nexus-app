export default function ActivityForm()
{
  return(
<div className=" collapse bg-red-200 w-5/12">
  <input type="checkbox" /> 
  <div className=" collapse-title text-xl font-medium">
    Add new Activity
  </div>
  <div className="collapse-content"> 

<form className="flex flex-col space-y-4 my-4">
  <label className="input input-bordered flex items-center gap-2">
  Description
  <input type="text" className="grow" placeholder="Daisy" />
</label>
<label className="input input-bordered flex items-center gap-2">
  Result
  <input type="text" className="grow" placeholder="Daisy" />
</label>
<label className="input input-bordered flex items-center gap-2">
  Name
  <input type="text" className="grow" placeholder="Daisy" />
</label>
<select className="select select-bordered w-full max-w-xs">
  <option disabled selected>Status</option>
  <option>Status 1</option>
  <option>Status 2</option>
</select>

</form>
  </div>
</div>
  );
}


