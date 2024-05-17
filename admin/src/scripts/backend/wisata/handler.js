const { db, bucket } = require('../firebaseAdmin');
const fs = require('fs');
const Path = require('path');

const addWisataHandler = async (request, h) => {
  try {
    const { name, location, openTime, price, detail, mapLocation } = request.payload;
    const image = request.payload.image;

    // Save image to Firebase Storage
    const imagePath = Path.join(__dirname, '../uploads', image.hapi.filename);
    const fileStream = fs.createWriteStream(imagePath);
    await new Promise((resolve, reject) => {
      image.pipe(fileStream);
      image.on('end', resolve);
      image.on('error', reject);
    });

    const uploadResult = await bucket.upload(imagePath, {
      destination: `images/${image.hapi.filename}`,
      public: true,
    });

    // Delete local file after upload
    fs.unlinkSync(imagePath);

    const imageUrl = uploadResult[0].metadata.mediaLink;

    // Save data to Firestore
    const newLocation = {
      name,
      location,
      openTime,
      price,
      detail,
      mapLocation,
      imageUrl,
    };

    const docRef = await db.collection('locations').add(newLocation);

    return h.response({
      status: 'success',
      message: 'Location saved successfully!',
      data: {
        WisataID: docRef.id,
      },
    }).code(201);

  } catch (error) {
    console.error('Error saving location:', error);
    return h.response({
      status: 'error',
      message: 'Failed to save location',
    }).code(500);
  }
};

module.exports = { addWisataHandler };
