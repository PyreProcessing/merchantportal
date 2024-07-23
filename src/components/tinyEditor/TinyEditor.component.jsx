import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import parse from 'html-react-parser';

const TinyEditor = ({ handleChange, initialContent }) => {
  const editorRef = useRef('editor');

  return (
    <Editor
      onInit={(evt, editor) => {
        editorRef.current = editor;
      }}
      initialValue={parse(initialContent)}
      onChange={(e) => handleChange(e.target.getContent())}
      apiKey="3qndempqys9u826cso9ljmry8aogwak7eghy60j3ihdawihl"
      init={{
        height: 500,
        menubar: 'insert view format table tools help',
        plugins: [
          'advlist autolink lists link image charmap print preview anchor codesample',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount autolink',
        ],
        toolbar:
          'undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link unlink image media | codesample | searchreplace visualblocks code fullscreen | insertdatetime table | help wordcount',
        content_style:
          'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }',
        codesample_languages: [
          { text: 'HTML/XML', value: 'markup' },
          { text: 'JavaScript', value: 'javascript' },
          { text: 'CSS', value: 'css' },
        ],
      }}
    />
  );
};

export default TinyEditor;
