import { model, Schema } from "mongoose";

interface Request {
  singers: object;
  song: object;
}

const requestSchema = new Schema<Request>({
  song: {
    type: String,
    required: [true, "Please submit a song!"],
  },
  singers: {
    type: String,
    required: [true, "Please select a singer"],
  },
});

const Request = model<Request>("Request", requestSchema);

module.exports = Request;
