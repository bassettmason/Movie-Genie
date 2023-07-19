import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from 'qs';
import Constants from 'expo-constants'

const client_id = Constants.manifest.extra.traktClientId;
const redirect_uri = 'https://Movie-Genie.bassettmason.repl.co';
const clientSecret = Constants.manifest.extra.clientSecret;

async function getStorageItem(key) {
    if (Platform.OS === 'web') {
        console.log("getting item " + key)
        return localStorage.getItem(key);
    } else {
        return AsyncStorage.getItem(key);
    }
}

async function setStorageItem(key, value) {
    console.log("storing item " + key + " " + value)
    if (Platform.OS === 'web') {
        localStorage.setItem(key, value);
    } else {
        await AsyncStorage.setItem(key, value);
    }
}

async function generateAuthUrl() {
  console.log("starting generateAuthUrl")
  let storedState = await getStorageItem('authState');
  console.log("got storage item auth state")
  if (storedState){
      console.log(storedState)
  }
  if (!storedState) {
      console.log("no authstate starting creating auth state")
      storedState = Math.floor(Math.random() * 1e20).toString();
      await setStorageItem('authState', storedState);
  }
  const authorizeUrl = 'https://trakt.tv/oauth/authorize/';
  const queryParams = qs.stringify({
      'response_type': 'code',
      'client_id': client_id,
      'redirect_uri': redirect_uri,
      'state': storedState,

  });
  await setStorageItem('url', `${authorizeUrl}?${queryParams}`)
  console.log(`${authorizeUrl}?${queryParams}`)
  return `${authorizeUrl}?${queryParams}`;
}

async function exchangeCodeForToken(code) {
  console.log("starting exchangeCodeForToken")
    try {
        const response = await fetch('https://trakt.tv/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'grant_type': 'authorization_code',
                'code': code,
                'client_id': client_id,
                'redirect_uri': redirect_uri,
                'client_secret': clientSecret
            }),
        });
        const data = await response.json();
        console.log(data);
        const access_token = data.access_token;
        console.log("got access token ")
        await setStorageItem('accessToken', access_token);
        console.log("stored token")
        console.log("storage access token ")
      console.log("Got access token:", access_token)
        return access_token;
    } catch (e) {
        console.error(e);
    }
}

async function getAccessToken() {
    const accessToken = await getStorageItem('accessToken');
    console.log("got access token" + accessToken);
    return accessToken;
}


async function setTraktProfile(profileData, accessToken) {
    try {
        const key = "userProfile";
        await setStorageItem(key, JSON.stringify(profileData));
    } catch (error) {
        console.error(error);
    }
}

async function getTraktProfile (accessToken){

  try {
    const response = await fetch('https://api.trakt.tv/users/me?extended=full', {
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': clientId,
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const profileData = await response.json();
    await setTraktProfile(profileData, accessToken);
    return profileData.ids && profileData.ids.slug ? profileData.ids.slug : null;  
  } catch (error) {
    console.error(error);
  }
}


      
export { generateAuthUrl, exchangeCodeForToken, getAccessToken, setStorageItem, getTraktProfile };
