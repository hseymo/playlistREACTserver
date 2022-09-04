const User = require("./User");
const Song = require("./Song");

User.hasMany(Song);
Song.belongsTo(User);

// could be many to many; 
// User.belongsToMany(Song, {
//     through: "UserSong"
// })
// Song.belongsToMany(User,{
//     through: "UserSong"
// })
// would have to update seeds with 'addSong', / 'addUser' methods in feedMe OR seed the junction table directly

// could add in artist and genre seperate from song

module.exports = {
    User,
    Song
}