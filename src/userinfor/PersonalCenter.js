import React, { Component } from 'react'
import {Image, View,Text,TextInput,ScrollView,FlatList,StyleSheet,Dimensions,StatusBar, ImageBackground, TouchableOpacity, AsyncStorage} from 'react-native'
import  Icon  from 'react-native-vector-icons/Fontisto';
import Swiper from 'react-native-swiper';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';

const {width,scale} = Dimensions.get('window');
const s=width /640;

const list1=[
  {title:'账户管理',name:'player-settings'},
  {title:'收货地址',name:'map-marker-alt'},
  {title:'我的信息',name:'justify'},
  {title:'我的订单',name:'folder'},
  {title:'我的二维码',name:'qrcode'},
  {title:'我的积分',name:'database'},
  {title:'我的收藏',name:'star'}
]
const list2=[
  {title:'居家维修保养',name:'doctor'},
  {title:'出行接送',name:'taxi'},
  {title:'我的受赠人',name:'male'},
  {title:'我的住宿优惠',name:'stack-overflow'},
  {title:'我的活动',name:'sait-boat'},
  {title:'我的发布',name:'onenote'}
]
const options = {
  title: '请选择：',
  cancelButtonTitle:'取消',
  takePhotoButtonTitle:'拍照',
  chooseFromLibraryButtonTitle:'选择相册',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class PersonalCenter extends Component {
  constructor(){
    super();
    this.state={
      imageUrl:''
    }
  }
  componentDidMount(){
    AsyncStorage.getItem('photoSource')
    .then(res=>res=JSON.parse(res))
    .then(res=>{
      console.log(res)
      const url=res===null?require('../../assets/head.png'):res;
      
      this.setState({
        imageUrl:url
      })
    })
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
          var jsons=JSON.stringify(source);
         AsyncStorage.setItem('photoSource',jsons,function(err){
           if(err){
             console.log('存储失败')
           }else{
             console.log('存储成功')
           }
          });
        }
      });
  }
  exit=()=>{
    AsyncStorage.removeItem('user');
    Actions.login();
  }
  render() {
    return (
      <View style={{flex:1,backgroundColor:'#eeeeee'}} >
        <ScrollView>
          <ImageBackground style={styles.tops} source={require('../../assets/bg.png')} >
            <TouchableOpacity onPress={()=>{this.takephoto()}}>
              <Image style={{width:155*s,height:155*s,resizeMode:'stretch'}} source={this.state.imageUrl} />
            </TouchableOpacity>
            
            <Text style={{color:'#fff',fontSize:19,marginTop:20*s}} >BINNU DHILLON</Text>
          </ImageBackground>
          <View style={styles.t1}>
            <Icon name='person' color='#aeaeae' size={25} />
            <Text style={{color:'#7e7d7d',fontSize:20,marginLeft:20*s}} >我的个人中心</Text>
          </View>
          <FlatList 
            style={{backgroundColor:'#fff'}}
            data={list1}
            numColumns={3}
            renderItem={({item})=>(
              <View style={styles.tc} >
                <Icon name={item.name} size={25} color='#aeaeae' />
                <Text style={{color:'#7e7d7d',fontSize:18,marginTop:5*s}} > {item.title} </Text>
              </View>
            )}
          />
          <View style={styles.t2}>
          <Icon name='bookmark' color='#aeaeae' size={25}  />
            <Text style={{color:'#7e7d7d',fontSize:20,marginLeft:20*s}} >E族活动</Text>
          </View>
          <FlatList 
            style={{backgroundColor:'#fff'}}
            data={list2}
            numColumns={3}
            renderItem={({item})=>
            (
              <TouchableOpacity onPress={item.title==='我的发布'?()=>Actions.publish():''}>
                <View style={styles.tc}>
                  <Icon name={item.name} size={25} color='#aeaeae' />
                  <Text style={{color:'#7e7d7d',fontSize:18,marginTop:5*s}} > {item.title} </Text>
                </View>
              </TouchableOpacity>
            )
          }
          />
          <View style={styles.bottoms} >
            <Text onPress={()=>{this.exit()}} style={{color:'#8f8f8f',fontSize:15}} >BINNU DHILLON | 退出</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}
const styles=StyleSheet.create({
  tops:{
    width:640*s,
    height:350*s,
    justifyContent:'center',
    alignItems:'center'
  },
  t1:{
    height:70*s,
    width:640*s,
    backgroundColor:'#fff',
    borderBottomColor:'#eee',
    borderBottomWidth:1,
    alignItems:'center',
    paddingLeft:20*s,
    flexDirection:'row'
  },
  tc:{
    marginTop:20*s,
    width:640/3*s,
    height:90*s,
    // textAlign:'center',
    justifyContent:'center',
    alignItems:'center'
  },
  t2:{
    height:70*s,
    width:640*s,
    backgroundColor:'#fff',
    borderBottomColor:'#eee',
    borderBottomWidth:1,
    alignItems:'center',
    paddingLeft:20*s,
    flexDirection:'row',
    marginTop:10*s
  },
  bottoms:{
    height:60*s,
    width:640*s,
    justifyContent:'center',
    alignItems:'center'
  }

})
