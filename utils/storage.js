
const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open("myDatabase", 1);

    openRequest.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('movieDataStore')) {
        db.createObjectStore('movieDataStore');
      }
    };

    openRequest.onsuccess = (event) => {
      resolve(event.target.result);
    };

    openRequest.onerror = (event) => {
      reject('Failed to open database');
    };
  });
};

const storeInIndexedDB = async (key, data) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction('movieDataStore', 'readwrite');
    const store = transaction.objectStore('movieDataStore');
    const request = store.put(data, key);

    request.onsuccess = () => {
      console.log('Data successfully stored in IndexedDB');
    };

    request.onerror = () => {
      console.error('Failed to store data in IndexedDB');
    };

  } catch (error) {
    console.error('Failed to store data in IndexedDB', error);
  }
};



const getFromIndexedDB = async (key) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction('movieDataStore', 'readonly');
    const store = transaction.objectStore('movieDataStore');
    const request = store.get(key);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject('Failed to get data from IndexedDB');
      };
    });

  } catch (error) {
    console.error('Failed to get data from IndexedDB', error);
  }
};


export { storeInIndexedDB, getFromIndexedDB };
