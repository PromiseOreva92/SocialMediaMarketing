import 'react-native-gesture-handler';
import React,{useState,useRef,useEffect,useCallback,Alert} from 'react';
import { Platform } from 'react-native';
import MainStack from './screens/MainStack';
import { createStackNavigator } from '@react-navigation/stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import * as SplashScreen from 'expo-splash-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './components/UserContext';
import registerNNPushToken from 'native-notify';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import messaging from '@react-native-firebase/messaging'


// const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync()

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });



// async function sendPushNotification(expoPushToken) {
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: 'Original Title',
//     body: 'And here is the body!',
//     data: { someData: 'goes here' },
//   };

//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   });
// }


// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = await Notifications.getExpoPushTokenAsync({
//       projectId: Constants.expoConfig.extra.eas.projectId,
//     });
//     console.log("token: "+token.data);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   return token.data;
// }




export default function App() {
  // registerNNPushToken(14910, '5YQWPfozm7dkakQtM2FhOU');



  const [appIsReady, setAppIsReady] = useState(false);
  const [userCredentials,setUserCredentials] = useState("")
  
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();


  
  const checkLoginCredentials = async() =>{


    // console.log('checking:')
    AsyncStorage.getItem('user')
    .then((result)=>{
      console.log('result'+result)
        if (result!==null) {
          setUserCredentials(JSON.parse(result));
          // console.log('credentials: '+userCredentials)
        }else{
          setUserCredentials(null);
        }
     })
    .catch((error)=>{console.log(error)})

    
  }

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  useEffect(() => {


    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then(
          token => console.log(token)
        );
    }

    // Set up the notification handler for the app
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    // Handle user clicking on a notification and open the screen
    const handleNotificationClick = async (response) => {
      const screen = response?.notification?.request?.content?.data?.screen;
      if (screen !== null) {
        navigation.navigate(screen);
      }
    };

    // Listen for user clicking on a notification
    const notificationClickSubscription =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationClick
      );

    // Handle user opening the app from a notification (when the app is in the background)
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.data.screen,
        navigation
      );
      if (remoteMessage?.data?.screen) {
        navigation.navigate(`${remoteMessage.data.screen}`);
      }
    });

    // Check if the app was opened from a notification (when the app was completely quit)
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
          if (remoteMessage?.data?.screen) {
            navigation.navigate(`${remoteMessage.data.screen}`);
          }
        }
      });

    // Handle push notifications when the app is in the background
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
      const notification = {
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        data: remoteMessage.data, // optional data payload
      };

      // Schedule the notification with a null trigger to show immediately
      await Notifications.scheduleNotificationAsync({
        content: notification,
        trigger: null,
      });
    });

    // Handle push notifications when the app is in the foreground
    const handlePushNotification = async (remoteMessage) => {
      const notification = {
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        data: remoteMessage.data, // optional data payload
      };

      // Schedule the notification with a null trigger to show immediately
      await Notifications.scheduleNotificationAsync({
        content: notification,
        trigger: null,
      });
    };





    async function prepare() {
      try {
        console.log("in prepare")
        checkLoginCredentials();
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        
        console.log("Set App Ready to true")
        
        setAppIsReady(true);
          SplashScreen.hideAsync();
        
      }
    }
    prepare();


    // Listen for push notifications when the app is in the foreground
    const unsubscribe = messaging().onMessage(handlePushNotification);




    // Clean up the event listeners
    return () => {
      unsubscribe();
      notificationClickSubscription.remove();
    };

    
  }, []);


  // useEffect(() => {
  //   registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     setNotification(notification);
  //   });

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   });

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener.current);
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);
  

  const onLayoutRootView = 
  useCallback(async () => {
    console.log("in callback")
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      console.log("in onlayoutrootview")
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    console.log("returned null. App is not ready")
    return null;
  }

  

  return (

    <UserContext.Provider value={{userCredentials,setUserCredentials}}>
      <RootSiblingParent>
          <MainStack/>        
      </RootSiblingParent> 
    </UserContext.Provider>



        
  );
}

