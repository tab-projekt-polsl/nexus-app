import { ModalParent } from "@/components/ModalParent";
import { EmployeeController } from "@/database/controllers/employee/employee.controller";
import { ClientController } from "@/database/controllers/client/client.controller";
import { ObjectController } from "@/database/controllers/object/object.controller";
import type { SelectedClient } from "@/database/controllers/client/client.dto";
import ClientCard from "@/components/management/client/ClientCard";
import type { SelectedEmployee } from "@/database/controllers/employee/employee.dto";
import ObjectCard from "@/components/management/object/ObjectCard";
import EmployeeCard from "@/components/management/employee/EmployeeCard";
import { AddressController } from "@/database/controllers/address/address.controller";
import ClientCreator from "@/components/management/client/ClientCreator";
import createClientAction = ClientController.createClientAction;

interface Props {
  focusOn?: number;
  focusItem?: string;
}

export default async function ManagementBoard({ focusOn, focusItem }: Props) {
  const clients = await ClientController.getClients();
  const employees = await EmployeeController.getEmployees();
  const objects = await ObjectController.getObjects();
  return (
    <div className="flex flex-row p-5 bg-base-200">
      <div className="card min-w-96 bg-base-300 shadow-xl m-5">
        <div className="card-body items-center">
          <h2 className="card-title mb-5">Clients</h2>
          <ModalParent
            buttonText="Add Client"
            className="btn btn-outline w-10/12"
          >
            <ClientCreator createAction={createClientAction} />
          </ModalParent>
          {clients.map(async (client: SelectedClient, index) => (
            <ClientCard
              className=""
              key={index}
              client={client}
              /* eslint-disable-next-line eqeqeq */
              focus={focusOn == client.id && focusItem == "client"}
              address={await AddressController.getAddressByClientId(client.id)}
            />
          ))}
        </div>
      </div>
      <div className="card min-w-96 bg-base-300 shadow-xl m-5">
        <div className="card-body items-center">
          <h2 className="card-title mb-5">Employees</h2>
          {employees.map((employee: SelectedEmployee, index) => (
            <EmployeeCard
              className=""
              key={index}
              employee={employee}
              /* eslint-disable-next-line eqeqeq */
              focus={focusOn == employee.id && focusItem == "employee"}
            />
          ))}
        </div>
      </div>
      <div className="card min-w-96 bg-base-300 shadow-xl m-5">
        <div className="card-body items-center">
          <h2 className="card-title mb-5">Objects</h2>
          {objects.map((object, index) => (
            <ObjectCard
              className=""
              key={index}
              object={object}
              /* eslint-disable-next-line eqeqeq */
              focus={focusOn == object.id && focusItem == "object"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
