const { db, storage } = require('../firebase');
const { v4: uuidv4 } = require('uuid');

async function addWisata(name, location, openTime, price, detail, mapLocation, image) {
  // Generate a unique ID (UUIDv4)
  const id = uuidv4();

  // Save image to Firebase Storage
  const storageRef = storage.ref();
  const imageRef = storageRef.child(`images/${id}`);

  try {
    // Upload the image
    await imageRef.put(image);

    // Get the image URL
    const imageUrl = await imageRef.getDownloadURL();

    // Save data to Firestore with the generated ID
    await db.collection('wisata').doc(id).set({
      id,
      name,
      location,
      openTime,
      price,
      detail,
      mapLocation,
      imageUrl, // Save the image URL in Firestore
    });

    return id; // Return the generated ID
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to add Wisata');
  }
}

module.exports = { addWisata };
