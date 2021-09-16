import React, { useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@@/plugin-locale/localeExports';
import AddModal from '@/pages/goods/Brand/components/AddModal';
import { queryBrandPage } from '@/services/goods/brand';

const Brand: React.FC = () => {
  const [editType, setEditType] = useState<number>(1);
  const [edtData, setEdtData] = useState<API.BrandListItem>();
  // const [delData, setDelData] = useState<string>();
  const [addVisible, setAddVisible] = useState<boolean>(false);

  const ref = useRef<ActionType>();

  const handlerUpdate = (record: API.BrandListItem) => {
    console.log(record);
    setEdtData(record);
  };

  const add = () => {
    setAddVisible(true);
    setEditType(1);
  };

  const editCancel = () => {};

  const option = async (values: any) => {
    console.log(values);
    return false;
  };

  const queryDataPage = async (param: any) => {
    const res = await queryBrandPage(param);
    if (res.code === 0) {
      const page: API.PageRes<API.BrandListItem> = res.data;
      return {
        success: true,
        data: page.records,
        current: page.current,
        pageSize: page.size,
        total: page.total,
      };
    }
    return {
      success: false,
    };
  };
  const columns: ProColumns<API.BrandListItem>[] = [
    {
      dataIndex: 'id',
      width: '5%',
    },
    {
      title: '名称',
      dataIndex: 'name',
      copyable: true,
      ellipsis: true,
      tip: '标题过长会自动收缩',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: 'logo图片',
      dataIndex: 'logoUrl',
      search: false,
      width: '15%',
      render: (node, re) => {
        return <Image width={100} src={re.logoUrl} />;
      },
    },
    {
      title: '排序',
      dataIndex: 'sort',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '更新时间时间',
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a key="editable" onClick={() => handlerUpdate(record)}>
          编辑
        </a>,
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <div>
      <ProTable<API.BrandListItem>
        actionRef={ref}
        rowKey="id"
        search={{
          labelWidth: 80,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={add}>
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={queryDataPage}
        // params={{}}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
      />
      <AddModal
        addVisible={addVisible}
        cancel={() => editCancel()}
        finished={option}
        data={edtData as API.BrandListItem}
        type={editType}
      />
    </div>
  );
};
export default Brand;
