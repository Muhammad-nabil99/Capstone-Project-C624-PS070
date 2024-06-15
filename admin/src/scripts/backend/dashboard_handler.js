const { db } = require('./firebase');
const { collection, getDocs } = require('firebase/firestore');

async function getCountOfDocs() {
  try {
    const wisataSnapshot = await getDocs(collection(db, 'wisata'));
    const kulinerSnapshot = await getDocs(collection(db, 'kuliner'));
    const penginapanSnapshot = await getDocs(collection(db, 'penginapan'));

    const counts = {
      wisata: wisataSnapshot.size,
      kuliner: kulinerSnapshot.size,
      penginapan: penginapanSnapshot.size,
    };

    return counts;
  } catch (error) {
    console.error('Error saat mengambil jumlah dokumen:', error);
    throw new Error('Gagal mengambil jumlah dokumen:');
  }
}

module.exports = { getCountOfDocs };
