import React from 'react'
import { BoxProps } from '@chakra-ui/react'

interface IList<T> {
    items: T[],
    resourceName: string,
    renderItem: (item:T, key:number) => React.ReactNode,
    // itemComponent: React.ReactNode,
    onClickItem?: (item:T) => void,
    emptyComponent: () => React.ReactNode
    boxProps?: BoxProps
}

function RegularList<T>({ items, renderItem, emptyComponent }: IList<T>) {
    return (
        <>
            {
                items.length > 0
                ?   items.map(renderItem)
                :   emptyComponent()
            }   
        </>
    )
}

export default RegularList
