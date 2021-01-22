const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  title: { type: String, unique: true },
  userId: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  eventBackgroundColor: { type: String, default: "rgb(255,0,0)" },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
