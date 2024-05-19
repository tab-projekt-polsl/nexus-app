// Makes me do a module and then doesn't like the module either >:(

import DbObject from "@/database/models/object";
import type { CreateObjectDTO, SelectedObject } from "./object.dto";

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

  export function updateObject(): void {
    console.log("Updating activity");
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
  export function getObject(id: number): Promise<SelectedObject> {
    return DbObject.findOne({
      where: {
        id: id,
      },
    }).then((activity) => {
      if (!activity) {
        throw new Error("Object not found");
      }
      return activity.toJSON();
    });
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
}
