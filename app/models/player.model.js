module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      playerID: {
        type: Number,
        required: true,
        unique: true
      },
      playerName: {
        type: String,
        required: true,
      },
      tokenID: {
        type: Number,
        required: true,
        unique: true,
      },
      score: {
        type: Number,
        default: 0
      }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Player = mongoose.model("player", schema);
  return Player;
};
