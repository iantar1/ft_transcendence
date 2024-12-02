

export const readData = (function() {
    let data = [];

    return {
        getData: function() {
            return data;
        },
        setData: function(newData) {
            // console.log("inside readdata" + newData);
            data = newData;
        },
        addData: function(item) {
            data.push(item);
        }
    };
})();

