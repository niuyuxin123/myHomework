import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  BackHandler,
  ToastAndroid,
  View,
  Text,
  Image,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Router, Overlay, Scene, Tabs, Drawer, Lightbox, Modal, Actions} from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen';

import Home from './src/home/Home';
import List from './src/goods/List';
import PersonalCenter from './src/userinfor/PersonalCenter';
import Shopping from './src/shoppingcar/Shopping';
import MyPublish from './src/userinfor/MyPublish';
import Login from './src/common/Login';
import SwiperPage from './src/common/SwiperPage';
import Register from './src/common/Register';
 
console.disableYellowBox = true;

const App= () => {
  let [isLogin,setLogin] = useState(false);
	let [isInstall,setInstall] = useState(true);
  let now=0;
  let init = ()=>{
		AsyncStorage.getItem('isInstall')
		.then(res=>{
			if(res){
				setInstall(false);
			}
		})
		AsyncStorage.getItem('user')
		.then(res=>{
			let user = JSON.parse(res)
			console.log(user)
			if(!user){
				SplashScreen.hide();
			}
			if(user&&user.token){
				setLogin(true);
				SplashScreen.hide();
			}
		})
  }
  useEffect(()=>{
		init();
  },[])
  let afterInstall = ()=>{
		setInstall(false)
  }
  if(isInstall){
		return <View style={{flex:1}}>
			<SwiperPage afterInstall={afterInstall}/>
		</View>
	}
  return (
    <Router
      backAndroidHandler={()=>{
        console.log(Actions.currentScene )
        if(Actions.currentScene != '_home'&&Actions.currentScene != 'login'){
          Actions.pop();
          return true;
        }else{
          if(new Date().getTime()-now<2000){
            BackHandler.exitApp();
          }else{
            ToastAndroid.show('确定要退出吗',100);
            now = new Date().getTime();
            return true;
          }
        }
        
      }}
    >
      <Overlay>
        <Modal key="modal" hideNavBar>
          <Lightbox key="lightbox">
            <Drawer 
              key="drawer"
              contentComponent={()=><Text>drawer</Text>}
              drawerIcon={()=><Icon name="menu"/>}
              drawerWidth={400}
            >
              <Scene key='root'>
                <Tabs
                  key='tabbar'
                  hideNavBar
                  activeTintColor='red'
                  inactiveTintColor='gray'
                  tabBarStyle={{
                    backgroundColor:'#fff',
                    borderTopColor:'#ececec',
                    borderTopWidth:1
                  }}
                >
                  <Scene 
                    key='home'
                    title='首页'
                    hideNavBar
                    icon={
                      ({focused})=><Icon 
                        name='home'
                        size={25}
                        color={focused?'#f23030':'#949494'}
                      />
                    }
                    component={Home}
                  />
                  <Scene 
                    key='list'
                    title='商品分类'
                    hideNavBar
                    icon={
                      ({focused})=><Icon 
                        name='grid'
                        size={25}
                        color={focused?'#f23030':'#949494'}
                      />
                    }
                    component={List}
                  />
                  <Scene 
                    key='shopping'
                    title='购物车'
                    icon={
                      ({focused})=><Icon 
                        name='shopping-cart'
                        size={25}
                        color={focused?'#f23030':'#949494'}
                      />
                    }
                    component={Shopping}
                  />
                  <Scene 
                    key='personalcenter'
                    title='个人中心'
                    hideNavBar
                    icon={
                      ({focused})=><Icon 
                          name='user'
                          size={25}
                          color={focused?'#f23030':'#949494'}
                      />
                    }
                    // component={PersonalCenter}
                  >
                    
                    <Scene key='center'  component={PersonalCenter} />
                    <Scene 
                      key='publish' 
                      hideTabBar 
                      component={MyPublish} 
                    />
                  </Scene>
                </Tabs>
              </Scene>
            </Drawer>
          </Lightbox>
          <Scene initial={!isLogin} key="register" component={Register} />
          <Scene initial={!isLogin} key="login" component={Login} />
        </Modal>
      </Overlay>
    </Router>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
