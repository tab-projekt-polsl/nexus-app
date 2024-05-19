export enum OBJECT_TYPE_ENUM {
  OBJ1 = "OBJ1",
  OBJ2 = "OBJ2",
  OBJ3 = "OBJ3",
}

export interface CreateObjectDTO {
  name: string;
  objectType: OBJECT_TYPE_ENUM;
  clientId: number;
}

export interface SelectedObject extends CreateObjectDTO {
  id: number;
}
