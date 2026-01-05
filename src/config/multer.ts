import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination:path.resolve(__dirname,"../../uploads"),
    filename:(_,file,cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        cb(null,`${uniqueSuffix}-${file.originalname}`)
    },
})

export const upload =multer({storage})