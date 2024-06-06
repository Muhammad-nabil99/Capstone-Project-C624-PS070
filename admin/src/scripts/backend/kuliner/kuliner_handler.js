const { db, storage } = require('../firebase');
const { v4: uuidv4 } = require('uuid');
const { ref, uploadBytes, getDownloadURL, deleteObject } = require('firebase/storage');
const { doc, setDoc, getDoc, updateDoc, deleteDoc } = require('firebase/firestore');

async function addKuliner(name, location, openTime, detail, mapLocation, image) {
  const id = uuidv4();
  const storageRef = ref(storage, `kuliner/${id}`);

  try {
    await uploadBytes(storageRef, image);
    const imageUrl = await getDownloadURL(storageRef);
    await setDoc(doc(db, 'kuliner', id), {
      id,
      name,
      location,
      openTime,
      detail,
      mapLocation,
      imageUrl,
      favourite: 0, // Initialize favourite count to 0
    });

    return id;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to add Kuliner');
  }
}

async function getKulinerById(id) {
  try {
    const docRef = doc(db, 'kuliner', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error('No such document!');
    }
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to fetch Kuliner');
  }
}

async function updateKuliner(id, updates, newImage) {
  const docRef = doc(db, 'kuliner', id);

  try {
    if (newImage) {
      const storageRef = ref(storage, `kuliner/${id}`);
      await uploadBytes(storageRef, newImage);
      const newImageUrl = await getDownloadURL(storageRef);
      updates.imageUrl = newImageUrl;
    }

    if (Object.keys(updates).length > 0) {
      await updateDoc(docRef, updates);
    }
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to update Kuliner');
  }
}

async function deleteKuliner(id) {
  const docRef = doc(db, 'kuliner', id);
  const storageRef = ref(storage, `kuliner/${id}`);
  
  try {
    await deleteDoc(docRef);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting Kuliner:', error);
    throw new Error('Failed to delete Kuliner');
  }
}

module.exports = { addKuliner, getKulinerById, updateKuliner, deleteKuliner };
