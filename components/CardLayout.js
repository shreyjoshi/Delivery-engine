import React, { useState, useEffect } from 'react';
import { Text,View,  Alert,
  Modal,
  StyleSheet,
  TouchableHighlight,SafeAreaView,FlatList,Platform } from 'react-native';
import ModalLayout from './ModalLayout';
import { Card, ListItem, Button, Icon,SearchBar } from 'react-native-elements'
import { deletenote, ADD_PRODUCT_LIST } from '../redux/appRedux';
import { useSelector, useDispatch } from 'react-redux'



const list = [
 {  id:1,
    name: 'itemOne',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    deliveryTime: "42mins"
 },
 {  id:2,
    name: 'itemSecond',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    deliveryTime: "45mins",
  },
]


export default function CardLayout(props) {
  const dispatch = useDispatch()

  const [checked,setState] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [item,setItemState] = useState({  id:1,
                                          name: 'brynn',
                                          avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
                                          deliveryTime: "42mins"
                                      });
  const state = useSelector(state => state)
  

  const change = function(itemObj){
    // fetch()
    console.log("param",itemObj);
    var stateInvList = state.inventory;
    for(var i = 0;i<stateInvList.length;i++){
      if(stateInvList[i]["product_id"] = itemObj["id"] && stateInvList[i]["retailer_id"]=="RET_000001"){
        itemObj["invObj"] = stateInvList[i];
        setItemState(itemObj);
        break;
      }
    
    }
    console.log("this.modalVisible"+modalVisible);
    setItemState(itemObj);
    setModalVisible(!modalVisible);
    console.log(item);
    console.log(itemObj);
    console.log("here");
      if(!checked)
        setState({checked:false});
  }
  const cancelItem = function(itemObj){
    alert("Are you sure to remove the selected Item:"+itemObj.name);
    dispatch(deletenote(1));
  }
  const ListRender = function(l,i){
    var stateInvList = state.inventory;
    for(var i = 0;i<stateInvList.length;i++){
      if(stateInvList[i]["product_id"] == l["id"] && stateInvList[i]["retailer_id"]=="RET_000001"){
        l["invObj"] = stateInvList[i];
        l["added"] = true;
        break;
      }
    
    }
    if(l.added == true)
    return(<ListItem
      containerStyle={{alignSelf: 'flex-start',textAlign: 'top',width:'100%'}}
      contentContainerStyle = {{width:1200}}
      key={l.id}
      leftAvatar={{ source: { uri: "https://emart-grocery.s3.ap-south-1.amazonaws.com/app-img/GSLogoMain+(S).png" },rounded:false }}
      title={l.productName}
      titleStyle = {{marginLeft:5,marginBottom:5}}
      component={TouchableHighlight}
      subtitle={<Text style={{marginTop:2,marginLeft:5,fontWeight:"200"}}>{l.details}</Text>}
      rightSubtitle={<Text style={{marginTop:2,marginRight:15,fontWeight:"200"}}>{l.measurementUnit}</Text>}
      bottomDivider
      checkBox= {{ // CheckBox Props
        checkedIcon: 'times',
        uncheckedIcon: 'times',
        checkedColor:'#cc0c23',
        uncheckedColor: '#fff',
        onPress: () => this.press(item),
        checked: true,
      }}
      onPress={() =>  
              change(l)}           
      
      chevron
    />);
    else  
    return(<ListItem
      containerStyle={{alignSelf: 'flex-start',textAlign: 'top',width:'100%'}}
      contentContainerStyle = {{width:1200}}
      key={l.id}
      leftAvatar={{ source: { uri: "https://emart-grocery.s3.ap-south-1.amazonaws.com/app-img/GSLogoMain+(S).png" },rounded:false }}
      title={l.productName}
      titleStyle = {{marginLeft:5,marginBottom:5}}
      component={TouchableHighlight}
      subtitle={<Text style={{marginTop:2,marginLeft:5,fontWeight:"200"}}>{l.details}</Text>}
      rightSubtitle={<Text style={{marginTop:2,marginRight:15,fontWeight:"200"}}>{l.measurementUnit}</Text>}
      bottomDivider
      checkBox= {{ // CheckBox Props
        checkedIcon: 'times',
        uncheckedIcon: 'times',
        checkedColor: '#fff',
        uncheckedColor: '#fff',
        onPress: () => this.press(item),
        checked: true,
        disabled:true
      }}
      onPress={() =>  
              change(l)}           
      chevron
    />);
        
    
  }
  return (
    <View style={styles.container}>
    {modalVisible && <ModalLayout
    modalVisible={modalVisible}
    item={item}
    setModalVisible = {setModalVisible}
    />}

  {props.itemsList && 
    props.itemsList.map((l, i) => (
      ListRender(l,i)
    ))
  }
</View>

  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center',
    padding: 16,
  },
  crossIcon:{
    marginRight:10
  }
});
