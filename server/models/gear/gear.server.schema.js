module.exports = function (mongoose) {
    var Schema = mongoose.Schema;
    return new Schema({
        name: String,
        userId: ObjectId,
        type: {type: String, enum: ['ROD', 'LINE', 'LEADER', 'REEL', 'PRESENTATION']},
        rodType: {type: String, enum: ['SPINNING', 'CASTING', 'FLY']},
        reelType: {type: String, enum: ['SPINNING', 'CASTING', 'FLY']},
        lineType: {type: String, enum: ['BRAID', 'MONOFILAMENT', 'FLUOROCARBON', 'FLY']},
        presentationType: {type: String, enum: ['LURE', 'FLY', 'BAIT']},
        manufacturer: String,
        model: String,
        description: String,
        notes: String,
        photos: [ObjectId],
        length: Number,
        action: String,
        power: String,
        pieces: String,
        weight: Number,
        gearRatio: Number,
        lineCapacity: Number,
        maxDrag: Number,
        strength: String,
        color: String,
        line: String
    }, {collection: 'User'});

};