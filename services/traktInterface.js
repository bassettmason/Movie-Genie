import Constants from 'expo-constants'

const getTraktTopTen = async () => {
    const traktInterfaceSecret = Constants.manifest.extra.traktInterfaceSecret;
    try {
        const requestURL = `https://trakt-interface-server.bassettmason.repl.co/api/playlists?data=topten&token=password12345`;
        const response = await fetch(requestURL);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data.content;
    
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return null;
    }
};

export { getTraktTopTen };