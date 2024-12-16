import { model, Schema, Types } from "mongoose";
const examSchema = new Schema( {
    //اسم الماده
  subject_Name:{
    type:String,
    require:true
    },
    time:{
        type:Number
      },
      exam_Name:{
        type:String
        },
        kindOf_questions:{
            type:String,
            require:true
            },
    // id الاستاذ
    createdby:[{
      type:Schema.Types.ObjectId,
          ref:'User',
          require:true
    }],

    question:[
        {
            type:Schema.Types.ObjectId,
            ref:'question'
        }
    ],

    Grades:[
      {
          type:Schema.Types.ObjectId,
          ref:'grades'
      }
  ],

  creatdUser:[{
    type:Schema.Types.ObjectId,
    ref:'User'
  },{
    type:String
  }],
  // degree:{
  //   type:Number
  // }

  },
  {
    timestamps: true,
  }
);




const examModel = model("exam", examSchema);

export default examModel;















