exports.validateJson = function(data){
    var jsonData;
    try {
        if (typeof data === 'object')
            jsonData = data; // dont parse if its object
        else if (typeof data === 'string')
            jsonData = JSON.parse(data);
        // jsonData = JSON.parse(data);
    } catch (e) {
        console.log(e.message);
        jsonData = data;
    }
    return jsonData;
};


