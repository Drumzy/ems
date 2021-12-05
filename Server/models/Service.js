import { Schema, model } from "mongoose";
import { string, validate as _validate } from "joi";
const serviceSchema = new Schema({
    ServiceName: {
        type: String,
        required: true,
        minlength:10,
        maxlength:50,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },


});
const Service = model("Service",serviceSchema);

const validateService = (Service) => {
    const schema = {
        ServiceName: string().min(10).max(50).required(),
    }
    return _validate(Service, schema);
}

export default {Service, validate: validateUser};
