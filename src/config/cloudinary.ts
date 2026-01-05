import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
; // garante que .env é carregado ANTES de configurar


cloudinary.config({
  cloud_url: process.env.CLOUDINARY_URL, 
});

export default cloudinary;
