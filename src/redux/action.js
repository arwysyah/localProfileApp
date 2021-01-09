import {
    GET_PHOTO,
    SIGN_IN
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
  // export const SET_SIGNIN = (payload) => {
  //     console.log(payload)
  //   return function (dispatch) {
  //    dispatch(SET_PROFILE(payload))
  //   };
  // };

