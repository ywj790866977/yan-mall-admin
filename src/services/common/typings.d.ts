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
}
