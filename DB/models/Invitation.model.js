// import { hashSync } from "bcryptjs";
import { model, Schema } from "mongoose";
const InvitationSchema = new Schema(
  {
    idUser:[
      {
          type:Schema.Types.ObjectId,
          ref:'User',
        require:true

      }
  ],
  toUserId:[
    {
        type:Schema.Types.ObjectId,
        ref:'User',
        require:true

    }
],
  idexam:[
    {
        type:Schema.Types.ObjectId,
        ref:'exam',
        require:true

    }
]



  },
  {
    timestamps: true,
  }
);




const InvitationModel = model("Invitation", InvitationSchema);

export default InvitationModel;
