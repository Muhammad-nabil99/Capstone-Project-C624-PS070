const { db, storage } = require('../firebase');
const { v4: uuidv4 } = require('uuid');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { doc, setDoc } = require('firebase/firestore');

async function addWisata(name, location, openTime, price, detail, mapLocation, image) {
  const id = uuidv4();
  const storageRef = ref(storage, `wisata/${id}`);

  try {
    // Upload the image to Firebase Storage
    await uploadBytes(storageRef, image);
    const imageUrl = await getDownloadURL(storageRef); // Get the image URL

    // Save data to Firestore with the generated ID
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

module.exports = { addWisata };
