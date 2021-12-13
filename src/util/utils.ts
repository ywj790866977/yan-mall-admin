import type { ProColumns } from '@ant-design/pro-table';

export const getUpdateColumns = (cp: ProColumns[]) => {
  // @ts-ignore
  const cp_filter = cp.filter(({ dataIndex }) => !['password'].includes(dataIndex));
  return cp_filter.map((one) => {
    if (one.valueType === 'dateTime' && one.hideInForm === true) {
      // eslint-disable-next-line no-param-reassign
      delete one.hideInForm;
    }
    // eslint-disable-next-line no-param-reassign
    delete one.initialValue;
    return one;
  });
};
