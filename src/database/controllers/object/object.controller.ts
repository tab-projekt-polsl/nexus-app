// Makes me do a module and then doesn't like the module either >:(

import DbObject from "@/database/models/object";
import type { CreateObjectDTO, SelectedObject } from "./object.dto";
import { OBJECT_FIELDS } from "./object.dto";
import { revalidatePath } from "next/cache";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ObjectController {
  export async function createObject(
    objectInfo: CreateObjectDTO,
  ): Promise<DbObject> {
    if (!objectInfo) {
      throw new Error("Object info is required");
    }
    return DbObject.create({
      name: objectInfo.name,
      objType: objectInfo.objectType,
      clientId: objectInfo.clientId,
    });
  }

  export async function updateObject(
    id: number,
    field: any,
    value: any,
  ): Promise<[affectedCount: number]> {
    "use server";
    return DbObject.update(
      { [field]: value },
      {
        where: {
          id,
        },
      },
    );
  }

  export async function updateObjectAction(formData: FormData) {
    "use server";
    const fields = Object.values(OBJECT_FIELDS) as string[];
    for (const field of fields) {
      if (formData.has(field)) {
        await updateObject(
          parseInt(formData.get("id") as string, 10),
          field,
          formData.get(field),
        );
      }
    }
    revalidatePath(`/management`);
  }
  /**
   *
   * @param id id to delete
   * @returns number of affected rows
   */
  export function deleteObject(id: number): Promise<number> {
    return DbObject.destroy({
      where: {
        id,
      },
    });
  }

  export function obliterate(): void {
    DbObject.destroy({
      where: {},
    });
  }

  /**
   * @example
   * ObjectController.getObject(2).then((activities) => {
   * console.log(activities);
   * });
   * @param id id to select by
   * @returns found object
   */
  export async function getObject(id: number): Promise<SelectedObject> {
    const object = await DbObject.findOne({
      where: {
        id: id,
      },
    });
    if (!object) {
      throw new Error("Object not found");
    }
    return object.toJSON();
  }

  /**
   * @example
   * ObjectController.getActivies().then((activities) => {
   * console.log(activities);
   * });
   *
   * @returns found activities
   */
  export async function getObjects(): Promise<any[]> {
    return (await DbObject.findAll()).map((object) => object.toJSON());
  }

  /**
   * @example
   * ObjectController.getObjectsByClientId(2).then((objects) => {
   * console.log(objects);
   * });
   *
   * @param clientId id to select by
   * @returns found objects
   */
  export async function getObjectsByClientId(clientId: number): Promise<any[]> {
    return (
      await DbObject.findAll({
        where: {
          clientId: clientId,
        },
      })
    ).map((object) => object.toJSON());
  }

  // get objects by request id
}
