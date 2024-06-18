const { db } = require('../backend/firebase');
const { collection, query, orderBy, getDocs } = require('firebase/firestore');

async function getTopFavourite() {
  const collections = ['kuliner', 'penginapan', 'wisata'];
  const promises = collections.map(async (coll) => {
    const q = query(collection(db, coll), orderBy('favourite', 'desc'));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    const allItems = querySnapshot.docs.map(doc => ({ ...doc.data(), type: coll }));
    const maxFavourite = Math.max(...allItems.map(item => item.favourite));
    const topItems = allItems.filter(item => item.favourite === maxFavourite);
    const randomItem = topItems[Math.floor(Math.random() * topItems.length)];
    return randomItem;
  });

  const results = await Promise.all(promises);
  return results.filter(Boolean);
}

module.exports = { getTopFavourite };
