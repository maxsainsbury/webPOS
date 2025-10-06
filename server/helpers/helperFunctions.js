//function to turn the TinyInt datatype from the database into a boolean
const intToBool = (value) => {
    //1 = true, 0 = false
    return (value > 0);
}

//function to turn a boolean into a integer for the database
const boolToInt = (value) => {
    //true = 1, false = 0
    return value ? 1 : 0
}

module.exports = {intToBool, boolToInt};