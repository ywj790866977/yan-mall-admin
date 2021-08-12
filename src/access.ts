/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  // console.log("access",currentUser.access)
  const isCanAdmin =
    (currentUser && currentUser.roles.filter((role) => role === 'ADMIN' || role === 'ROOT')) ||
    false;
  return {
    canAdmin: isCanAdmin,
  };
}
