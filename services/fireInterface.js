import { db } from './firebase';
import { doc, getDoc, getDocs, collection, query, where, onSnapshot } from 'firebase/firestore';

export const getFireTopTen = async () => {
  try {
    const services = [
  { dbSlug: 'top-amazon-prime-movies', name: 'Prime Video', id: "25765631"},
  { dbSlug: 'top-disney-movies', name: 'Disney+', id: "25765557"},
  { dbSlug: 'top-hbo-movies', name: 'Max', id: "25763019"},
  { dbSlug: 'top-hulu-movies', name: 'Hulu', id: "25760498"},
  { dbSlug: 'top-netflix-movies', name: 'Netflix', id: "25760125"},
  { dbSlug: 'top-paramount-plus-movies', name: 'Paramount+', id: "25763035"}
]

    // map() over services array and call fetchTopTenMovieData for each service, this returns an array of promises
    const promises = services.map(async (service) => {
      const movieData = await fetchTopTenMovieData(service.dbSlug);
      return { 
          id: service.id,
          item_count: movieData ? movieData.length : 0,
          name: service.name,
          saved: false,
          slug: service.dbSlug,
          type: "topten",
          items: movieData || []
      }; // if movieData is null or undefined, default to an empty array
    });
    
    // Wait for all promises to resolve and then return the results
    return await Promise.all(promises);
  } catch (error) {
    console.error('Error fetching Top Ten Movies:', error);
    throw error;
  }
};

// Fetch data from the "media_list" field of the "top-amazon-prime-movies" document
export const fetchTopTenMovieData = async (service) => {
  try {
    // Fetch the top ten movie IDs using fetchTopTenIdsData
    const topTenIds = await fetchTopTenIdsData(service);
    
    // Check if topTenIds is null or empty (handle this condition appropriately)
    if (!topTenIds || topTenIds.length === 0) {
      console.log('No top ten IDs found');
      return []; // Return an appropriate value
    }

    // Fetch movie data based on topTenIds
    const collectionRef = collection(db, 'movies');
    const moviesQuery = query(collectionRef, where('__name__', 'in', topTenIds));
    console.log('Movies Query:', moviesQuery);
    const querySnapshot = await getDocs(moviesQuery);
    console.log('Query Snapshot:', querySnapshot);

    // Convert the query snapshot to an array of movie objects
    const movieData = querySnapshot.docs.map((doc) => doc.data());

    console.log('Top ten movie data array:', movieData);
    return movieData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error for handling at a higher level if needed
  }
};

export const fetchTopTenIdsData = async (service) => {
  try {
    // Get a reference to the "top-amazon-prime-movies" document
    const documentRef = doc(db, 'movie-lists', service);
    
    // Get the document data
    const documentSnapshot = await getDoc(documentRef);
    
    // Check if the document exists
    if (documentSnapshot.exists()) {
      // Access the "media_list" field from the document data
      const mediaList = documentSnapshot.data().media_list;
      const topTenIds = mediaList.slice(0, 10);

      console.log('Top ten IDs:', topTenIds);
      return topTenIds;
    } else {
      console.log('Document does not exist');
      return []; // Return null or an appropriate value if the document does not exist
    }
  } catch (error) {
    console.error('Error fetching top ten IDs:', error);
    throw error; // Rethrow the error for handling at a higher level if needed
  }
};