export interface PaginationContext<T>{
    $implicit: T[],
    index: number,
    appPaginationOf: T[],
    pageIndexes: number[],
    next: () => void,
    back: () => void,
    selectedIndex: (index: number) => void,
    chunkLength:number
}