export declare class TransactionContentsDto {
    productId: number;
    quantity: number;
    price: number;
}
export declare class CreateTransactionDto {
    total: number;
    cupon: string;
    contents: TransactionContentsDto[];
}
