export interface TableAction {
  class: string;
  icon: string;
  text: string;
  type: TableActionType;
  clickable?: boolean;
}

export enum TableActionType {
  Edit,
  Delete,
  DeleteAll
}
