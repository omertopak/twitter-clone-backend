"use strict"

const Tweet = require('../models/tweet')
const User = require('../models/user')
const upload = require('../middlewares/multer')

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
        const data = await Tweet.find({user:userId})

        res.status(200).send({
            error: false,
            count: data.length,
            result: data
        })
    },
    
    //* old create
    // create: async (req, res) => {
    //     const tweet = req.body
    //     console.log("user",req.user);
    //     tweet.user = req.user._id 
    //     const data = await Tweet.create(tweet)
    //     res.status(201).send({
    //     error: false,
    //     result: data,
    //     })
    // },
    
    create: [
        upload.array('image'),
        
        async (req, res) => {
            const userId = req.user._id
            console.log("images upload run")
            try {
                if (req.files.length > 4) {
                    console.log("too many files");
                  }
                console.log('Request body:', req.body);
                console.log('Uploaded file:', req.files);
                console.log('userId:', req.user?._id);
                const { tweet } = req.body;
                const images = req.files ? req.files.map(file => file.path) : null; 
                const newTweet = new Tweet({
                    tweet,
                    images,
                    user:userId
                });
                console.log(newTweet);
                await newTweet.save();
                res.status(201).json(newTweet);
            } catch (error) {
                console.error('Error registering user:', error);
                res.status(500).send(error);
            }
        }
    ],

    anyUserTweets: async (req, res) => {
        
        //const userId = req.params.userId
        // const data = await Tweet.find({$and: [{user: userId},{reposted_by:userId}] }).sort({
        //     createAt: -1,
        //   });

        const data = (await Tweet.find().populate('user'))
       
        // const forYou = data.filter((tweet)=>tweet.user.private==false)
        // const forYou = data.filter((tweet)=>console.log(tweet.user.private))
        const shuffledData = shuffleArray(data);
        const random20Items = shuffledData.slice(0, 20);
        
        res.status(200).send({
            error: false,
            count: random20Items.length,
            result: random20Items
        })
    },

    // followingTweets:async (req, res) => {
    //     console.log("followingtweets calisti");
    //     const userData = req.user
    //     console.log('user',req.user);
    //     const followersTweets=[]
    //     console.log("following",userData.following_count);
    //     if(userData.following_count>0){
    //     followersTweets = await Promise.all(
    //       userData.following?.map((followingId) => {
    //         return Tweet.find({ $and: 
    //             [{user: followingId},
    //             {reposted_by:followingId}] })
    //             .sort({
    //                 createAt: -1,
    //               });
    //       })
    //     );}

    //     res.status(200).send({
    //         error: false,
    //         // count: followersTweets.length,
    //         result: followersTweets
    //     })
    // },
    
    followingTweets: async (req, res) => {
        try {
            console.log("followingtweets çalisti");
    
            const userId = req.user?._id;
            const user = await User.findById(userId).exec();
            
            console.log('user', req.user);
            console.log("following_count", user.following_count); 
            
            const followingIds = user.following;
    
            const tweetPromises = followingIds.map((followingId) => {
                return Tweet.find({
                    $or: [
                        { user: followingId },
                        { reposted_by: followingId }
                    ]
                }).sort({ 
                    createdAt: -1
                }).exec();
            });
    
            const tweetArrays = await Promise.all(tweetPromises);
            const allTweets = tweetArrays.flat();
    
            res.status(200).send({
                error: false,
                count: user.following_count,
                result: allTweets
            });
        } catch (error) {
            console.error('Error fetching following tweets:', error);
            res.status(500).send({
                error: true,
                message: 'Internal server error'
            });
        }
    },
    
    

    createReply: async (req, res) => {
        
        const tweet_id = req.body?.tweetId || req.params?.tweetId;
        console.log("body",req.body);
        let reply = {}
        reply.tweet = req.body.tweet
        reply.repliedTo = tweet_id
        reply.user = req.user._id 
        // console.log(reply)
        const replyTweet = await Tweet.create(reply)

        await Tweet.updateOne({ _id: tweet_id }, { $push: { replies: replyTweet._id } }) 

        const newTweet = await Tweet.findOne({ _id: tweet_id })

        res.status(201).send({
        error: false,
        result: newTweet,
        })
    },

    createRepost: async (req, res) => {
        let message = ""
        const user_id = req.user._id
        const tweet_id = req.params?.tweetId
        console.log("user  tweet",user_id,tweet_id);
        const check = await Tweet.findOne({_id: tweet_id, reposted_by :user_id})
        
        if(check){
            await Tweet.updateOne({ _id: tweet_id },{ $pull: { reposted_by: user_id} })
            message = "you undo your retweet."
        }else{
            await Tweet.updateOne({ _id: tweet_id },{ $push: { reposted_by: user_id} })
            message = "you retweeted."
        }

        const result = await Tweet.findOne({ _id: tweet_id })
        
        res.status(202).send({
            error: false,
            message:message,
            result: result,
            
        })
    },

    read: async (req, res) => {

        const user_id = req.user._id

        await Tweet.updateOne({ _id: req.params.tweetId },{ $addToSet: { tweet_viewers: user_id} })
        
        const data = await Tweet.findOne({ _id: req.params.tweetId })
        
        res.status(200).send({
            error: false,
            result: data
        })

    },

    fav : async (req, res) => {
        let message = ""
        const user_id = req.user?._id
        const tweet_id = req.params?.tweetId
        const check = await Tweet.findOne({_id: tweet_id, favorites :user_id})
        
        if(check){
            await Tweet.updateOne({ _id: tweet_id }, { $pull: { favorites: user_id } })
            message = "you disliked a post"
        }else{
            await Tweet.updateOne({ _id: tweet_id }, { $push: { favorites: user_id } })
            message = "you liked a post"
        }
        
        const result = await Tweet.findOne({ _id: tweet_id })
        res.status(202).send({
            error: false,
            message:message,
            result: result,
            
        })
    },
   
    bookmark : async (req, res) => {
        let message = ""
        const user_id = req.user?._id
        const tweet_id = req.params?.tweetId
        const check = await User.findOne({_id: user_id, bookmark :tweet_id})
        
        if(check){
            await User.updateOne({ _id: user_id }, { $pull: { bookmark: tweet_id } })
            message = "you removed a post from your bookmarks"
        }else{
            await User.updateOne({ _id: user_id }, { $push: { bookmark: tweet_id } })
            message = "you added a post to your bookmarks"
        }
        
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
       
        res.status(202).send({
            error: false,
            message:message,
        })
    },
}