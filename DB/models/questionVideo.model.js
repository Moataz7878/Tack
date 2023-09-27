import { model, Schema, Types } from "mongoose";
const questionVideoSchema = new Schema( {
  
    test_node:{
      type:String   
    },
    // id الاستاذ
    TeacherId:[{
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
  examVideoId:[
    {
        type:Schema.Types.ObjectId,
        ref:'examVideo'
    }
],


  },
  {
    timestamps: true,
  }
);




const questionVideoModel = model("questionVideo", questionVideoSchema);
export default questionVideoModel;