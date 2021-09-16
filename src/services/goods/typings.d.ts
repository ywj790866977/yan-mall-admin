declare namespace API {
  type Res = {
    success: babel;
    data: any;
    current: number;
    pageSize: number;
    total: number;
  };

  type PageRes<T> = {
    current?: number;
    hitCount?: boolean;
    optimizeCountSql?: boolean;
    pages?: number;
    records?: T[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type GoodsListItem = {
    id: string;
    name: string;
    originPrice: number;
    price: number;
    picUrl: string;
    brandId: number;
    brandName: string;
    categoryName: string;
    description: string;
    skuList: Sku[];
    sales: number;
  };

  type Sku = {
    id: number;
    sn: string;
    name: string;
    specIds: string;
    picUrl: string;
    price: bigint;
    stock: number;
    lockedStock: number;
    createdAt: string;
    updatedAt: string;
  };

  type BrandListItem = {
    id: string;
    name: string;
    logoUrl: string;
    sort: number;
    createdAt: string;
    updatedAt: string;
  };
}
