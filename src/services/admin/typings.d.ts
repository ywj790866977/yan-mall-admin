// @ts-ignore
/* eslint-disable */

declare namespace API {

  type Response<T> = {
    code: number;
    data: T;
    message: string;
  }

  type Routers = {
    path: string;
    name: string;
    icon?: string;
    // layout?: boolean;
    component: string;
    // access?: string;
    children?: Array[Routers];
  };
}
