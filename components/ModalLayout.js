import React, { useState, useEffect } from 'react';
import { Text,View,  Alert,Platform,
  Modal,
  StyleSheet,
  TouchableHighlight,TextInput,Button } from 'react-native';
  import { useSelector, useDispatch } from 'react-redux';

export default function ModalLayout(props) {
  const [checked,setState] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [sellPrice,setSellPrice] = useState(0);
  const [platformPrice,setPlatformPrice] = useState(0);
  const state = useSelector(state => state)

  
  useEffect(() => {
    console.log('props["item"]["invObj"]',props["item"]["invObj"]);
    var sellPrice = props["item"]["invObj"] ? +props["item"]["invObj"]["sellingPrice"]:0;
    setSellPrice(sellPrice);
    var platformPrice = props["item"]["invObj"] ? props["item"]["invObj"]["priceToPlatform"]:0;
    setPlatformPrice(platformPrice);
  
  }, []);
  const onChangeText=function(str,value){
    if(str =="sellPrice")
      setSellPrice(value);
    else if(str == "platformPrice")
      setPlatformPrice(value);
  }

return(
<View style={styles.ModalLayout}>
{props.modalVisible && <Modal
    show={false}
    animationType="slide"
    transparent={false}
    visible={props.modalVisible}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
    }}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
      <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
          onPress={() => {
            console.log("this.modalVisible"+props.modalVisible);
            setSellPrice(0);
            setPlatformPrice(0);
            props.setModalVisible(!props.modalVisible);
          }}
        >
          <Text style={styles.textStyle, {height: Platform.OS == 'android' ? 40 : 20}}>Hide</Text>
        </TouchableHighlight>

        <Text style={styles.modalProductText}>{props.item.productName}</Text>
        <Text style={styles.modalCategoryText}>{props.item.category}</Text>

        
        <Text style={{textAlign:'left'}}>Selling Price:</Text>
        <TextInput
          onChangeText={value => onChangeText('sellPrice', value)}
          style={styles.input,{height: Platform.OS == 'android' ? 40 : 20}}
          placeholder="Selling Price"
          keyboardType = 'numeric'
          value = {sellPrice.toString()}
        />
        <Text style={{textAlign:'left'}}>Platform Cost:</Text>
        <TextInput
          onChangeText={value => onChangeText('platformPrice', value)}
          style={styles.input,{height: Platform.OS == 'android' ? 40 : 20}}
          placeholder="Platform Cost"
          keyboardType = 'numeric'
          value = {platformPrice.toString()}

        />
        <View style= {styles.inputButton}>
        <Button style={{marginBottom:50}} title="Add" onPress={() => {
            console.log("this.modalVisible"+props.modalVisible);
            console.log('props["item"]',props["item"]);
            var reqBody = {};
            reqBody.product_id = props["item"]["id"];
            reqBody.priceToPlatform = platformPrice;
            reqBody.sellingPrice = sellPrice;
            reqBody.quantity = 1000;
            reqBody.retailer_id = state.userInfo.userId;
            if(props["item"]["invObj"] && props["item"]["invObj"]["inventoryId"])
              reqBody.inventoryId = props["item"]["invObj"]["inventoryId"];
            props.updateInventory(reqBody);
            setSellPrice(0);
            setPlatformPrice(0);
            props.setModalVisible(!props.modalVisible);
            
          }} />
        </View>  
        {/* <Spacer size={10} /> */}
        <View  style= {styles.inputButton}>
        <Button style={{marginTop:50}} title="Close" onPress={() => {
            console.log("this.modalVisible"+props.modalVisible);
            setSellPrice(0);
            setPlatformPrice(0);
            props.setModalVisible(!props.modalVisible);
          }} />
        
        </View>
          
      </View>
    </View>
  </Modal>}
  </View>
)
}

const styles = StyleSheet.create({
  ModalLayout:{
    marginTop:100,

  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width:750,
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
    elevation: 5,
    flex:1
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalProductText:{
    marginBottom: 15,
    marginTop: 20,
    textAlign: "center",
    fontWeight:'400',
    color:'red',
    fontSize:18
  },
  modalCategoryText:{
    marginBottom: 25,
    marginTop: 5,
    textAlign: "center",
    fontSize:13
  },
  input: {
    height: 50,
    paddingLeft:50,
    width:500,
    margin: 10,
  },
  inputButton: {
    width:400,
    margin: 10,
  },
});
