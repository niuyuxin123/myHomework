import React, { Component } from 'react'
import {Image, View,Text,TextInput,ScrollView,FlatList,StyleSheet,Dimensions,StatusBar} from 'react-native'
import  Icon  from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper';
import Button from 'react-native-button';

const {width,scale} = Dimensions.get('window');
const s=width /640;

const choises =[
  {title:'居家维修保养',img:require('../../assets/c1.png')},
  {title:'住宿优惠',img:require('../../assets/c2.png')},
  {title:'出行接送',img:require('../../assets/c3.png')},
  {title:'E族活动',img:require('../../assets/c4.png')}
]

export default class Home extends Component {
  constructor(){
    super();
    this.state={

    }
  }
  render() {
    console.log(width)
    return (
      <View style={{flex:1,backgroundColor:'#f5f5f5'}} >
        <StatusBar backgroundColor='#f23030' />
        <ScrollView>
          <View style={styles.top}>
            <View style={styles.searchs} >
              <Icon name='search' color='#fff' size={25} />
              <TextInput 
                placeholder='请输入您要搜索的关键字'
                placeholderTextColor='#fff'
                style={{
                  width:440*s,
                  height:50*s,
                  marginLeft:20*s,
                  padding:0
                }}
              />
            </View>
            <Icon name='shopping-cart' color="#fff" size={25} />
          </View>
          <Swiper 
            style={{height:273*s}}
            showsButtons={true}
            // autoplay={true}
            dotStyle={styles.dot}
            activeDotStyle={styles.actDot}
            paginationStyle={styles.pageDot}
          >
            <View style={styles.slide} >
              <Image  style={{width:640*s,height:273*s,resizeMode:'cover'}} source={require('../../assets/b1.png')} />
            </View>
            <View style={styles.slide} >
              <Image style={{width:640*s,height:273*s,resizeMode:'cover'}} source={require('../../assets/b2.png')} />
            </View>
            <View style={styles.slide} >
              <Image  style={{width:640*s,height:273*s,resizeMode:'cover'}} source={require('../../assets/b1.png')} />
            </View>
            
          </Swiper>
          <FlatList 
            data={choises}
            renderItem={({item})=>(
              <View style={styles.cl} >
                <Image style={{width:100*s,height:100*s,resizeMode:'cover',marginLeft:25*s}} source={item.img} />
                <View style={{width:445*s}}>
                  <Text style={{color:'#4e4e4e',fontSize:22,marginLeft:40*s}}>{item.title}</Text>
                </View>  
                <Icon name='chevron-right' color='#cecece' size={25} />
              </View>
            )

            }
          />
          <View style={styles.cb}>
            <Button style={styles.btu} >发布需求</Button>
          </View>
          <View style={styles.bottoms} >
            <Text style={{color:'#8f8f8f',fontSize:15}} >©E族之家 版权所有</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  top:{
    width:640*s,
    height:75*s,
    backgroundColor:'#f23030',
    alignItems:'center',
    flexDirection:'row',
    // justifyContent:'center'
    paddingLeft:25*s
  },
  searchs:{
    width:525*s,
    height:50*s,
    backgroundColor:'#fbb8b8',
    flexDirection:'row',
    borderRadius:25*s,
    paddingLeft:25*s,
    alignItems:'center',
    marginRight:25*s
  },
  slide:{
    width:640*s,
    height:273*s,
    justifyContent:"center",
    alignItems:'center'
  },
  pageDot:{
    bottom:12*s
  },
  dot:{
    width:14*s,
    height:14*s,
    borderRadius:7*s,
    backgroundColor:'#fff'
  },
  actDot:{
    width:14*s,
    height:14*s,
    borderRadius:7*s,
    backgroundColor:'#fd0304'
  },
  cl:{
    width:640*s,
    height:115*s,
    backgroundColor:'#fff',
    marginTop:10,
    alignItems:'center',
    flexDirection:'row'
  },
  cb:{
    height:115*s,
    width:640*s,
    justifyContent:'center',
    alignItems:'center'
  },
  btu:{
    width:540*s,
    height:70*s,
    textAlign:'center',
    textAlignVertical: 'center',
    backgroundColor:'#f23030',
    color:'#fff',
    borderRadius:10*s,
    fontSize:22
  },
  bottoms:{
    height:60*s,
    width:640*s,
    justifyContent:'center',
    alignItems:'center'
  }
})