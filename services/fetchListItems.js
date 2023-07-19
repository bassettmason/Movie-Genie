import Constants from 'expo-constants';

export const fetchListItems = async (item) => {
  const token = localStorage.getItem('accessToken');
  const url = 'https://api.trakt.tv/lists/'+item+'/items';
  const clientId = Constants.manifest.extra.traktClientId;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": clientId,
      },
    });

    if (response.ok) {
      const data = await response.json(); 
      const listItems = data.map(item => item); 

      return listItems; // return the list IDs

    } else if (response.status === 429) {
      console.warn('Too many requests, retrying...');
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      return fetchListItems(); // return the result of the retry
    } else {
      console.error("Failed to fetch liked lists:", response.statusText);
      return null; // return null if the request failed
    }
  } catch (error) {
    console.error(error);
    return null; // return null if an error occurred
  }
}