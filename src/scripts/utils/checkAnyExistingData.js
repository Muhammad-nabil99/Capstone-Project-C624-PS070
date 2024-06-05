const chechAnyExistingData = {
    initialize(data){
       return !this._checkData(data)
    },
    _checkData(data){
        return data.length === 0 || data.length === -1;
    }
}

module.exports = chechAnyExistingData;