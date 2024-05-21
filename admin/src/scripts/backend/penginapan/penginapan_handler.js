const { db, storage } = require('../firebase');
const { v4: uuidv4 } = require('uuid');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { doc, setDoc } = require('firebase/firestore');

async function addPenginapan(name, location, openTime, price, detail, mapLocation, image) {
  const id = uuidv4();
  const storageRef = ref(storage, `penginapan/${id}`);

  try {
    await uploadBytes(storageRef, image);
    const imageUrl = await getDownloadURL(storageRef);

    await setDoc(doc(db, 'penginapan', id), {
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
    throw new Error('Gagal Menambah Data Penginapan');
  }
}

module.exports = { addPenginapan };
