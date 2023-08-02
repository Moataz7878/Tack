import { model, Schema, Types } from "mongoose";
const questionSchema = new Schema( {
  
    test_node:{
      type:String   
    },
    // id الاستاذ
    createdby:[{
      type:Schema.Types.ObjectId,
          ref:'User',
          require:true
    }],
    // السوال
    question: {
      type: String,
      require:true
  },
  profile_pic: String,
  
  public_id: String,
  // الاجابه
  correct_Answer:{
    type:String,
    require:true
  },
  choose2:{
    type:String,

  },
  choose3:{
    type:String
  },
  choose4:{
    type:String
  },
  exam:[
    {
        type:Schema.Types.ObjectId,
        ref:'exam'
    }
],


  },
  {
    timestamps: true,
  }
);




const questionModel = model("question", questionSchema);

export default questionModel;















