import { List, Present } from "@prisma/client";
import { PresentItem } from "./present-item-component";

interface PresentListProps {
  presents: Array<
    Present & {
      list: List | null;
    }
  >;
}

export const PresentList = ({ presents }: PresentListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
      {presents.map((present) => (
        <PresentItem key={present.id} present={present} />
      ))}
    </div>
  );
};
