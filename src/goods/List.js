import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Dimensions,
  FlatList,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
const {width}=Dimensions.get('window');
const datas=[];
for(var i=0;i<6;i++){
  datas.push({tit:i,key:i})
}
export default class List extends Component {
  render() {
    return (
      <>
        <ScrollView>
          <View style={styles.searchTop}>
            <View style={styles.searchK}>
                <TextInput
                  style={styles.searchT}
                  placeholder="请输入商品名称"

                />
                <View style={styles.searchImg}>
                  <Icon name='search' size={25} color={'gray'}/>
                </View>  
            </View>
          </View>
          <View style={styles.tabss}>
            <Text style={{color:'red'}} >综合</Text>
            <Text>销量</Text>
            <Text>新品</Text>
            <Text>价格</Text>
            <Text>信用</Text>
          </View>
          <FlatList 
            numColumns={2}
            data={datas}
            renderItem={
              ({item})=>
              <View style={styles.slide}>
                <View>
                  <View style={styles.slideImg}>
                      <Image  source={item.key%2==0?require("../../assets/img1.png"):require("../../assets/img2.png")}
                        style={{resizeMode:'contain',height:165,width:'85%'}}
                      />
                  </View>
                  <Text style={{color:'gray',fontSize:12,paddingLeft:'5%',paddingRight:'5%'}}>Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳</Text>
                  <Text style={{color:'red',fontSize:12,paddingLeft:'5%'}} >36.00</Text>
                </View>
              </View>
            }
          />
        </ScrollView>
      </>
    )
  }
}
const styles = StyleSheet.create({
  searchTop:{
    width:"100%",
    height:50,
    flexDirection:'row',
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center'
  },
  searchK:{
    width:'80%',
    height:40,
    backgroundColor:'#efeff4',
    flexDirection:'row',
    paddingLeft:'3%'
  },
  searchT:{
    width:'85%',
    height:40,
    fontSize:13,
    backgroundColor:'#efeff4'
  },
  searchImg:{
    width:'15%',
    justifyContent:'center',
    alignItems:'center'
  },
  tabss:{
    width:'100%',
    height:45,
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    marginTop:5
  },
  slide:{
    width:width*0.4,
    height:225,
    backgroundColor:'#fff',
    marginLeft:width*0.06,
    marginTop:15
  },
  slideImg:{
    justifyContent:'center',
    alignItems:"center"
  }
});
