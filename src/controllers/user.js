"use strict"

const User = require('../models/user')
const upload = require('../middlewares/multer')
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
        upload.single('image'), // Multer middleware
        async (req, res) => {
            console.log("calisti")
            try {
                // console.log('Request body:', req.body);
                // console.log('Uploaded file:', req.file);

                const { username, first_name, last_name, email, password } = req.body;
                const image = req.file ? req.file.path : null; 

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
                res.status(201).json(newUser);
            } catch (error) {
                console.error('Error registering user:', error);
                res.status(500).send('Error registering user.');
            }
        }
    ],

    // create: async (req, res) => {

    //     const data = await User.create(req.body)
    //     // const data = req.body
       

    //     res.status(201).send({
    //     error: false,
    //     body: req.body,
    //     result: data,
    //     // data:data
    //     })
        
        
    // },

    read: async (req, res) => {

        const userId = req.params.userId
        // const data = await User.findById(req.params.userId)
        const data = await User.findOne({ _id: userId })
        await data.save()
        res.status(200).send({
            error: false,
            result: data
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
        console.log("userid",user);
        //currentUser
        const currentUser = req.user._id
        console.log("current",currentUser);

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