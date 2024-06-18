const { db } = require('./firebase');
const { collection, getDocs } = require('firebase/firestore');

async function getCountOfDoc() {
    const wisataSnapshot = await getDocs(collection(db, 'wisata'));
    const kulinerSnapshot = await getDocs(collection(db, 'kuliner'));
    const penginapanSnapshot = await getDocs(collection(db, 'penginapan'));

    const counts = {
      wisata: wisataSnapshot.size,
      kuliner: kulinerSnapshot.size,
      penginapan: penginapanSnapshot.size,
    };

    return counts;
}

module.exports = getCountOfDoc;