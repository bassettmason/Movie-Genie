import Constants from 'expo-constants'

export const likeTraktList = async (listId) => {

  const token = localStorage.getItem('accessToken');
  const url = 'https://api.trakt.tv/users/bassettmason/lists/'+listId+'/like';
  const clientId = Constants.manifest.extra.traktClientId;
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": clientId,
        'Authorization': `Bearer ${token}`
    },
   });
    
  if (response.ok) {
    console.log("List liked!");
  } else if (response.status === 429) {
      console.warn('Too many requests, retrying...');
      await new Promise(resolve => setTimeout(resolve, 1000)); // wait for 1 second
      await likeTraktList(listId); // try again
  } else {
    console.error("Failed to like list:", response.statusText);
  }
    
  } catch (error) {
    console.error(error);
  }
}