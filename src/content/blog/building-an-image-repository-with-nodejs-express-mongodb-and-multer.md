---
title: "Building an Image repository with Node.js, Express, MongoDB and Multer"
description: "Quick Summary With the help of this tutorial, you can learn how to build and integrate an Image repository by uploading files on the server with the help of Multer and Express in Node.js. This tutorial will also show you a step-by-step process of int..."
publishedAt: "2021-04-12T21:44:45.672Z"
featured: false
sourceName: "Hashnode"
sourceUrl: "https://thecodezs.hashnode.dev/building-an-image-repository-with-nodejs-express-mongodb-and-multer"
tags:
  - "JavaScript"
  - "Node.js"
  - "Web Development"
---

> Originally published on [Hashnode](https://thecodezs.hashnode.dev/building-an-image-repository-with-nodejs-express-mongodb-and-multer).

*Quick Summary*

*With the help of this tutorial, you can learn how to build and integrate an Image repository by uploading files on the server with the help of Multer and Express in Node.js. This tutorial will also show you a step-by-step process of integrating Multer and multer-gridfs-storage into your application.*


## Introduction

Node.JS has made building web application on the server-side easier, thanks to the ecosystem that constantly build packages to help developers in building such applications. File upload is one of the common operations for any application. In Node.js, with the help of Express and the Multer module, adding a file upload feature is easy to integrate.
Uploading an Image in Node.js applications is not limited to only Multer, there are other means you could use to achieve this, which include formidable, they support uploading to serverless environments, such as AWS S3, Azure, GCP, or the filesystem. I’ll drop a link to the documentation at the end of the tutorial.

In this tutorial, we'll be focusing only on learning how we can upload files on the server with the help of Multer, Express, and MongoDB in Node.js. The goal is to make you comfortable in building apps that can easily handle any file uploads. At the end of this blog, you will be able to integrate the file uploads into your apps.
This is a tutorial for beginners so I'm going to talk about building this project on a surface level, mainly. Readers should already be familiar with creating a basic Node JS REST API, saving API to MongoDB database, and using Express.js web framework.

### What Is Multer?

Multer parses the raw HTTP request data which are primarily used for file upload and makes it more accessible (storing on disk / in memory /...) for further processing. Without multer, you would have to parse the raw data yourself if you want to access the file. - **NOTE**: *Multer will not process any form which is not multipart (multipart/form-data).*

Let's briefly look more into what we mean by multipart/form-data.

**What is multipart/form-data?**

Browsers use the 'form-URL encoded content type when a form is sent. This only includes a set of key-value pairs and is thus not able to upload files. When you configure your form to use the "multipart/form-data" content type, browsers generate a multipart message that contains a form field in each portion. Text input and file input may form a multipart message. You can upload files this way by using multipart/form-data.

A body object and a file or file object are attached to the request object by Multer. The body object contains the values of the form text fields, the file object or the file object contains the files that are submitted into the form.

**Quick Reminder**: - There's a need to quickly remind ourselves of what Node.js, Express, MongoDB means.


- **Node.js** =>Node.js is an open-source and cross-platform JavaScript runtime environment. It is a popular tool for almost any kind of project!. I'll add more resources at the end of this tutorial for more read on Node.js.


- **Express **=> Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. With a myriad of HTTP utility methods and middleware at your disposal, creating a robust API is quick and easy. Express provides a thin layer of fundamental web application features, without obscuring Node.js features that you know and love.


- **MongoDB **=> MongoDB is a general-purpose, document-based, distributed database built for modern application developers and for the cloud era. MongoDB is a document database, which means it stores data in JSON-like documents. The people at MongoDB Inc believe this is the most natural way to think about data and is much more expressive and powerful than the traditional row/column model.

I'll explain how to use these tools together as we proceed. Before we start building our application, let’s look into the architecture of the entire project.

**What is it exactly that we are building?**

We’ll be building an Image repository application that allows you to select and upload image files to a database directly from the browser. This function is achieved with the help of Multer.

** How will the app work?**

 This application is powered by Node.js, Express.js, MongoDB, and of course, Multer. After running your application and mongo Instance from the terminal. (check this on how to do that). Navigate to localhost on your browser. Your application should display and you can upload and save your files to the database. Let’s see how to achieve all this.
 

Let’s Get Started!

**Some software requirements for this project:**

- NodeJs
- NPM
- MongoDB
- VSCode (or any editor of your choice).

**Install the dependencies and Project structure**

Let's create a directory for our project, I called mine `build-an-image-repository` but you can name yours anything you want.
Now, let’s start by first defining the package.json file to store our app’s configuration. To create one, navigate to the directory in the terminal, and write the following command:

    npm init -y

Note: `The -y` flag will answer yes to every question like app name, git repo, license, and so on.

**Installing the dependencies**

Here, we install three dependencies which are express, multer, multer-gridfs-storage. Enter the following command in the terminal

    npm install express multer multer-gridfs-storage

That will install the packages and their dependencies. Your package.json file should look like this:


    {
      "name": "build-an-image-repository",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "dependencies": {
        "express": "^4.17.1",
        "multer": "^1.4.2",
        "multer-gridfs-storage": "^4.2.0"
      }
    }


![project_structure.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1612443248296/gv5cPYAKl.png)


This is how our project should look like, you can create the folders and files now or create them as we proceed.

**Create a client-side for viewing uploaded Images**
In the views folder, create and paste the following code into the index.html file.


    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Image Repository</title>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        />
        <style>
          div.preview-images > img {
            width: 30%;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="row">
            <div class="col-sm-8 mt-3">
              <h1 style="text-align: center;">Image Repository</h1>
              <h4 style="text-align: center;">Upload your images</h4>
              <form
                class="mt-4"
                action="/upload"
                method="POST"
                enctype="multipart/form-data"
              >
                <div class="form-group">
                  <input
                    type="file"
                    name="multi-files"
                    multiple
                    id="input-files"
                    accept="image/*"
                    onchange="showMyImage(this)"
                    class="form-control-file border"
                  />
                </div>
                <button type="submit" class="btn btn-primary border-0">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-sm-12">
              <div class="preview-images">
                <img
                  id="thumbnil"
                  style="width: 30%; margin-top: 20px;"
                  src=""
                  alt="image"
                />
              </div>
            </div>
          </div>
        </div>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
        <script>
          function showMyImage(fileInput) {
            var files = fileInput.files;
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              var imageType = /image.*/;
              if (!file.type.match(imageType)) {
                continue;
              }
              var img = document.getElementById('thumbnil');
              img.file = file;
              var reader = new FileReader();
              reader.onload = (function (aImg) {
                return function (e) {
                  aImg.src = e.target.result;
                };
              })(img);
              reader.readAsDataURL(file);
            }
          }
        </script>
      </body>
    </html>
    

In this file we created a form with the following elements:

- action="/upload"
- method="POST"
- enctype="multipart/form-data"

Take note of the input tag with the `name=``"``multi-files``"` attribute that we will use in the middleware on the server-side.


- The JavaScript code shows the preview of the chosen images and we also used Bootstrap to make the UI more comfortable to read.

**Create middleware for uploading & storing images in the database**


    // The util module supports the needs of Node.js internal APIs. Many of the utilities are useful for application and module developers as well
    
    const util = require('util');
    
    const multer = require('multer');
    const GridFsStorage = require('multer-gridfs-storage');
    
    // storage configuration object with GridFsStorage class
    // multer-gridfs-storage module will create a mongodb connection for you automatically
    
    var storage = new GridFsStorage({
      url: 'mongodb://localhost:27017/repository_files_db',
      options: { useNewUrlParser: true, useUnifiedTopology: true },
    
      file: (req, file) => {
        const match = ['image/png', 'image/jpeg'];
    
        if (match.indexOf(file.mimetype) === -1) {
          const filename = `${Date.now()}-repository-${file.originalname}`;
          return filename;
        }
    
        return {
          bucketName: 'photos',
          filename: `${Date.now()}-repository-${file.originalname}`,
        };
      },
    });
    
    var uploadFiles = multer({ storage: storage }).array('multi-files', 10);
    
    //util.promisify() to make the exported middleware object can be used with async-await
    var uploadFilesMiddleware = util.promisify(uploadFiles);
    module.exports = uploadFilesMiddleware;
- We define a storage configuration object with `GridFsStorage` class which we got from the Multer module.
- `url`: This is a standard `MongoDB` connection string pointing to the `MongoDB` database. The `multer-gridfs-storage` module will create a `MongoDB` connection for you automatically.
- `options`: customizes how to establish the connection, specified in the MongoClient.connect documentation.
- `file`: This is the function that's used to control the file storage in the database. The return value of this function is an object with the properties such as `filename`, `bucketName`.
- We also check if the file is an image or not using `file.mimetype`. Then we add the timestamp prefix to the file’s original name. This is to make sure that we never have a duplicate in the `MongoDB` collection.
- `bucketName` indicates that the file will be stored at `photos.chunks` and `photos.files` collections which are also from the `multer` module.

– Then we used `multer` module to initialize middleware and `util.promisify()` to make the exported middleware object which can be used with async-await.
– The `array()` function with the parameter is the name of input tag (in html view: `<input type="file" name="file">)` will store the the multiple-files in `req.file`. The `10` parameter allows you to upload 10 files. If you try to upload more than 10 files at a time, you can see an error like this:

![too_many_files_error.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1612445791786/C8770MAUL.png)


Note: All these functions are gotten from the `multer` module

**Create Controllers for the view and uploading Images**

Create home.js and upload.js files in the controller folder, then add the following code into each of them.


`home.js`:

    const path = require('path');
    
    const home = (req, res) => {
      return res.sendFile(path.join(`${__dirname}/../views/index.html`));
    };
    
    module.exports = {
      getHome: home,
    };

In `home.js`, we brought in the built-in node.js modules. It’s a module with methods that help you deal with file and directory path names on the machine’s filesystem. Then we used an `express.js` provided method which is part of the response object of the router called sendFile() to serve static files. This method accepts absolute paths only. 
Then we proceed to use one of the most commonly used `path` methods called `path.join`. The join method takes two or more parts of a file path and joins them into one string that can be used anywhere that requires a file path. We joined our selected `dirname` to the static file we are serving to the browser.


`upload.js`:

    const upload = require('../middleware/upload');
    
    const uploadFiles = async (req, res) => {
      try {
        await upload(req, res);
        console.log(req.files);
    
        if (req.files.length < 1) {
          return res.send(
            `You must select at least 1 file. <br> <a href="/"<button>Back</button>`
          );
        }
    
        return res.send(
          `Files have been uploaded. <br> <a href="/"<button>Back</button>`
        );
      } catch (error) {
        console.log(error);
    
        if (error.code === 'LIMIT_UNEXPECTED_FILE') {
          return res.send(
            `Too many files to upload. <br> <a href="/"<button>Back</button>`
          );
        }
        return res.send(
          `Error when trying upload many files: ${error} <br> <a href="/"<button>Back</button>`
        );
      }
    };
    
    module.exports = {
      uploadFiles: uploadFiles,
    };

`upload.js` module is used for validating the files that would be uploaded. For example, you must select at least one file when you click on the submit button, then if those conditions are fulfilled, your files get uploaded to your repository and get saved to the database. The back button attached is to make sure you go back to the homepage no matter the result of the action you made.

**Create Routes for our application**

Let's now create the routes for our application.
In the routes folder, create a file called web.js and declare your various route with the following code:


    const express = require('express');
    const router = express.Router();
    const homeController = require('../controllers/home');
    const uploadController = require('../controllers/upload');
    
    let routes = (app) => {
      router.get('/', homeController.getHome);
    
      router.post('/upload', uploadController.uploadFiles);
    
      return app.use('/', router);
    };
    
    module.exports = routes;

We required our `express` module, then declared the router to get access to the `router` function in the express module. Then we import the `home` and `upload` controllers to get access to the functions.
We declared two routes in this module:

- `GET`: This is the homepage for uploading our files.
- `POST`: We used the `/upload` route to call the upload controller. This is for the `action="/upload"` in the view (index.html).

**Create an Express app server**

So finally, let's create our express server. Create an `index.js` file in the root folder, outside the `src` folder, and paste the following code.


    const express = require('express');
    const app = express();
    const initialRoutes = require('./src/routes/web');
    
    app.use(express.urlencoded({ extended: true }));
    initialRoutes(app);
    
    let port = 3000;
    app.listen(port, () => {
      console.log(`Running at localhost:${port}`);
    });

Note: *Please make sure you have your `mongod` running in the shell and also on the MongoDB compass(if that's what you use). If you don't know how to do that, you can click this for a tutorial on that.

**Check the result in our browser**

If you followed along with the tutorial, everything should be working fine. In the root folder from the terminal, run this command:


    node index.js

If you have `nodemon` installed globally on your machine, you can as well run this command from the terminal:

    nodemon

Any method you used should give this result in the terminal:
`Running at localhost:3000`
Navigate to `localhost:3000` on your browser, you should see something like this.

![Image_repository.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1612443573588/tFG8x82na.png)


Click the submit button and the browser shows the image below If the file is successfully uploaded and stored in `MongoDB`.

![file_uploaded.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1612443963812/BRHU34zhG.png)


The `console` should display the image’s information like so:

![console_image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1612444173496/mM80QWtDO.png)


Note: You have to run the command `mongod` in your `cmd` to create a connection for your `mongoDb compass` , then in the compass, connect to `localhost:27017`, then proceed to the terminal in Vscode on your preferred terminal to start the application.

Let's check the `MongoDB` database and make sure repository_files_db with two collections: `photos.chunks & photo.files`. You should see your file in the `photo.files` which include the `generated _id`, `chunkSize`, `uploadDate`, and so on.

![database_image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1612445110212/d6kUhYhiJ.png)


### Conclusion

In this article, we learned about how to build an Image repository by uploading files using express, multer & multer-grid-storage modules. We also went through the process of saving images in the MongoDB database. Have fun using multer & multer-grid-storage modules for your next Node.js application. The code to this project can be found on GitHub

### Resources

 [Multer Documentation
](https://github.com/expressjs/multer#readme)
  
[ExtraLink to Express docs](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction) 

 [Express.js](https://expressjs.com/) 

 [MongoDB Documentation
](https://www.mongodb.com/)
  
[Node.js Documentation
](https://nodejs.dev/learn) 

 [Formidable](https://github.com/node-formidable/formidable)
