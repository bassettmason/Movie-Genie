import Constants from 'expo-constants'

export const fetchDiscoverTraktLists = async () => {
  const token = localStorage.getItem('accessToken');
  const url = 'https://api.trakt.tv/users/likes/lists';
  const clientId = Constants.manifest.extra.traktClientId;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": clientId,
        'Authorization': `Bearer ${token}`
      },
    });

    if (response.ok) {
      const data = await response.json(); 
      const listIds = data.map(item => item.list.ids.trakt); 

      return listIds; // return the list IDs

    } else if (response.status === 429) {
      console.warn('Too many requests, retrying...');
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      return fetchDiscoverTraktLists(); // return the result of the retry
    } else {
      console.error("Failed to fetch liked lists:", response.statusText);
      return null; // return null if the request failed
    }
  } catch (error) {
    console.error(error);
    return null; // return null if an error occurred
  }
}