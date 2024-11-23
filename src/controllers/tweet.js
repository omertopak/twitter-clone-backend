"use strict"

const Tweet = require('../models/tweet')
const User = require('../models/user')
const upload = require('../middlewares/multer')
const sharp = require('sharp');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
module.exports.Tweet = {

    list: async (req, res) => {

        const data = await Tweet.find()

        res.status(200).send({
            error: false,
            count: data.length,
            result: data
        })
    },

    listUser:async (req, res) => {
        const userId = req.params.userId
        // console.log(userId);
        const data = await Tweet.find({user:userId}).populate('user').populate('repliedTo')

        res.status(200).send({
            error: false,
            count: data.length,
            data: data,
        })
    },
    
   
    create: [
        (req, res, next) => {
        upload.array('image')(req, res, async (err) => {
            const userId = req.user._id
            // console.log("images upload run")
            try {
                if (req.files.length > 4) {
                    // console.log("too many files");
                  }
                  // Yüklenen her bir dosya için işlemleri yapın
                  const optimizedImages = [];
                  for (const file of req.files) {
                      const optimizedImageBuffer = await sharp(file.path)
                          .resize(300, 300) // Görseli 300x300 piksele küçült
                          .toFormat('jpeg') // Görseli JPEG formatına çevir
                          .jpeg({ quality: 80 }) // Kaliteyi %80'e düşür
                          .toBuffer(); // Görseli buffer olarak al

                      // Görseli Base64 formatına dönüştür
                      const base64Image = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
                      optimizedImages.push(base64Image);

                      // Geçici dosyayı sil
                      const fs = require('fs');
                      fs.unlinkSync(file.path);
                  }
                // console.log('Request body:', req.body);
                // console.log('Uploaded file:', optimizedImages);
                // console.log('userId:', req.user?._id);
                const { tweet } = req.body; 
                const newTweet = new Tweet({
                    tweet,
                    images:optimizedImages,
                    user:userId
                });
                console.log(newTweet);
                await newTweet.save();
                res.status(201).json(newTweet);
            } catch (error) {
                console.error('Error registering user:', error);
                res.status(500).send(error);
            }
        })}
    ],

    anyUserTweets: async (req, res) => {
        try {
            const data = await Tweet.find()
                .populate('user', 'first_name last_name username image') // Sadece bu alanları getir
                .populate('repliedTo')
                .populate('reposted_by')
                .populate({
                    path: 'repliedTo',
                    populate: {
                        path: 'user',
                        select: 'first_name last_name username image', // repliedTo -> user alanında sadece bunları getir
                    }
                });
    
            const shuffledData = shuffleArray(data);
            const random20Items = shuffledData.slice(0, 10);
                console.log("shuffle");
            res.status(200).send({
                error: false,
                count: random20Items.length,
                result: random20Items,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                error: true,
                message: "An error occurred while fetching tweets.",
            });
        }
    },
    // anyUserTweets: async (req, res) => {
    //     try {
    //         const page = parseInt(req.params.page) || 1;  // Sayfa parametresini integer'a çevir
    //         console.log("Current Page:", page);
    //         const limit = 20; // Her sayfa için kayıt sayısı
    //         const skip = (page - 1) * limit; // Atlama miktarı
    
    //         const data = await Tweet.find()
    //             .populate('user', 'first_name last_name username image')
    //             .populate('repliedTo')
    //             .populate('reposted_by')
    //             .populate({
    //                 path: 'repliedTo',
    //                 populate: {
    //                     path: 'user',
    //                     select: 'first_name last_name username image',
    //                 },
    //             })
    //             .sort({ createdAt: -1 }) // Yeni tweetler önce gelir
    //             .skip(skip) // Sayfalamayı uygular
    //             .limit(limit); // Her istekte belirtilen kadar veri gönderir
    
    //         res.status(200).send({
    //             error: false,
    //             count: data.length,
    //             result: data,
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).send({
    //             error: true,
    //             message: "An error occurred while fetching tweets.",
    //         });
    //     }
    // },
    
    

    
    followingTweets: async (req, res) => {
        try {
            console.log("shuffel");
            const userId = req.user?._id;
            const user = await User.findById(userId).exec();
            // console.log("followingtweets çalisti",user);
            // console.log("followingtweets çalisti",userId);
            
            //! ****************************************
            // console.log('user', req.user);
            // console.log("following_count", user.following_count); 
            //! ****************************************
            
            const followingIds = user.following;
            // console.log(followingIds);
            const tweetPromises = followingIds.map((followingId) => {
                return Tweet.find({
                    $or: [
                        { user: followingId }
                    ]
                }).sort({ 
                    createdAt: -1
                })
                // .populate('user')          // `user` alanını populate et
                .populate('user', 'first_name last_name username image')
                // .populate('repliedTo')      // `repliedTo` alanını populate et
                .populate({
                    path: 'repliedTo',
                    populate: {
                        path: 'user',
                        select: 'first_name last_name username image', // repliedTo -> user alanında sadece bunları getir
                    }
                })
                .populate('reposted_by')    // `reposted_by` alanını populate et
                .exec();
            });
    
            const tweetArrays = await Promise.all(tweetPromises);
            const allTweets = tweetArrays.flat();
            const shuffledData = shuffleArray(allTweets);
            const random20Items = shuffledData.slice(0, 10);

            res.status(200).send({
                error: false,
                count: user.following_count,
                result: random20Items
            });
        } catch (error) {
            console.error('Error fetching following tweets:', error);
            res.status(500).send({
                error: true,
                message: 'Internal server error'
            });
        }
    },
    
    

    createReply: [
        (req, res, next) => {
        upload.array('image')(req, res, async (err) => {
            const tweet_id = req.body?.tweetId || req.params?.tweetId;
            // console.log("body",req.body);  
            try {
                if (req.files.length > 4) {
                    // console.log("too many files");
                  }
                const optimizedImages = [];
                for (const file of req.files) {
                    const optimizedImageBuffer = await sharp(file.path)
                        .resize(300, 300) // Görseli 300x300 piksele küçült
                        .toFormat('jpeg') // Görseli JPEG formatına çevir
                        .jpeg({ quality: 80 }) // Kaliteyi %80'e düşür
                        .toBuffer(); // Görseli buffer olarak al

                    // Görseli Base64 formatına dönüştür
                    const base64Image = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
                    optimizedImages.push(base64Image);

                    // Geçici dosyayı sil
                    const fs = require('fs');
                    fs.unlinkSync(file.path);
                }
                const tweetbody = req.body.tweet
                const userId = req.user._id  
                const newTweet = new Tweet({
                    tweet:tweetbody,
                    repliedTo:tweet_id,
                    user:userId,
                    images:optimizedImages
                });
                // console.log("new tweet",newTweet);
                await newTweet.save();
                await Tweet.updateOne({ _id: tweet_id }, { $push: { replies: newTweet._id } }) 
                const tweet1 = await Tweet.findById(tweet_id);
                await tweet1.save();
                console.log("ilk tweet",tweet1);
                // console.log(newTweet);

                res.status(201).json(newTweet);
            } catch (error) {
                console.error('Error registering user:', error);
                res.status(500).send(error);
            }
        })}
    ],

    createRetweet: async (req, res) => {
        let message = ""
        const user_id = req.user._id
        const tweet_id = req.params?.tweetId
        // console.log("user  tweet",user_id,tweet_id);
        const check = await Tweet.findOne({_id: tweet_id, reposted_by :user_id})
        // console.log(check);
        if(check){
            await Tweet.updateOne({ _id: tweet_id },{ $pull: { reposted_by: user_id}})

            message = "you undo your retweet."
        }else{
            await Tweet.updateOne({ _id: tweet_id },{ $push: { reposted_by: user_id}})
            message = "you retweeted."
        }
        console.log(message);
        const result = await Tweet.findOne({ _id: tweet_id })
        // console.log("tweet",check);
        const tweet = await Tweet.findById(tweet_id);
        await tweet.save();

        res.status(202).send({
            error: false,
            message:message,
            result: result,
            
        })
    },

    read: async (req, res) => {

        const user_id = req.user._id

        await Tweet.updateOne({ _id: req.params.tweetId },{ $addToSet: { tweet_viewers: user_id} })
        
        const tweet = await Tweet.findOne({ _id: req.params.tweetId }).populate('user').populate({
            path: 'replies',
            populate: {
              path: 'user',
            }
          })
        await tweet.save()
        res.status(200).send({
            error: false,
            result: tweet
        })

    },

    fav: async (req, res) => {
        try {  // try-catch ekleyelim
            let message = "";
            const user_id = req.user?._id;
            const tweet_id = req.params?.tweetId;
    
            // İlk hatanız burada: tweet'i bulup check değişkenine atıyorsunuz
            // ama sonra updateOne ile güncelleyip tweet'i tekrar bulmaya çalışıyorsunuz
            // Bunun yerine, tek bir tweet dökümanı üzerinde işlem yapalım:
            
            const tweet = await Tweet.findById(tweet_id);
            if (!tweet) {
                return res.status(404).json({
                    error: true,
                    message: "Tweet not found"
                });
            }
    
            // Kullanıcının favorite yapıp yapmadığını kontrol et
            const isLiked = tweet.favorites.includes(user_id);
    
            if (isLiked) {
                // Favorilerden çıkar
                tweet.favorites = tweet.favorites.filter(id => !id.equals(user_id));
                message = "you disliked a post";
            } else {
                // Favorilere ekle
                tweet.favorites.push(user_id);
                message = "you liked a post";
            }
    
            // Count'u otomatik güncelle
            tweet.favorite_count = tweet.favorites.length;
    
            // Değişiklikleri kaydet
            await tweet.save();
    
            res.status(202).json({
                error: false,
                message: message,
                result: tweet
            });
    
        } catch (error) {
            res.status(500).json({
                error: true,
                message: error.message
            });
        }
    },

    bookmark : async (req, res) => {
        let message = ""
        const user_id = req.user?._id
        const tweet_id = req.params?.tweetId
        const check = await User.findOne({_id: user_id, bookmarks :tweet_id})
        // console.log(user_id,tweet_id,check);
        if(check){
            await User.updateOne({ _id: user_id }, { $pull: { bookmarks: tweet_id } })
            await Tweet.updateOne({ _id: tweet_id }, { $pull: { bookmarks: user_id } })
            message = "you removed a post from your bookmarks"
            
        }else{
            await User.updateOne({ _id: user_id }, { $push: { bookmarks: tweet_id } })
            await Tweet.updateOne({ _id: tweet_id }, { $push: { bookmarks: user_id } })
            message = "you added a post to your bookmarks"
        }  
        console.log(message);  
        const tweet = await Tweet.findById(tweet_id) 
        await tweet.save();

        res.status(202).send({
            error: false,
            message:message,
        })
    },
    
    delete: async (req, res) => {
        
        const user_id = req.user?._id
        const tweet = await Tweet.findOne({_id: req.params?.tweetId})
        const tweet_user = tweet.user
        let message = ''

        if(tweet){
            if(user_id == tweet_user){
                await Tweet.deleteOne({ _id: req.params.tweetId })
                message="deleted"
            }else{
                message="unauthorized"
            }
        }else{
            message="tweet not found"
        }
        await tweet.save();

        res.status(202).send({
            error: false,
            message:message,
        })
    },
}