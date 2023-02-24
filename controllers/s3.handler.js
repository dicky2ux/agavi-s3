const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
dotenv.config();


const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

module.exports = {
    s3Upload: async (req, res, next) => {
        try {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `${uuidv4()}.mp4`,
                Body: req.file.buffer
            };
            const command = new PutObjectCommand(params);
            const data = await s3.send(command);
            res.status(200).json({
                message: 'Upload success',
                uuid: params.Key.split('.')[0],
            });
        } catch (error) {
            next(error);
        }
    },
    s3Fetch : async (req, res, next) => {
        try {
            const uuid = req.params.uuid;
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `${uuid}.mp4`
            };
            const command = new GetObjectCommand(params);
            const data = await s3.send(command);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            res.status(200).json({
                message: 'Fetch success',
                data: url
            });
        } catch (error) {
            next(error);
        }
    },
    s3Delete: async (req, res, next) => {
        try {
            const uuid = req.params.uuid;
            console.log(uuid);
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `${uuid}.mp4`
            };
            const command = new DeleteObjectCommand(params);
            const data = await s3.send(command);
            
            res.status(200).json({
                message: 'Delete success',
                data: data
            });
        } catch (error) {
            next(error);
        }
    }
}

