const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Song extends Model {}

Song.init({
   song_name: {
         type: DataTypes.STRING,
         allowNull:false,
         unique:true,
    },
   artist: {
        type: DataTypes.STRING,
        allowNull:false,
   },
   genre: {
       type: DataTypes.STRING,
  }
},{
    sequelize,
});

module.exports=Song;