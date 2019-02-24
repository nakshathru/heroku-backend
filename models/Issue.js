const mongoose =require ('mongoose');
const Schema = mongoose.Schema;

let Song = new Schema({
    name: {
        type: String
    },
    artists: {
        type: String 
    },
    danceability: {
        type: String
    },
    energy: {
        type: String
    },
    rank: {
        type: String
        
    },
    duration_ms:{
        type:String
    }


});

export default mongoose.model('Song', Song);