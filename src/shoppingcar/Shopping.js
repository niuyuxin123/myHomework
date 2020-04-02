import React,{Component,useState, useCallback} from 'react';
import {View,Text,Animated,Easing,Dimensions,FlatList,ScrollView,StyleSheet,ActivityIndicator} from 'react-native';
import {Actions}  from  'react-native-router-flux';
import Button from 'react-native-button';
import ImagePicker from 'react-native-image-picker';
const {width}=Dimensions.get('window');

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
};

export default class Shopping extends Component{
    constructor(){
        super();
        let data=[];
        for(var i=0;i<10;i++){
            data.push({tit:i,key:i})
        }
        this.state={
            data,
            width:new Animated.Value(20),
            imageUrl:''
        }
    }
    anim=()=>{
        Animated.timing(
            this.state.width,
            {
                toValue: 200, 
                easing:Easing.elastic()
            },
        ).start();
    }
    back=()=>{
        Animated.timing(
            this.state.width,
            {
                toValue: 20, 
                easing:Easing.elastic()
            },
        ).start();
    }
    takephoto = ()=>{
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
              return;
            } else if (response.error) {
              console.log('Error:', response.error);
            } else if (response.customButton) {
              console.log('custom:', response.customButton);
            } else {
                
              const source = { uri: response.uri };
              this.setState({
                imageUrl: source,
              });
            }
          });
    }
    render(){
        return(

            <View>
                
                <Button
                    onPress={()=>{this.anim()}}
                    style={styles.btn}
                >变大</Button>
                <Animated.View style={{
                        width:this.state.width,
                        height:200,
                        backgroundColor:'orange'
                }}>

                </Animated.View>
                <Button
                    onPress={()=>{this.back()}}
                    style={styles.btn}
                >变小</Button>
                 <Button 
                    onPress={()=>{this.takephoto()}}
                    style={styles.btn}
                >拍照</Button>
                
             </View>
            
        )
    }
}
const styles = StyleSheet.create({
    btn:{
        width:200,
        height:40,
        borderRadius:20,
        backgroundColor:'blue',
        textAlignVertical:'center',
        color:'#fff'
    },
    slide:{
        width:width*0.4,
        height:300,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'red',
        marginLeft:width*0.07,
        marginTop:10

    }
})
