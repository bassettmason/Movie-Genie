import Constants from 'expo-constants';

export const unlikeTraktList = async (listId) => {
  const token = localStorage.getItem('accessToken');
  const url = 'https://api.trakt.tv/users/bassettmason/lists/'+listId+'/like';
  const clientId = Constants.manifest.extra.traktClientId;
  
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": clientId,
        'Authorization': `Bearer ${token}`
      },
    });
    
    if (response.ok) {
      console.log("List unliked!"); // changed message to reflect unlike
    } else if (response.status === 429) {
      console.warn('Too many requests, retrying...');
      await new Promise(resolve => setTimeout(resolve, 1000)); // wait for 1 second
      await unlikeTraktList(listId); // try again with unlikeTraktList instead of likeTraktList
    } else {
      console.error("Failed to unlike list:", response.statusText); // changed message to reflect unlike
    }
    
  } catch (error) {
    console.error(error);
  }
}
