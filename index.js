const express=require('express');
const dbConnect = require('./config/dbconnect');
const app=express()
const dotenv=require('dotenv').config()
const PORT=process.env.PORT || 4000;
const authRouter=require("./routes/authRoute");
const bodyParser = require('body-parser');
const { notfound, errorHandler } = require('./middlewares/errorHandler');
const productRouter=require("./routes/productRoute");
const blogRouter=require("./routes/blogRoute");
const enqRouter = require("./routes/enqRoute");
const categoryRouter=require("./routes/prodcategoryRoute");
const blogcategoryRouter=require("./routes/blogCatRoutes");
const brandRouter=require("./routes/brandRoute");
const couponRouter=require("./routes/couponRoute");
const cookieParser=require('cookie-parser');
const morgan=require('morgan');
dbConnect();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use("/api/user",authRouter);
app.use("/api/product",productRouter);
app.use("/api/blog",blogRouter);
app.use("/api/category",categoryRouter);
app.use("/api/blogcategory",blogcategoryRouter);
app.use("/api/brand",brandRouter);
app.use("/api/enquiry", enqRouter);
app.use("/api/coupon",couponRouter);
app.use(notfound);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
});