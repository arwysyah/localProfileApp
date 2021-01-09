import {
   GET_PHOTO,
   SIGN_IN,
   GET_DEVICE
  } from './stringType';
  const initialState = {
    profile:[],
    photo:null,
    device:''
  };
  
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PHOTO:
        return {...state, photo: action.value};
      case SIGN_IN:
        return {...state,profile: action.value};
        case GET_DEVICE:
          return {...state,profile: action.value};
      
    }
    
  };
  
  export {reducer};