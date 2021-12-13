declare namespace API {
  type OrderListItem = {
    id: string;
    orderSn: string;
    totalAmount: number;
    totalQuantity: number;
    sourceType: number;
    status: number;
    memberId: number;
    payAmount: number;
    payType: number;
    createdAt: string;
    updatedAt: string;
  };
}
