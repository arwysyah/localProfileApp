import {
    GET_PHOTO,
    SIGN_IN,
    GET_DEVICE
   } from './stringType';

   export const SET_PROFILE_PICTURE= (value) => {
    //   console.log(params, 'paras');
    return {
      type: GET_PHOTO,
      value
    };
  };
  export const SET_SIGNED_IN = (data) => {
    //   console.log(params, 'paras');
    return {
      type: SIGN_IN,
      value: data,
    };
  };
  export const SET_DEVICE = (data) => {
    //   console.log(params, 'paras');
    return {
      type: GET_DEVICE,
      value: data,
    };
  };


