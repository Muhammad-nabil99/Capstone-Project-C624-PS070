const { db, storage } = require('../firebase');
const { v4: uuidv4 } = require('uuid');
const { ref, uploadBytes, getDownloadURL, deleteObject } = require('firebase/storage');
const { doc, setDoc, getDoc, updateDoc } = require('firebase/firestore');

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

async function updateKuliner(id, name, location, openTime, detail, mapLocation, newImage) {
  const docRef = doc(db, 'kuliner', id);

  try {
    const updates = { name, location, openTime, detail, mapLocation };

    if (newImage) {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const oldImageRef = ref(storage, `kuliner/${id}`);
        await deleteObject(oldImageRef);
      }
      const storageRef = ref(storage, `kuliner/${id}`);
      await uploadBytes(storageRef, newImage);
      const newImageUrl = await getDownloadURL(storageRef);
      updates.imageUrl = newImageUrl;
    }

    await updateDoc(docRef, updates);
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to update Kuliner');
  }
}

async function deleteKuliner(id) {
  const docRef = doc(db, 'kuliner', id);
  const storageRef = ref(storage, `kuliner/${id}`);
  
  try {
    await deleteObject(storageRef);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting Kuliner:', error);
    throw new Error('Failed to delete Kuliner');
  }
}

module.exports = { addKuliner, getKulinerById, updateKuliner, deleteKuliner };
