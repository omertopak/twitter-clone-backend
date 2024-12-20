"use strict"

const User = require('../models/user')
const upload = require('../middlewares/multer')
const sharp = require('sharp');
const defaultBase64 = require('../helpers/data');

module.exports.User = {

    list: async (req, res) => {

        const data = await User.find()

        res.status(200).send({
            error: false,
            count: data.length,
            result: data
        })
    },
    
   
    create: [
        (req, res, next) => {
            upload.single('image')(req, res, async (err) => {
                if (err) {
                    return res.status(400).send({ error: 'Dosya yükleme hatası' });
                }
                if (req.file) {
                    try {
                        // Görseli yeniden boyutlandır ve base64 formatına dönüştür
                        const optimizedImageBuffer = await sharp(req.file.path)
                            .resize(300, 300) // Görseli 300x300 piksele küçült
                            .toFormat('jpeg') // Görseli JPEG formatına çevir
                            .jpeg({ quality: 80 }) // Kaliteyi %80'e düşür
                            .toBuffer(); // Görseli buffer olarak al
    
                        // Base64 formatına dönüştür
                        req.file.optimizedBase64 = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
    
                        // Orijinal dosyayı silmek isterseniz
                        const fs = require('fs');
                        fs.unlinkSync(req.file.path); // Geçici dosyayı sil
    
                    } catch (error) {
                        return res.status(500).send({ error: 'Görsel işleme hatası' });
                    }
                }
                next();
            });
        },
        async (req, res) => {
            try {
                const { username, first_name, last_name, email, password } = req.body;
                // const image = req.file ? req.file.path : null; 
                const defaultImage = ""
                const image = req.file ? req.file.optimizedBase64 : defaultBase64;

                const newUser = new User({
                    username,
                    first_name,
                    last_name,
                    email,
                    password,
                    image,
                });
    
                console.log(newUser);
                await newUser.save();
                res.status(201).json(newUser); // Yanıt gönderme işlemi yalnızca bir kez yapılır
                console.log("kayit");

            } catch (error) {
                res.status(500).send('Error registering user.');
            }
        }
    ],
    


    read: async (req, res) => {

        const userId = req.params.userId
        // const data = await User.findById(req.params.userId)
        const data = await User.findOne({ _id: userId }).populate('bookmarks')
        await data.save()
        res.status(200).send({
            error: false,
            data: data
        })

    },

    update: async (req, res) => {
        
        // const data = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true }) // return new-data
        await User.updateOne({ _id: req.params.userId }, req.body, { runValidators: true })
        const data = await User.findOne({ _id: req.params.userId })

        res.status(202).send({
            error: false,
            result: data, 
        })

    },

    delete: async (req, res) => {
        
        const data = await User.deleteOne({ _id: req.params.userId })

        res.sendStatus( (data.deletedCount >= 1) ? 204 : 404 ).send({
            error:!data.deletedCount,
            data
        })

    },
    //follow-unfollow
    follow: async (req, res) => {
        //user
        const user = req.params.userId
        // console.log("userid",user);
        //currentUser
        const currentUser = req.user._id
        // console.log("current",currentUser);

        let message = ''
        const userData = await User.findOne({ _id: user })
        const currentData = await User.findOne({ _id: currentUser })
        
        if (!userData.followers.includes(currentUser)) {
            await userData.updateOne({
              $push: { followers: currentUser },
            });
            await currentData.updateOne({ $push: { following: user } });
            message = `you followed ${userData.username}`
          } else {
            await userData.updateOne({
                $pull: { followers: currentUser },
              });
              await currentData.updateOne({ $pull: { following: user } });
              message = `you unfollowed ${userData.username}`
          }
          
          const user1 = await User.findById(user);
          const user2 = await User.findById(currentUser);
          await user1.save()
          await user2.save()


          res.status(202).send({
            error: false,
            result: message, 
        })

    },

    
}