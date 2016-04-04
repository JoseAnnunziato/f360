module.exports = function (mongoose) {
    var Schema = mongoose.Schema;
    return new Schema({
        spotName: {type: String},
        latitude: {type: Number},
        longitude: {type: Number},
        photos: [Buffer],
        address: {type: String},
        water: {type: String},
        notes: {type: String},
        userId: {type: Schema.ObjectId, ref: 'User'}
    }, {collection: 'Spot'});
};