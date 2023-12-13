import { RootState } from "@/Redux/store";
import { createSlice } from "@reduxjs/toolkit";

export interface paymentType {
  totalPrice: number;
  quantity: number;
  jobId: string;
  productDetails:[{
    _id:string;
    name: string;
    quantity : number;
    price: number ;
  }
];
  seller: {
    email: string;
    name: string;
    phoneNumber:number;
    
  };
}

const initialState: paymentType = {
  totalPrice: 0,
  quantity: 0,
  jobId:"",
  productDetails:[{
    _id:"",
    name: "",
    quantity : 0,
    price: 0
  }],
  seller: {
    email: "",
    name: "",
    phoneNumber:0
  },
};

const paymentDataSlice = createSlice({
  name: "paymentData",
  initialState,
  reducers: {
    updatePaymentData: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});
// console.log("data")
// export const getPaymentData = (state: RootState) => state.paymentData ;

export const { updatePaymentData } = paymentDataSlice.actions;

export default paymentDataSlice.reducer;