const mongoose = require('mongose');
mongoose.connect('mongodb://localhost:27017/my_db', {userNewUrlParser:true, useUnifiedTopoLogy: true});
module.exports = mongoose;