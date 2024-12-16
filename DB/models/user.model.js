// import { hashSync } from "bcryptjs";
import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema(
  {
    // الاسم
    name: {
    type:String,
    require:true
    },
    // الصف
    the_grades:{
      type:String
    },
    // مدرسه
    school:{
      type:String
    },
    // محافظه
    governorate:{
     type:String
    },
    // تلفون
    phone:{
      type:String
    },
    profile_pic: String,
  
    public_id: String,

    // المنطقه
    Area:{
      type:String,
    },
        // الايميل 
        email: {
          type: String,
          require:true
        },
    // كلمه السر
    password: {
      type:String,
      require:true
    },

    material:{
      type:String,
    },


    role: {
      type: String,
      enum: ['Admin','Student','Teacher','Parent'],
      require:true
  },
 
    isLoggedIn: {
      type: Boolean,
      default: false,
    },

    follow:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],

    followStudent:[{
      type:Schema.Types.ObjectId,
      ref:'User'
  }],
  addFolowers:{
    type:Number,
    default:0
  },
  confirm:{
    type:Number,
    default:0

  },
  aitashab:{
    type:Number,
    default:0

  },
  
  Equation:{
    type:Number,
    default:0

  },
  isLoggeConfim:{
    type:Boolean,
    default:false
  },
  confirmTeachers:{
    type:Boolean,
    default:false
  }


  
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next, doc) {
  this.password = bcrypt.hashSync(this.password, +process.env.SALT_ROUNDS);
  next();
});


const userModel = model("User", userSchema);

export default userModel;
