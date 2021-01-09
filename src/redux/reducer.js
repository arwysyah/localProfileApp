import {
   GET_PHOTO,
   SIGN_IN
  } from './stringType';
  const initialState = {
    profile:[],
    photo:null
  };
  
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PHOTO:
        return {...state, photo: action.value};
      case SIGN_IN:
        return {...state,profile: action.value};
    }
  };
  
  export {reducer};