import React from 'react';
import styles from './InventoryDetails.module.scss';
import formStyles from '@/Form.module.scss';
import PhotoUpload from '@/components/photoUpload/PhotoUpload.component';
import {
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Slider,
  Switch,
} from 'antd';

const InventoryDetails = () => {
  const [form] = Form.useForm();
  return (
    <div className={styles.container}>
      <Form form={form} layout="vertical" className={formStyles.form}>
        <Divider orientation="center">Product Information</Divider>
        <div className={formStyles.form__formContainer}>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <div className={styles.imageUploadContainer}>
                <div className={styles.imageContainer}>
                  <PhotoUpload
                    listType="picture-card"
                    isAvatar={false}
                    name="ministryImageUrl"
                    form={form}
                    action={`${process.env.API_URL}/upload`}
                    // default={selectedProfile?.ministry?.ministryImageUrl}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider orientation="center">Product Details/Meta Data</Divider>
        <div className={formStyles.form__formContainer}>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Product Name"
                name="inventoryName"
                rules={[
                  { required: true, message: 'Please input inventory name' },
                ]}
              >
                <Input type="text" />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Product Categorization"
                name="inventoryCategorization"
                rules={[
                  { required: true, message: 'Please input inventory name' },
                ]}
                tooltip="This allows you to categorize your products for easy access and management. You can add multiple categories by separating them with a comma."
              >
                <Select
                  mode="tags"
                  placeholder="Product Categorization"
                  allowClear
                  tokenSeparators={[',']}
                />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Product SKU"
                name="SKU"
                rules={[]}
                tooltip="This is the unique identifier for your product. It is used to track your product and manage your inventory."
              >
                <Input type="text" />
              </Form.Item>
            </div>
          </div>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Product Price"
                name="inventoryPrice"
                rules={[
                  { required: true, message: 'Please input inventory price' },
                ]}
              >
                <InputNumber
                  min={0}
                  controls={false}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value: any) => value!.replace(/\$\s?|(,*)/g, '')}
                  className={formStyles.form__input}
                />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Tax Rate"
                name="tax"
                rules={[]}
                tooltip="This is the tax rate for your product. It is used to calculate the tax on your product."
              >
                <InputNumber
                  min={0}
                  controls={false}
                  addonBefore="%"
                  className={formStyles.form__input}
                />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Out of Stock"
                name="outOfStock"
                rules={[]}
                tooltip="This is the out of stock status of your product. It is used to manage your inventory. Marking the product as out of stock will prevent customers from purchasing the product."
              >
                <Switch checkedChildren="Yes" unCheckedChildren="No" />
              </Form.Item>
            </div>
          </div>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Product Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Please input inventory description',
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </div>
          </div>
          <div className={formStyles.form__formGroup}>
            {/* product attributes, such as brand, manufacturer and other relevant specifications */}
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Brand"
                name="brand"
                rules={[]}
                tooltip="This is the brand of your product. It is used to identify your product and manage your inventory."
              >
                <Input type="text" />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Manufacturer"
                name="manufacturer"
                rules={[]}
                tooltip="This is the manufacturer of your product. It is used to identify your product and manage your inventory."
              >
                <Input type="text" />
              </Form.Item>
            </div>
          </div>
        </div>
        <Divider orientation="center">Shipping Information</Divider>
        <div className={formStyles.form__formContainer}>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Weight"
                name="weight"
                rules={[]}
                tooltip="This is the weight of your product. It is used to calculate the shipping cost of your product."
              >
                <InputNumber
                  min={0}
                  controls={false}
                  addonAfter="kg"
                  className={formStyles.form__input}
                  disabled
                />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Dimensions"
                name="dimensions"
                rules={[]}
                tooltip="This is the dimensions of your product. It is used to calculate the shipping cost of your product."
              >
                <Input type="text" disabled />
              </Form.Item>
            </div>
          </div>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Shipping Cost"
                name="shippingCost"
                rules={[]}
                tooltip="This is the shipping cost of your product. It is used to calculate the shipping cost of your product. This is a flat rate for shipping your product."
              >
                <InputNumber
                  min={0}
                  controls={false}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value: any) => value!.replace(/\$\s?|(,*)/g, '')}
                  className={formStyles.form__input}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <Divider orientation="center">Misc. Information</Divider>
        <div className={formStyles.form__formContainer}>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Inventory Alert"
                name="inventoryAlert"
                rules={[]}
                tooltip="When inventory falls below this threshold, an alert will be sent to notify you to restock the product. This is used to manage your inventory."
              >
                <InputNumber
                  min={0}
                  controls={false}
                  className={formStyles.form__input}
                />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Related Products"
                name="relatedProducts"
                rules={[]}
                tooltip="Identify other products in your inventory that are either related or often purchased together with this product."
              >
                <Select
                  mode="tags"
                  placeholder="Related Products"
                  allowClear
                  tokenSeparators={[',']}
                  disabled
                />
              </Form.Item>
            </div>
          </div>
          <div className={formStyles.form__formGroup}>
            {/* SEO meta data tags */}
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Meta Title"
                name="metaTitle"
                rules={[]}
                tooltip="meta title for SEO, helps with search engine optimization for product pages"
              >
                <Input type="text" />
              </Form.Item>
            </div>

            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Meta Keywords"
                name="metaKeywords"
                rules={[]}
                tooltip="meta keywords for SEO, helps with search engine optimization for product pages"
              >
                <Select
                  mode="tags"
                  placeholder="Related Products"
                  allowClear
                  tokenSeparators={[',']}
                  disabled
                />
              </Form.Item>
            </div>
          </div>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Meta Description"
                name="metaDescription"
                rules={[]}
                tooltip="meta description for SEO, helps with search engine optimization for product pages"
              >
                <Input.TextArea />
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default InventoryDetails;
