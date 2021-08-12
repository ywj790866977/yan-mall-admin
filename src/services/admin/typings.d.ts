declare namespace API {
  type Res = {
    success: babel;
    data: any;
    current: number;
    pageSize: number;
    total: number;
  };
  type UserListItem = {
    id: string;
    username: string;
    nickname: string;
    gender: number;
    deptName: string;
    roleName: string;
    mobile: string;
    status: string;
    key: number;
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
