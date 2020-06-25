import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager} from "react-native";
// import { Colors } from './Colors';
import Icon from "react-native-vector-icons/MaterialIcons";
import CardLayout from './CardLayout';
import OrderCardLayout from './OrderCardLayout';

export default class Accordian extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
          expanded : false,
        }

    }
    componentDidMount(){
        console.log("this.props.key",this.props.title,this.props.keyValue);
        console.log("this.props.itemsList",this.props.itemsList);
        if(this.props.keyValue == '0')
            this.setState({expanded:true});
    }
    
  
  render() {
    if(this.props.typeOrders){
        return (
        
            <View style={styles.container}>
                 <TouchableOpacity ref={this.accordian} style={styles.row} onPress={()=>this.toggleExpand()}>
                     <Text style={[styles.title, styles.font]}>{this.props.title.toUpperCase()}</Text>
                     <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30}  />
                 </TouchableOpacity>
                 <View style={styles.parentHr}/>
                 {
                     this.state.expanded &&
                     <View style={styles.child}>
                         <OrderCardLayout
                         itemsList = {this.props.itemsList}   
                         /> 
                     </View>
                 }
                 
            </View>
         )
    }
    return (
        
       <View style={styles.container}>
            <TouchableOpacity ref={this.accordian} style={styles.row} onPress={()=>this.toggleExpand()}>
                <Text style={[styles.title, styles.font]}>{this.props.title.toUpperCase()}</Text>
                <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30}  />
            </TouchableOpacity>
            <View style={styles.parentHr}/>
            {
                this.state.expanded &&
                <View style={styles.child}>
                    <CardLayout
                    itemsList = {this.props.itemsList}   
                    /> 
                </View>
            }
            
       </View>
    )
  }

  toggleExpand=()=>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded : !this.state.expanded})
  }

}

const styles = StyleSheet.create({
    container:{
        width:"auto",
        height:"auto",
        // justifyContent:'space-between',
        flexDirection: 'column',


    },
    title:{
        fontSize: 14,
        fontWeight:'bold',
        flex:1,
        textAlign:"center"
        // color: Colors.DARKGRAY,
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        // backgroundColor: Colors.CGRAY,
    },
    parentHr:{
        height:1,
        // color: Colors.WHITE,
        width:'100%'
    },
    child:{
        // backgroundColor: Colors.LIGHTGRAY,
        padding:16,
    }
    
});