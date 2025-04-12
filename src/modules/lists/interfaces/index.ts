import { List, PickedStatus, Present } from "@prisma/client";

export interface IListWithPresentPublic extends List {
  presents: {
    id: string;
    name: string;
    description: string | null;
    externalLink: string | null;
    pickedStatus: PickedStatus;
    pickedAt: Date | null;
    pickedBy: {
        name: string | null;
        id: string;
    } | null;
    listId: string | null;
  }[];
  owner: {
    name: string;
  };
}
