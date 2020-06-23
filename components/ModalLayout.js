import React, { useState, useEffect } from 'react';
import { Text,View,  Alert,
  Modal,
  StyleSheet,
  TouchableHighlight,TextInput,Button } from 'react-native';

export default function ModalLayout(props) {
  const [checked,setState] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [sellPrice,setSellPrice] = useState(0);
  const [platformPrice,setPlatformPrice] = useState(0);
  useEffect(() => {
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

            props.setModalVisible(!props.modalVisible);
          }}
        >
          <Text style={styles.textStyle}>Hide Modal</Text>
        </TouchableHighlight>

        <Text style={styles.modalProductText}>{props.item.productName}</Text>
        <Text style={styles.modalCategoryText}>{props.item.category}</Text>

        
        <Text style={{textAlign:'left'}}>Selling Price:</Text>
        <TextInput
          onChangeText={value => onChangeText('sellPrice', value)}
          style={styles.input}
          placeholder="Selling Price"
          keyboardType = 'numeric'
          value = {sellPrice}
        />
        <Text style={{textAlign:'left'}}>Platform Cost:</Text>
        <TextInput
          onChangeText={value => onChangeText('platformPrice', value)}
          style={styles.input}
          placeholder="Platform Cost"
          keyboardType = 'numeric'
          value = {platformPrice}

        />
        <View style= {styles.inputButton}>
        <Button style={{marginBottom:50}} title="Add" onPress={() => {
            console.log("this.modalVisible"+props.modalVisible);

            props.setModalVisible(!props.modalVisible);
          }} />
        </View>  
        {/* <Spacer size={10} /> */}
        <View  style= {styles.inputButton}>
        <Button style={{marginTop:50}} title="Close" onPress={() => {
            console.log("this.modalVisible"+props.modalVisible);

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
    marginTop: 15,
    textAlign: "center",
    fontWeight:'bold',
    color:'red',
    fontSize:15
  },
  modalCategoryText:{
    marginBottom: 15,
    marginTop: 5,
    textAlign: "center",
    color:'red',
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
