# todo-backend-api
### CRUD Operations:
CRUD stands for Create, Read, Update and Delete. Which are the basic operations that a simple web app would be designed to achieve.

### Getting Started:
1- Install Node.js from the Node.js website
2- I’ve created a directory called ‘Blog_api’.
3- Inside the newly created directory, execute the following command in the terminal

```
npm init
```
The above commands results in creating a package.json file. The package.json file is used to manage the locally installed npm packages. It also includes the meta data about the project such as name and version number.

Afterwards, we need to install the packages we will be using for our API
The packages are:
1- ExpressJS: It’s a flexible Node.JS web appplication that has many features for web and mobile applications
2- mongoose: the mongoDB ODM for Node.JS.
3- body-parser: package that can be used to handle JSON requests.

We can install the above mentioned packages via typing the following commands in the command line. Just make sure that you are in the project directory before executing the below command.

```
npm install --save express body-parser mongoose
```

### Initializing the Server:
Create a new file, let’s name it app.js directly inside the ProductsApp directory
```
touch app.js
```

Open the newly created file named app.js and require all the dependencies we previously installed
```
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();
```
Install env
```
npm install dotenv
```
Next step would be dedicating a port number and telling our express app to listen to that port.
```
const port = process.env.PORT || 5000;
```
Now, we should be able to test our server using the following command in the terminal
```
node app.js
```

### Organizing our application:
We will be working with a design pattern called MR. 
Its a neat way of separating parts of our app and grouping them based on their functionality and role. 
M stands for models, this will include all the code for our database models .
R stands for Routes, they guide, they tell the client (browser/mobile app) to go to which Controller once a specific url/path is requested.

Let’s start by defining our model. Create a new file in the models directory and let’s name it Post.js
```
const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
});

 const Post = module.exports=mongoose.model('Post', PostSchema);
```
 Let’s start imagining how the urls will be like. Let’s desigin our routes.

Inside the routes directory, create a post.js file. This is the file that will include the routes of the app.

```
const express = require('express');
const router= express.Router();
const Post = require('../../models/Post');

//get all the posts
router.get('/',(req,res,next)=> {
Post.find()
if(this.post.length>0){
res.json(post)
}else{
    res.status(404).json({message:'Its empty..Add some..'})
}
})
//create a post
router.post('/add',(req,res,next)=> {
    const title=req.body.title;
    const body = req.body.body;
 let newPost= new Post({
        title:title,
        body:body
    })
    if( newPost.save()) {
        res.status(201).json(newPost)
    }else
   res.status(404).send('error')
})

//to update a post
router.put('/update/:id',(req,res,next) => {
let id= req.params.id;
//find the post by id from the database
Post.findById(id)
if(post!=null){
    post.title=req.body.title;
    post.body = req.body.body;
    post.save()
       res.send({
           message: 'Post updated successfully',
           status:'success',
           post:post
       })
    }else{
        res.status(404).json({message:'could not find the data'})
       }
    })

//make delete request
router.delete('/:id',(req,res,next) => {
    let id= req.params.id;
    Post.findById(id, function (err) {
        if(err)
            return res.status(404).json({message: 'Delete unsuccessful'});
       res.send('Post deleted successfully!')
    })
})

module.exports=router
```
Last step before trying out our first route is to add the route class to the app.js
```
const postRoutes= require('./routes/apis/post');
app.use('/apis/posts',postRoutes);

app.listen(port,()=>{
    console.log('server started on port',port);
});
```
### Connecting our app to the remote Database:
```
//app.js
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
   useUnifiedTopology:true,
    useFindAndModify:false 
})
.then(()=> {
console.log('Database connected successfully')
})
.catch((err)=>{
    console.log('Unable to connect with the database',err)
});
```
### Pushing code to GitHub:
Go to the root directory of the project you want to deploy to Git
To tell your computer that Blog_api is a directory managed by the Git program, enter:
```
git init
```
Add the file to Git by typing :
```
git add .
```
Make a commit
```
git commit -m "first commit"
```
Connect the GitHub repo with your computer
```
git remote add origin https://github.com/<your_username>/todo-backent-api.git
```
Push the file to GitHub
```
git push -u origin master
```
### The Database:
Our database will be hosted remotely on MongoDB Atlas. mLab offers a nice free tier that we can use to test our application. Let’s set it up quickly…
Step-1 : Go to their website
Step-2: Sign up (if already not a user)
Step-3: Click on Create a cluster
Step-4: Choose any of the cloud provider and give it a name. Wait for it to process.
Step-4: Click on  Build the first user database. Add database user and password.
Step-5: Click on Whitelist your IP address (Allow access from anywhere).
Step-6: Connect to your cluster.
Step-7: Copy the url provided and paste it in your app.js file (Blog_api).

### Using Heroku:
Pushing code from a Git repository to a Heroku app. You simply add your Heroku app as a remote to an existing Git repository, then use git push to send your code to Heroku. Heroku then automatically builds your application and creates a new release.

Step-1: Create an account
Step-2: Create an app
Step-3: Connect with GitHub
Step-4: Add Congif-Vars
Step-5: Click on open App
Step-6: Copy the URL and paste in Postman

### Postman: 
Postman is a very powerful HTTP client that is used for testing, documenting and the development of APIs. We will be using Postman here to test our endpoints that we will be implementing.

1- Install Postman from their website.
2- Open the app, make sure it’s a POST request and paste the url from Heroku . Just make sure that your server is still running on the port number 5000.

### Implementing the endpoints:
##### CREATE

The first task in our CRUD task is to create a new product. Let’s start by defining our route first. Head to routes and start designing the expected path that the browser would hit and the controller that would be responsible for handling that request.
In my case:
```
https://todo-backend-ap.herokuapp.com/apis/posts/add
```

##### Read

The second task in our CRUD app is to read an existing product. 
```
https://todo-backend-ap.herokuapp.com/apis/posts
```
##### Update

The third task in our CRUD app is to update an existing product.

```
localhost:5000/apis/posts/update/5ee0d058a1c7a711a8d71ad6
//5ee0d058a1c7a711a8d71ad6 being the id of post
```
##### Delete

The last task in our CRUD app is to delete an existing product.
```
localhost:5000/apis/posts/delete/5ee0d058a1c7a711a8d71ad6
```
## Done 

By now, we are done with creating a full API which does the four operations (CRUD)


