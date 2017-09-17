export interface Quiz {
    id: string,
    name:string,
    description:string,
    typeId:number,
    type:string,
    created:DateTimeFormat,
    updated:DateTimeFormat,
    attributes:object
}
