const { db, storage } = require('../firebase');
const { v4: uuidv4 } = require('uuid');
const { ref, uploadBytes, getDownloadURL, deleteObject } = require('firebase/storage');
const { doc, setDoc, getDoc, updateDoc } = require('firebase/firestore');

async function addWisata(name, location, openTime, price, detail, mapLocation, image) {
  const id = uuidv4();
  const storageRef = ref(storage, `wisata/${id}`);

  try {
    await uploadBytes(storageRef, image);
    const imageUrl = await getDownloadURL(storageRef);
    await setDoc(doc(db, 'wisata', id), {
      id,
      name,
      location,
      openTime,
      price,
      detail,
      mapLocation,
      imageUrl,
    });

    return id;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to add Wisata');
  }
}

async function getWisataById(id) {
  try {
    const docRef = doc(db, 'wisata', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error('No such document!');
    }
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to fetch Wisata');
  }
}

async function updateWisata(id, name, location, openTime, price, detail, mapLocation, image) {
  const docRef = doc(db, 'wisata', id);

  try {
    const updates = { name, location, openTime, price, detail, mapLocation };

    if (image) {
      const storageRef = ref(storage, `wisata/${id}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);
      updates.imageUrl = imageUrl;
    }

    await updateDoc(docRef, updates);
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to update Wisata');
  }
}

async function deleteWisata(id) {
  try {
    const docRef = doc(db, 'wisata', id);
    const storageRef = ref(storage, `wisata/${id}`);
    await deleteObject(storageRef);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to delete Wisata');
  }
}

module.exports = { addWisata, getWisataById, updateWisata, deleteWisata };
