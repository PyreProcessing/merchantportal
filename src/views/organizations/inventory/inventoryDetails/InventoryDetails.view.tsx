import React, { useEffect } from 'react';
import styles from './InventoryDetails.module.scss';
import cssStyles from './InventoryDetails.module.css';
import formStyles from '@/Form.module.scss';
import {
  Divider,
  FloatButton,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  message,
} from 'antd';
import { useRouter } from 'next/router';
import usePostData from '@/state/usePostData';
import useUpdateData from '@/state/useUpdateData';
import useFetchData from '@/state/useFetchData';
import PhotowallUpload from '@/components/photoWallUpload/PhotowallUpload.component';
import { SaveOutlined } from '@ant-design/icons';
import TinyEditor from '@/components/tinyEditor/TinyEditor.component';

const InventoryDetails = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;
  const [initialContent, setInitialContent] = React.useState<string | null>(
    null
  );
  const [images, setImages] = React.useState<string[]>([]);

  const { mutate: addInventory } = usePostData({
    url: `/inventory`,
    key: 'addInventory',
    queriesToInvalidate: ['inventoryList'],
    redirectUrl: '/organization/inventory',
    successMessage: 'Inventory added successfully',
  });

  const { mutate: updateInventory } = useUpdateData({
    queriesToInvalidate: ['inventoryList'],
    successMessage: 'Inventory updated successfully',
    redirectUrl: '/organization/inventory',
  });

  const { data, isFetching, isLoading, error, isError } = useFetchData({
    url: `/inventory/${id}`,
    key: 'inventoryDetails',
    enabled: !!id,
  });

  const onFinish = (values: any) => {
    if (id) {
      updateInventory({ url: `/inventory/${id}`, formData: values });
    } else {
      addInventory({ ...values });
    }
  };

  useEffect(() => {
    if (id) {
      form.setFieldsValue(data?.payload.inventory);
      setImages(
        data?.payload.inventory.images.map((image: any) => {
          return { url: image, uid: image };
        })
      );
      setInitialContent(data?.payload.inventory.description);
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <Form form={form} layout="vertical" className={formStyles.form}>
        <Divider orientation="center">Product Information</Divider>
        <div className={formStyles.form__formContainer}>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item label="Product Images" name="images">
                <PhotowallUpload
                  images={images as any[]}
                  action={`${process.env.API_URL}/upload`}
                  updateForm={(images) => form.setFieldsValue({ images })}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <Divider orientation="center">Product Details/Meta Data</Divider>
        <div className={formStyles.form__formContainer}>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Product Name"
                name="name"
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
                name="category"
                rules={[]}
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
                name="price"
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
                label="Inventory Stock"
                name="quantity"
                rules={[]}
                tooltip="This is the stock of your product. It is used to manage your inventory."
              >
                <InputNumber
                  min={0}
                  controls={false}
                  className={formStyles.form__input}
                />
              </Form.Item>
            </div>
          </div>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Out of Stock"
                name="outOfStock"
                rules={[]}
                tooltip="This is the out of stock status of your product. It is used to manage your inventory. Marking the product as out of stock will prevent customers from purchasing the product."
                valuePropName="checked"
              >
                <Switch checkedChildren="Yes" unCheckedChildren="No" />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Unlimited Stock"
                name="unlimitedStock"
                rules={[]}
                tooltip="This helps with the stock management of your product. Marking the product as unlimited stock will prevent the product from going out of stock. This is mainly used for digital products."
                valuePropName="checked"
              >
                <Switch checkedChildren="Yes" unCheckedChildren="No" />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Product Visibility"
                name="productVisibility"
                rules={[]}
                tooltip="This is the visibility of your product. It is used to manage your inventory. Marking the product as invisible will prevent customers from seeing the product."
                valuePropName="checked"
              >
                <Switch
                  checkedChildren="Invisibile"
                  unCheckedChildren="Visible"
                />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Requires Shipping"
                name="requiresShipping"
                rules={[]}
                tooltip="products that require shipping will be charged differently from products that do not require shipping. If you have a physical product, you should mark it as requiring shipping. If you have a digital product, you should mark it as not requiring shipping."
                valuePropName="checked"
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
                {!isLoading && (
                  <TinyEditor
                    handleChange={
                      // gets the value from the editor and sets it to the form
                      (value: string) =>
                        form.setFieldsValue({ description: value })
                    }
                    initialContent={initialContent ?? ''}
                  />
                )}
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
                  placeholder="Meta Keywords"
                  allowClear
                  tokenSeparators={[',']}
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
        {/* buttons container */}
        <FloatButton
          onClick={() => {
            // submit the form
            form
              .validateFields()
              .then((values) => {
                onFinish(values);
              })
              .catch((errorInfo) => {
                for (const error of errorInfo.errorFields) {
                  message.error(error.errors);
                }
              });
          }}
          icon={<SaveOutlined rev />}
          tooltip={id ? 'Update Inventory' : 'Add Inventory'}
        />
      </Form>
    </div>
  );
};

export default InventoryDetails;
