const { db, storage } = require('../firebase');
const { v4: uuidv4 } = require('uuid');
const { ref, uploadBytes, getDownloadURL, deleteObject } = require('firebase/storage');
const { doc, setDoc, getDoc, updateDoc, deleteDoc } = require('firebase/firestore');

async function addPenginapan(name, detail, location, fasilitas, price, mapLocation, image) {
  const id = uuidv4();
  const storageRef = ref(storage, `penginapan/${id}`);

  try {
    await uploadBytes(storageRef, image);
    const imageUrl = await getDownloadURL(storageRef);
    await setDoc(doc(db, 'penginapan', id), {
      id,
      name,
      detail,
      location,
      fasilitas,
      price,
      mapLocation,
      imageUrl,
      favourite: 0,
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

async function updatePenginapan(id, updates, newImage) {
  const docRef = doc(db, 'penginapan', id);

  try {
    const penginapanData = await getDoc(docRef);

    if (!penginapanData.exists()) {
      throw new Error('No such document!');
    }

    const existingImageUrl = penginapanData.data().imageUrl;

    if (newImage && newImage.size > 0) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const newImageUrl = event.target.result;

        if (newImageUrl !== existingImageUrl) {
          const storageRef = ref(storage, `penginapan/${id}`);
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
    throw new Error('Failed to update Penginapan');
  }
}

async function deletePenginapan(id) {
  const docRef = doc(db, 'penginapan', id);
  const storageRef = ref(storage, `penginapan/${id}`);
  
  try {
    await deleteDoc(docRef);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting Penginapan:', error);
    throw new Error('Failed to delete Penginapan');
  }
}

module.exports = { addPenginapan, getPenginapanById, updatePenginapan, deletePenginapan };
