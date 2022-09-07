const User = require("./User");
const Song = require("./Song");

User.hasMany(Song);
Song.belongsTo(User);

module.exports = {
    User,
    Song
}