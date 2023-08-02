import { model, Schema, Types } from "mongoose";
const gradesSchema = new Schema( {

    grades:{
    type:String,
    require:true
    },
    //اسم الماده
  subject_Name:{
    type:String,
    require:true
    },
    // id الاستاذ
    createdby:[{
      type:Schema.Types.ObjectId,
          ref:'User',
          require:true
    }],

    exam:[
        {
            type:Schema.Types.ObjectId,
            ref:'exam'
        }
    ]

  },
  {
    timestamps: true,
  }
);




const gradesModel = model("grades", gradesSchema);

export default gradesModel;















