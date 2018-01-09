export interface VirtualNode {
    vtag?: string | number
    vkey?: string | number
    vtext?: string
    vchildren?: VirtualNode[]
    vattrs?: any
    vref?: (elm: any) => void
    elm?: Element
}

export interface ListDataItem {
    index: number
    itemAs: string
    item?: object
}