export interface ResponseDataType<T=any> {
    code: number;
    message: string;
    data?: T[] ;
}
