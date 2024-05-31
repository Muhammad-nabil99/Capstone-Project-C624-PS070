const { db, storage } = require('../firebase');
const { v4: uuidv4 } = require('uuid');
const { ref, uploadBytes, getDownloadURL, deleteObject } = require('firebase/storage');
const { doc, setDoc, getDoc, updateDoc, deleteDoc } = require('firebase/firestore');

async function addPenginapan(name, location, fasilitas, price, detail, mapLocation, image) {
  const id = uuidv4();
  const storageRef = ref(storage, `penginapan/${id}`);

  try {
    await uploadBytes(storageRef, image);
    const imageUrl = await getDownloadURL(storageRef);
    await setDoc(doc(db, 'penginapan', id), {
      id,
      name,
      location,
      fasilitas,
      price,
      detail,
      mapLocation,
      imageUrl,
    });

    return id;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to add Penginapan');
  }
}

async function getPenginapanById(id) {
  try {
    const docRef = doc(db, 'penginapan', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error('No such document!');
    }
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to fetch Penginapan');
  }
}

async function updatePenginapan(id, name, location, fasilitas, price, detail, mapLocation, newImage) {
  const docRef = doc(db, 'penginapan', id);

  try {
    const updates = { name, location, fasilitas, price, detail, mapLocation };

    if (newImage) {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const oldImageRef = ref(storage, `penginapan/${id}`);
        await deleteObject(oldImageRef);
      }
      const storageRef = ref(storage, `penginapan/${id}`);
      await uploadBytes(storageRef, newImage);
      const newImageUrl = await getDownloadURL(storageRef);
      updates.imageUrl = newImageUrl;
    }

    await updateDoc(docRef, updates);
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to update Penginapan');
  }
}

async function deletePenginapan(id) {
  const docRef = doc(db, 'penginapan', id);
  const storageRef = ref(storage, `penginapan/${id}`);
  
  try {
    await deleteObject(storageRef);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting Penginapan:', error);
    throw new Error('Failed to delete Penginapan');
  }
}

module.exports = { addPenginapan, getPenginapanById, updatePenginapan, deletePenginapan };
