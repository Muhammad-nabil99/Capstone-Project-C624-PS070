const searchBox = {
    filterData(data, searchTerm) {
        return data.filter(item => 
            item.name.toLowerCase().includes(searchTerm)
        );
    }
};

module.exports = searchBox;
