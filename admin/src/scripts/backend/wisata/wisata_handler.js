const { db, storage } = require('../firebase');
const { v4: uuidv4 } = require('uuid');
const { ref, uploadBytes, getDownloadURL, deleteObject } = require('firebase/storage');
const { doc, setDoc, getDoc, updateDoc, deleteDoc } = require('firebase/firestore');

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
      favourite: 0,
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

async function updateWisata(id, updates, newImage) {
  const docRef = doc(db, 'wisata', id);

  try {
    const wisataData = await getDoc(docRef);

    if (!wisataData.exists()) {
      throw new Error('No such document!');
    }

    const existingImageUrl = wisataData.data().imageUrl;

    if (newImage && newImage.size > 0) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const newImageUrl = event.target.result;

        if (newImageUrl !== existingImageUrl) {
          const storageRef = ref(storage, `wisata/${id}`);
          await uploadBytes(storageRef, newImage);
          const updatedImageUrl = await getDownloadURL(storageRef);
          updates.imageUrl = updatedImageUrl;
        }

        if (Object.keys(updates).length > 0) {
          await updateDoc(docRef, updates);
        }
      };
      reader.readAsDataURL(newImage);
    } else {
      if (Object.keys(updates).length > 0) {
        await updateDoc(docRef, updates);
      }
    }
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to update Wisata');
  }
}

async function deleteWisata(id) {
  const docRef = doc(db, 'wisata', id);
  const storageRef = ref(storage, `wisata/${id}`);
  
  try {
    await deleteDoc(docRef);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting Wisata:', error);
    throw new Error('Failed to delete Wisata');
  }
}

module.exports = { addWisata, getWisataById, updateWisata, deleteWisata };
