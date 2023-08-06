const multer=require('multer');
const sharp=require("sharp");
// path for frist storing images in local and on cloud
const path=require("path");
const fs=require("fs");
const multerStorage=multer.diskStorage({
    //cb is just a call back 
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../public/images"));
    },
    filename:function(req,file,cb){
        const uniqueSuffix=Date.now()+'-'+ Math.round(Math.random()*1e9);
        cb(null,file.fieldname+"-"+uniqueSuffix + ".jpeg");
    },
});


const multerFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb({
            message:"unsupported file format"
        },false);
    }
};


const uploadPhoto=multer({
    storage:multerStorage,
    fileFilter:multerFilter,
    limits:{fileSize:2000000},

})

//resize prodct image
const productImgResize=async(req,res,next)=>{
    if(!req.files)return next();
    await Promise.all(
        req.files.map(async(file)=>{
await sharp(file.path)
.resize(300,300)
.toFormat('jpeg')
.jpeg({quality:90})
.toFile(`public/images/products/${file.filename}`);
fs.unlinkSync(`public/images/products/${file.filename}`);
        })
        );
        next();
}
//same thing for blogs
const blogImgResize=async(req,res,next)=>{
    if(!req.files)return next();
    await Promise.all(
        req.files.map(async(file)=>{
await sharp(file.path)
.resize(300,300)
.toFormat('jpeg')
.jpeg({quality:90})
.toFile(`public/images/products/${file.filename}`);
fs.unlinkSync(`public/images/products/${file.filename}`);
        })
        );
        next();
}

module.exports={uploadPhoto,productImgResize,blogImgResize};
