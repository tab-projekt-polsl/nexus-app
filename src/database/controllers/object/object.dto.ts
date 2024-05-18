export enum OBJECT_TYPE_ENUM {
  REQUEST_TYPE = "activity types",
}

export interface CreateObjectDTO {
  name: string;
  objectType: OBJECT_TYPE_ENUM;
}

export interface SelectedObject extends CreateObjectDTO {
  id: number;
}
