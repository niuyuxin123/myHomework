import React, { Component } from 'react'
import {Image, View,Text,TextInput,ScrollView,FlatList,StyleSheet,Dimensions,StatusBar, ToastAndroid} from 'react-native'
import  Icon  from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
const {width,scale} = Dimensions.get('window');
const s=width /640;
export default class MyPublish extends Component {
  constructor(){
    super();
    this.state={
      data:[],
      pages:1
    }
  }
  componentDidMount(){
    fetch('http://cnodejs.org/api/v1/topics?limit=15&page='+this.state.pages)
    .then(res=>res.json())
    .then(res=>{
      var arr=res.data;
      arr.map((item)=>{

        if(item.title.length>15){
          item.title=item.title.substr(0,15)+'…';
        }
        var brr=item.create_at.split('-');
        item.create_at=brr[0]+'-'+brr[1]+'-'+brr[2].substr(0,2);
      })
      this.setState({
        data:arr
      })
    })
  }
  up=()=>{
    if(this.state.pages-1==0){
      
      ToastAndroid.show('没有上一页了',1000)
    }else{
      this.setState({
        pages:this.state.pages-1
      },()=>{
        fetch('http://cnodejs.org/api/v1/topics?limit=15&page='+this.state.pages)
        .then(res=>res.json())
        .then(res=>{
          var arr=res.data;
          arr.map((item)=>{

            if(item.title.length>15){
              item.title=item.title.substr(0,15)+'…';
            }
            var brr=item.create_at.split('-');
            item.create_at=brr[0]+'-'+brr[1]+'-'+brr[2].substr(0,2);
          })
          this.setState({
            data:arr
          })
        })
      })
    }
  }
  down=()=>{
    this.setState({
      pages:this.state.pages+1
    },()=>{
       fetch('http://cnodejs.org/api/v1/topics?limit=15&page='+this.state.pages)
      .then(res=>res.json())
      .then(res=>{
        var arr=res.data;
        arr.map((item)=>{

          if(item.title.length>15){
            item.title=item.title.substr(0,15)+'…';
          }
          var brr=item.create_at.split('-');
          item.create_at=brr[0]+'-'+brr[1]+'-'+brr[2].substr(0,2);
        })
        this.setState({
          data:arr
        })
      })
    })
   
  }
  render() {
    // console.log(this.state.data)
    
    return (
      <View style={{flex:1}} > 
        <View style={styles.top}>
          <Icon 
            name='left' 
            color="#fff" 
            size={25} 
            onPress={()=>Actions.pop()}
          />
          <Text style={styles.topc} >我的发布</Text>
          <Icon name='ellipsis1' color="#fff" size={35} />
        </View>
        <View style={styles.content}>
          {this.state.data.map(item=>(
            <View style={styles.items}>
            <Text style={styles.tit}>{item.title}</Text>
            <Text style={{width:130*s,color:'#494949'}}>{item.create_at}</Text>
            {Math.random()<0.5?
            <Text style={{color:'#494949'}}>已回复</Text>  
            :
            <Text style={{color:'#f34747'}}>待回复</Text>
            }
          </View>
          ))}
        </View>
        <View style={styles.bot}>
          <Button style={styles.lefts} onPress={()=>this.up()}>上一页</Button>
          <Text style={{fontSize:20,color:'#494949'}}>第 {this.state.pages} 页</Text>
          <Button style={styles.rights} onPress={()=>this.down()}>下一页</Button>
        </View>
      </View>
    )
  }
}
const styles=StyleSheet.create({
  top:{
    width:640*s,
    height:75*s,
    backgroundColor:'#f23030',
    alignItems:'center',
    flexDirection:'row',
    paddingLeft:25*s,
  },
  topc:{
    fontSize:20,
    color:'#fff',
    paddingLeft:200*s,
    paddingRight:200*s
  },
  content:{
    marginTop:5*s,
    backgroundColor:'#fff'
  },
  items:{
    flexDirection:'row',
    borderBottomColor:'#f5f5f5',
    borderBottomWidth:1,
    borderStyle:'dashed',
    width:640*s,
    height:63*s,
    alignItems:'center',
    fontWeight:'100',
    fontSize:16,
  },
  tit:{
    width:420*s,
    height:63*s,
    lineHeight:65*s,
    marginLeft:10*s,
    color:'#494949'
  },
  bot:{
    width:640*s,
    height:80*s,
    backgroundColor:'#fff',
    alignItems:'center',
    flexDirection:'row'
  },
  lefts:{
    width:150*s,
    height:50*s,
    borderRadius:25*s,
    backgroundColor:'#f23030',
    color:'#fff',
    alignItems:'center',
    justifyContent:'center',
    lineHeight:50*s,
    marginLeft:30*s,
    marginRight:100*s
  },
  rights:{
    width:150*s,
    height:50*s,
    borderRadius:25*s,
    backgroundColor:'#f23030',
    color:'#fff',
    alignItems:'center',
    justifyContent:'center',
    lineHeight:50*s,
    marginLeft:100*s,
  }
});
