import { List, Present } from "@prisma/client"

interface ListPublicCardProps {
    list: List & {
        presents: Present[]
    }
}

export const ListPublicCard =({list}: ListPublicCardProps) => {
    return (
        <div>
            <h1>{list.name}</h1>
        </div>
    )
}