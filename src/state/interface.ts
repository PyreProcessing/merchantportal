//create a zustand store for a token of a user
import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
type InterfaceState = {
  paymentMethod: any;
  signUpPaymentFormValues: any;
  currentForm: any;
  transactionData: any;
  transactionMethod: any;
  setTransactionMethod: (method: string) => void;
  setTransactionDataValues: (values: any) => void;
  setCurrentForm: (form: any) => void;
  setSignUpPaymentFormValues: (values: any) => void;
  setPaymentMethod: (method: string) => void;
};

export const useInterfaceStore = create<InterfaceState>(
  (set: any, get: any) => ({
    paymentMethod: 'creditcard',
    signUpPaymentFormValues: {},
    currentForm: undefined,
    transactionData: {},
    transactionMethod: 'single',
    setTransactionMethod: (method: string) =>
      set({ transactionMethod: method }),
    setTransactionDataValues: (values: any) => {
      set({ transactionData: values });
    },
    setCurrentForm: (form: any) => {
      set({ currentForm: form });
    },
    setPaymentMethod: (method) => set({ paymentMethod: method }),
    setSignUpPaymentFormValues: (values: any) => {
      set({ signUpPaymentFormValues: values });
    },
  })
);

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useInterfaceStore);
}
