import mongoose from "mongoose";

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: `{values} is incorrect type of status`,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;

  if (connectionRequest.toUserId.equals(connectionRequest.fromUserId)) {
    throw new Error("cannot send request to yourself");
  }
  next();
});

const connectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

export default connectionRequest;
