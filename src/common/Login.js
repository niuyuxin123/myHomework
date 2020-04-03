import React, {Component} from 'react';
import {View, Text, Image, TextInput, AsyncStorage, TouchableOpacity,Dimensions,StyleSheet,Alert,BackHandler,ToastAndroid} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils'

const {width,scale} = Dimensions.get('window');
const s=width /640;
export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            pwd:'',
            isloading:false
        }
    }
    componentDidMount() {
      if (Platform.OS === 'android') {
        BackHandler.addEventListener('back', this.back);
      } 
    }
    componentWillUnmount(){
      if (Platform.OS === 'android') {
        BackHandler.removeEventListener('back', this.back);
    }
    }
    back=()=>{
      // let now = 0;
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) { 
      // if (new Date().getTime() - now < 2000) {
        BackHandler.exitApp();
      } else {
        ToastAndroid.show('确定要退出吗', 100);
        this.lastBackPressed = Date.now(); 
        // now = new Date().getTime();
        return true;
      }
    }
    userhandle = (text)=>{
        this.setState({username:text})
    }
    pwdhandle = (text)=>{
        this.setState({pwd:text})
    }
    login = ()=>{
      this.setState({isloading:true})
        if(this.state.username!==''&this.state.pwd!==''){
        myFetch.post('/login',{
            username:this.state.username,
            pwd:this.state.pwd}
        ).then(res=>{
            if(res.data.token==='0'){
              AsyncStorage.setItem('user',JSON.stringify(res.data))
                .then(()=>{
                  this.setState({isloading:false})
                  Actions.home();
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
            <TouchableOpacity 
                style={styles.btn}
                onPress={this.login}>
                <Text style={{color:'white'}}>登录</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.btn}
                onPress={()=>{Actions.register()}}>
                <Text style={{color:'white'}}>前往注册</Text>
            </TouchableOpacity>
        </View>
        {
            this.state.isloading
            ?<View style={styles.load}><Text style={{color:'#f23030'}}>正在登录。。。</Text></View>
            :null
        }
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
  },
  load:{
    width:'100%',
    height:50,
    marginTop: 30,
    justifyContent:'center',
    alignItems:'center'

  }
})