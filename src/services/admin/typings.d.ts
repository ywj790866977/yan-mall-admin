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

  type User = {
    id: string;
    email?: string;
    status: number;
    username: string;
    mobile: string;
    gender: number;
    nickname?: string;
    password: string;
    roleIds: string[];
    deptId: number;
  };

  type Role = {
    id: string;
    name?: string;
    status: number;
    code: string;
  };

  type Dept = {
    id: string;
    name: string;
    parentId: number;
    sort: number;
    status: number;
    children: Dept[];
  };
}
