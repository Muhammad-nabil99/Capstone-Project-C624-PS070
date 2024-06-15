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
      favourite: 0,
    });

    return id;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Gagal menambah data Kuliner');
  }
}

async function getKulinerById(id) {
  try {
    const docRef = doc(db, 'kuliner', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error('Dokumen tidak ditemukan!');
    }
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Gagal mengambil data Kuliner');
  }
}

async function updateKuliner(id, updates, newImage) {
  const docRef = doc(db, 'kuliner', id);

  try {
    const kulinerData = await getDoc(docRef);

    if (!kulinerData.exists()) {
      throw new Error('Dokumen tidak ditemukan!');
    }

    const existingImageUrl = kulinerData.data().imageUrl;

    if (newImage && newImage.size > 0) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const newImageUrl = event.target.result;

        if (newImageUrl !== existingImageUrl) {
          const storageRef = ref(storage, `kuliner/${id}`);
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
    throw new Error('Gagal memperbarui data Kuliner');
  }
}

async function deleteKuliner(id) {
  const docRef = doc(db, 'kuliner', id);
  const storageRef = ref(storage, `kuliner/${id}`);
  
  try {
    await deleteDoc(docRef);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error menghapus data Kuliner:', error);
    throw new Error('Gagal menghapus data Kuliner');
  }
}

module.exports = { addKuliner, getKulinerById, updateKuliner, deleteKuliner };
