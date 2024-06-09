const FavoriteTourDB = require("../../public/data/favoriteWisatadb");
const { createLikeButtonTemplate, createLikedButtonTemplate } = require("../views/templates/template-creator");
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c07a30783e3efb36339c9df8f2e78168ac17179d
>>>>>>> 71668447e4aeb4c791a670b136de97493ab2cccc
const { doc, updateDoc, increment } = require('firebase/firestore');
const { db } = require('../backend/firebase');

const likeButtonInitiator = {
  init({ button, item, type }) {
    this._button = button;
    this._item = item;
    this.assignAPropertyToTheExistingObj(item, type);
    this._renderButton();
  },
  
  async assignAPropertyToTheExistingObj(obj, newproperty) {
    obj["type"] = newproperty;
  },
  
  async _renderButton() {
    const { id } = this._item;
    console.log(await FavoriteTourDB.default.getAllTours());
    if (await this.isTourExist(id)) {
      this._renderLiked(id);
    } else {
      this._renderLike();
    }
  },
  
  async isTourExist(id) {
    const Tour = await FavoriteTourDB.default.getTour(id);
    return !!Tour;
  },
  
  async _updateFavouriteCount(incrementValue) {
    const docRef = doc(db, this._item.type, this._item.id);
    try {
      await updateDoc(docRef, {
        favourite: increment(incrementValue),
      });
    } catch (error) {
      console.error('Error updating favourite count:', error);
    }
  },
  
  _renderLike() {
    this._button.innerHTML = createLikeButtonTemplate();
    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteTourDB.default.putTour(this._item);
      await this._updateFavouriteCount(1);
      this._renderButton();
    });
  },
  
  _renderLiked(id) {
    this._button.innerHTML = createLikedButtonTemplate();
    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteTourDB.default.deleteTour(id);
      await this._updateFavouriteCount(-1);
      this._renderButton();
    });
  },
};

module.exports = likeButtonInitiator;
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======

const likeButtonInitiator = {
    init({button,item,type}){
        this._button = button;
        this._item = item;
        this.assignAPropertyToTheExistingObj(item,type)
        this._renderButton();
    },
    async assignAPropertyToTheExistingObj(obj,newproperty){
        // assigned a type key on item obj as a property
        obj["type"] = newproperty;
    },
    async _renderButton(){
        const {id} = this._item;
        console.log(await FavoriteTourDB.default.getAllTours());
        if(await this.isTourExist(id)){
            this._renderLiked(id)
        }else{
            this._renderLike()
        }
    },
    async isTourExist(id){
        const Tour = await FavoriteTourDB.default.getTour(id);
        return !!Tour;
    },
    _renderLike() {
        this._button.innerHTML = createLikeButtonTemplate();
        const likeButton = document.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
          await FavoriteTourDB.default.putTour(this._item);
          this._renderButton();
        });
    },
    _renderLiked(id) {
        this._button.innerHTML = createLikedButtonTemplate();
        const likeButton = document.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
          await FavoriteTourDB.default.deleteTour(id);
          this._renderButton();
        });
    },
    
    
}

module.exports = likeButtonInitiator;
>>>>>>> 64c6a8baa2eb41130a033cbb1ebee2edf1ea0735
>>>>>>> c07a30783e3efb36339c9df8f2e78168ac17179d
>>>>>>> 71668447e4aeb4c791a670b136de97493ab2cccc
