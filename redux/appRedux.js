import remove from 'lodash.remove'

// Action Types

export const ADD_NOTE = 'ADD_NOTE'
export const DELETE_NOTE = 'DELETE_NOTE'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const ADD_USER_TOKEN = 'ADD_USER_TOKEN'
export const ADD_PRODUCT_LIST = "ADD_PRODUCT_LIST"
export const ADD_INVENTORY_LIST = "ADD_INVENTORY_LIST"
export const ADD_INVENTORY = "ADD_INVENTORY"
export const UPDATE_INVENTORY = "UPDATE_INVENTORY"
export const DELETE_INVENTORY = "DELETE_INVENTORY"
export const ADD_USER_NAME = "ADD_USER_NAME"
export const ADD_USER_INFO = "ADD_USER_INFO"
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

export function addUserName(id){
  return{
    type:ADD_USER_NAME,
    id:id
  }
}

export function setInventoryList(id){
  return{
    type: ADD_INVENTORY_LIST,
    id:id
  }
}

export function addInventory(id){
  return{
    type: ADD_INVENTORY,
    id:id
  }
}

export function deleteInventory(id){
  console.log("here",id);
  return{
    type:DELETE_INVENTORY,
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

//delivery

export function setUserDetail(id){
  console.log("setUserDetail",id);
  return{
    type: ADD_USER_INFO,
    id:id
  }
}

// reducer

let initialState = {products:{},category:[],inventory:[],items:[],orders:[],userInfo:{}, userDetails:{}}

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

    case ADD_USER_NAME:
      return{
        ...state,
        userInfo:{...state.userInfo,userId:action.id}
      }
    case ADD_INVENTORY:
      console.log("added Inventory",action.id);
      return{
        ...state,
        inventory:[...state.inventory,action.id]
      }
    case UPDATE_INVENTORY:
      console.log("added Inventory",action.id);
      var inv_obj = inventory;
      var flag = true;
      for(var i = 0;i<inv_obj.length;i++){
        if(inv_obj[i]["inventoryId"] = action["id"]["inventoryId"])
          inv_obj[i] = action["id"];
          flag = false;
          break;
      }
      if(flag)
        inv_obj.push(action.id);

      return{
        ...state,
        inventory:inv_obj
      }

    case DELETE_INVENTORY:
      console.log("in reducer");
      console.log("state.inventory",JSON.stringify(state.inventory));
      const deletedNewArray = remove(state.inventory, obj => {
        console.log("obj.inventoryId",obj.inventoryId);
        console.log("action.id",action.id);
        console.log(obj.inventoryId != action.id);
        return obj.inventoryId != action.id
      })
      console.log(JSON.stringify(deletedNewArray));
      // var inv_obj = state.inventory;
      // console.log("in inv_obj");
      // var index;
      // var flag = true
      // for(var i = 0;i<inv_obj.length && flag;i++){
      //   console.log('inv_obj[i]["inventoryId"]',inv_obj[i]["inventoryId"]);
      //   console.log('action["id"]',action["id"]);
      //   if(inv_obj[i]["inventoryId"] == action["id"])
      //     { console.log("matched",i);
      //       inv_obj.splice(i,1);
      //       index = i;
      //       flag = false;
      //     }
      // }
      // console.log("inv_obj",inv_obj)

      return{
        ...state,
        inventory:deletedNewArray
      }

    case ADD_USER_INFO:
      console.log("action.id user",action.id);
      return{
        ...state,
        userDetails:action.id
      }  

    default:
      return state
  }
}

export default notesReducer
