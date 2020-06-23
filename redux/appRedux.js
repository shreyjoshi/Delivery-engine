import remove from 'lodash.remove'

// Action Types

export const ADD_NOTE = 'ADD_NOTE'
export const DELETE_NOTE = 'DELETE_NOTE'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const ADD_USER_TOKEN = 'ADD_USER_TOKEN'
export const ADD_PRODUCT_LIST = "ADD_PRODUCT_LIST"
export const ADD_INVENTORY_LIST = "ADD_INVENTORY_LIST"
// Action Creators

let noteID = 0;
let app_state  = {};

export function addnote(note) {
  return {
    type: ADD_NOTE,
    id: noteID++,
    note
  }
}

export function deletenote(id) {
  return {
    type: DELETE_NOTE,
    payload: id
  }
}

export function setProductList(id){
  return {
    type: ADD_PRODUCT_LIST,
    id:id
  }
}

export function addCategory(note){
  return{
    type:ADD_CATEGORY,
    id: noteID++,
    note
  }
}
export function setInventoryList(id){
  return{
    type: ADD_INVENTORY_LIST,
    id:id
  }
}

export function addUserToken(id){
  return{
    type:ADD_USER_TOKEN,
    id:id
  }
  app_state.userToken = id;
}

// reducer

let initialState = {products:{},category:[],inventory:[],items:[],orders:[],userInfo:{}}

function notesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        category:[...state.category,{
          id: action.id,
          note: action.note
        }]

      }
    case ADD_PRODUCT_LIST:
        console.log("action.id",action.id);
        return {
          ...state,
          products:action.id

        }

    case DELETE_NOTE:
      console.log("delete Notes");
      console.log("state",state);
      return state
      // const deletedNewArray = remove(state, obj => {
      //   return obj.id != action.payload
      // })
      // return deletedNewArray
    case ADD_USER_TOKEN:
      console.log("action.id",action.id);
      return {
        ...state,
        userInfo:{...state.userInfo,token:action.id.token}
      }
    
    case ADD_INVENTORY_LIST:
      console.log("action.id inventory",action.id);
      return {
        ...state,
        inventory:action.id
      }

    default:
      return state
  }
}

export default notesReducer
