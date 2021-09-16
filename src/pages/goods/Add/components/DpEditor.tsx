import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export interface DpEditorValueState {
  html: string | '';
}

interface DpEditorProps {
  EditorValue: DpEditorValueState;
  onChange?: (EditorValue: DpEditorValueState) => void;
  // DpServiesUrl: string;
}

const DpEditor: React.FC<DpEditorProps> = ({ EditorValue = {}, onChange }) => {
  const [html, setContent] = useState<string>();

  const triggerChange = (changedValue: DpEditorValueState) => {
    if (onChange) {
      // @ts-ignore
      onChange({ html, ...changedValue });
    }
  };

  const onEditorChange = (newContent: string) => {
    setContent(newContent);
    triggerChange({ html: newContent });
  };

  return (
    <Editor
      value={EditorValue.html}
      onEditorChange={onEditorChange}
      init={{
        plugins: ['lists link image paste help wordcount table '],
        language_url: '/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        font_formats:
          '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif',
        min_height: 450,
        // images_upload_handler: (blobInfo: any, success: any, failure: any) => {
        //   const formData = new FormData();
        //   formData.append('file', blobInfo.blob(), blobInfo.filename());
        //   request(DpServiesUrl, {
        //     method: 'post',
        //     data: formData
        //   }).then(res => success(res.location)).catch(err => failure(err.status));
        // }
      }}
    />
  );
};

export default DpEditor;
