import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, UploadProps } from 'antd';
import type { UploadFile } from 'antd';

type FileType = File | Blob | string | undefined;

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const PhotowallUpload = (props: {
  images: UploadFile[];
  action: string;
  updateForm: (value: string[]) => void;
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({
    file,
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
    if (file.status === 'done') {
      const newImageUrl = file.response.imageUrl;
      setImageUrls((prevUrls) => {
        const updatedUrls = [...prevUrls, newImageUrl];
        props.updateForm(updatedUrls);
        return updatedUrls;
      });
    }
  };

  const handleRemove = (file: UploadFile) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
    const newImageUrls = imageUrls.filter((url) => url !== file.url);
    setImageUrls(newImageUrls);
    props.updateForm(newImageUrls);
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined rev />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  useEffect(() => {
    setFileList(props.images);
    setImageUrls(props.images?.map((file) => file.url) as string[]);
  }, [props.images]);

  return (
    <>
      <Upload
        action={
          props.action
            ? props.action
            : 'https://api.pyreprocesing.com/api/v1/upload'
        }
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        headers={{
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }}
        onRemove={handleRemove}
      >
        {fileList?.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default PhotowallUpload;
