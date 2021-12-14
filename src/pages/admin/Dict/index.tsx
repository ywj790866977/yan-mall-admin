import React, { useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@@/plugin-locale/localeExports';
import AddModal from '@/pages/admin/Dict/components/AddModal';
import { queryDictPage, remove, removeItem, save, update } from '@/services/admin/dict';

const Dict: React.FC = () => {
  const [editType, setEditType] = useState<number>(1);
  const [edtData, setEdtData] = useState<API.DictListItem>();
  // const [delData, setDelData] = useState<string>();
  const [addVisible, setAddVisible] = useState<boolean>(false);

  const ref = useRef<ActionType>();

  const addDictItem = async () => {};

  const handlerUpdate = (record: API.DictListItem) => {
    if (record.id) {
      setEdtData(record);
      setEditType(2);
      setAddVisible(true);
    } else {
      setEdtData(undefined);
      setEditType(1);
    }
  };

  const editCancel = () => {
    setAddVisible(false);
    setEditType(1);
    setEdtData(undefined);
  };

  const add = () => {
    setEdtData(undefined);
    setEditType(1);
    setAddVisible(true);
  };

  const option = async (values: any) => {
    console.log(values);
    const params: API.DictListItem = { ...values };
    // params.status = values.status ? 1 : 0;
    if (values.id) {
      const res = await update(values.id, params);
      if (res && res.code === 0) {
        setAddVisible(false);
        setEdtData(undefined);
        message.success('修改成功');
        return true;
      }
      message.error(res.message);
      return false;
    }

    const res = await save(params);
    console.log('save res', res);
    if (res && res.code === 0) {
      setAddVisible(false);
      message.success('创建成功');
      ref.current?.reload();
      return true;
    }
    message.error(res.message);
    return false;
  };

  const deleteDict = async (record: API.DictListItem) => {
    const res = await remove(record.id);
    if (res.code === 0) {
      message.success('删除成功!');
      ref.current?.reload();
      return;
    }
    message.error(res.message);
  };

  const queryDataPage = async (param: any) => {
    const res = await queryDictPage(param);
    if (res.code === 0) {
      const page: API.PageRes<API.DictListItem> = res.data;
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

  const expandedRowRender: any = (record: API.DictListItem) => {
    const handlerEdit = async (dictItem: API.DictItem) => {
      console.log(dictItem);
    };

    const deleteDictItem = async (dictItem: API.DictItem) => {
      console.log(dictItem);
      const res = await removeItem(dictItem.id);
      if (res.code === 0) {
        message.success('删除成功!');
        ref.current?.reload();
        return;
      }
      message.error(res.message);
    };

    const columns: ProColumns<API.DictItem>[] = [
      {
        title: '字典ID',
        dataIndex: 'id',
      },
      {
        title: '字典项名称',
        dataIndex: 'name',
      },
      {
        title: '字典项值',
        dataIndex: 'value',
      },
      {
        title: '字典编码',
        dataIndex: 'dictCode',
      },
      {
        title: '备注',
        dataIndex: 'remark',
        search: false,
      },
      {
        title: '是否默认',
        dataIndex: 'defaulted',
        valueType: 'switch',
      },
      {
        title: '操作',
        valueType: 'option',
        render: (text, dictItem) => [
          <a key="editable" onClick={() => handlerEdit(dictItem)}>
            编辑
          </a>,
          <Popconfirm
            title={`确定要删除 ${record.name} 字典吗?`}
            onConfirm={() => deleteDictItem(dictItem)}
          >
            <a key="editable">删除</a>
          </Popconfirm>,
        ],
      },
    ];

    return (
      <ProTable<API.DictItem>
        rowKey="id"
        columns={columns}
        headerTitle={false}
        search={false}
        options={false}
        dataSource={record.children}
        pagination={false}
      />
    );
  };

  const columns: ProColumns<API.DictListItem>[] = [
    {
      title: '字典ID',
      dataIndex: 'id',
      copyable: true,
    },
    {
      title: '字典名称',
      dataIndex: 'name',
      copyable: true,
    },
    {
      title: '字典编码',
      dataIndex: 'code',
      copyable: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record) => [
        <a key="editable" onClick={() => addDictItem()}>
          添加项
        </a>,
        <a key="editable" onClick={() => handlerUpdate(record)}>
          编辑
        </a>,
        <Popconfirm
          title={`确定要删除 ${record.name} 字典吗?`}
          onConfirm={() => deleteDict(record)}
        >
          <a key="editable">删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <div>
      <ProTable<API.DictListItem>
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
        expandable={{ expandedRowRender }}
        request={queryDataPage}
        columns={columns}
      />
      <AddModal
        addVisible={addVisible}
        cancel={() => editCancel()}
        finished={option}
        data={edtData as API.DictListItem}
        type={editType}
      />
    </div>
  );
};
export default Dict;
