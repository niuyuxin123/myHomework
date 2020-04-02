import React, {Component} from 'react';
import {View, Text, Image, TextInput, AsyncStorage, TouchableOpacity,Dimensions,StyleSheet, Alert, ToastAndroid} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils'

const {width,scale} = Dimensions.get('window');
const s=width /640;
export default class Register extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            pwd:'',
            repwd:''
        }
    }
    userhandle = (text)=>{
        this.setState({username:text})
    }
    pwdhandle = (text)=>{
        this.setState({pwd:text})
    }
    repwdhandle = (text)=>{
        this.setState({repwd:text})
    }
    register = ()=>{
      if(this.state.username!==''&this.state.pwd!==''&this.state.repwd!==''){
        myFetch.post('/register',{
            username:this.state.username,
            pwd:this.state.pwd,
            repwd:this.state.repwd
          }
        ).then(res=>{
            if(res.data.token==='0'){
              AsyncStorage.setItem('userR',JSON.stringify(res.data))
                .then(()=>{
                  ToastAndroid.showWithGravity('加载中……',1000, ToastAndroid.CENTER)
                  setTimeout(() => {
                    Actions.login()
                  }, 2000);
                })
            }else{
              Alert.alert(res.data.tips);
            }
        })
      }else{
        if(this.state.username===''){
          Alert.alert('用户名不能为空')
        }else{
          if(this.state.pwd===''){
          Alert.alert('密码不能为空')
          }else{
            if(this.state.repwd===''){
            Alert.alert('确认密码不能为空')
            }
          }
        }
      }
    } 
  render() {
    return (
      <View style={{flex: 1,justifyContent: 'center',backgroundColor:'#f5f5f5'}}>
        <View
          style={{ alignItems: 'center'}}>
          <View
            style={styles.k1}>
            <Icon name="user" color="red"/>
            <TextInput placeholder="用户名" 
                onChangeText={this.userhandle}
            />
          </View>
          <View
            style={styles.k1}>
            <Icon name="eye" color="red"/>
            <TextInput 
                onChangeText={this.pwdhandle}
                placeholder="密码" 
                secureTextEntry={true}
            />
          </View>
          <View
            style={styles.k1}>
            <Icon name="eye" color="red"/>
            <TextInput 
                onChangeText={this.repwdhandle}
                placeholder="再次输入密码" 
                secureTextEntry={true}
            />
          </View>
            <TouchableOpacity 
                style={styles.btn}
                onPress={()=>this.register()}>
                <Text style={{color:'white'}}>注册</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.btn}
                onPress={()=>{Actions.login()}}>
                <Text style={{color:'white'}}>前往登录</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles=StyleSheet.create({
  k1:{
    width: '80%',
    marginRight: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  btn:{
    width: '80%',
    height: 40,
    backgroundColor: '#f23030',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:15,
  }
})