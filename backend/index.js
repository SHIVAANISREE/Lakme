const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const app = express();
const port = 7000;

app.use(cors());
app.use(express.json());

const users = [];  

const secretKey = 'abc1828';

app.post('/register1', async(req, res) => {
    const {username, password} = req.body;
    const hashedpassword = await bcrypt.hash(password, 10)
    users.push({username, password: hashedpassword})
    res.sendStatus(201)
})

app.post('/login1', async(req, res) => {
    const {username, password} = req.body;
    console.log(users);
    const user = users.find((us) => us.username === username);
    if(user) {
        const isValidUser = await bcrypt.compare(password, user.password);
        if(isValidUser) {
            const token = await jwt.sign({username}, secretKey, {expiresIn: '1hr'})
            res.json({token})
        } else {
            res.sendStatus(401).json({message: 'Invalid credentials'});
        }
    } else {
        res.status(401).json({message: 'Invalid credentials'});
    }
})

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://rkshivaanisree2003:isW8CzdG0sMUyDfm@cluster0.bhsozbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const userCollections = client.db("lakme").collection("users");

    app.post('/register', async(req, res) => {
    const {username, password} = req.body;
    const hashedpassword = await bcrypt.hash(password, 10)
    const result = await userCollections.insertOne({username, password: hashedpassword})
    res.send(result);
})

app.post('/login', async(req, res) => {
    const {username, password} = req.body;
    const user = await userCollections.findOne({username});

    console.log(user)
    if(user) {
        const isValidUser = await bcrypt.compare(password, user.password);
        if(isValidUser) {
            const token = await jwt.sign({username}, secretKey, {expiresIn: '1hr'})
            res.json({token})
        } else {
            res.sendStatus(401).json({message: 'Invalid credentialsss'});
        }
    } else {
        res.status(401).json({message: 'Invalid credentials**'});
    }
})

    // face products
    const faceCollection = client.db("lakme").collection("face");
    app.post("/uploadfaceproducts", async(req, res) => {
        const data = req.body;
        const result = await faceCollection.insertOne(data);
        res.send(result);
    });

    app.get("/getfaceproducts", async(req, res) => {
        const data = faceCollection.find();
        const result = await data.toArray();
        res.send(result);
    });

    app.get("/getfacebyid/:id", async(req, res) => {
        const id = req.params.id;
        const objectId = {_id: new ObjectId(id)};
        const data = await faceCollection.findOne(objectId);
        res.send(data);
    })

    app.delete("/deletefacebyid/:id", async(req, res) => {
        const id = req.params.id;
        const objectId = {_id: new ObjectId(id)};
        const data = await faceCollection.deleteOne(objectId);
        res.send(data);
    })

    app.patch("/editface/:id", async(req, res) => {
        const id = req.params.id;
        const objectId = {_id: new ObjectId(id)};
        const data = req.body;
        const correctdata = {
            $set: {
                ...data
            }
        }
        const optional = {upsert: true};
        const result = await faceCollection.updateOne(objectId, correctdata, optional);
        res.send(result);
    })

    // lips products
    const lipsCollection = client.db("lakme").collection("lips");
    app.post("/uploadlipsproducts", async(req, res) => {
        const data = req.body;
        const result = await lipsCollection.insertOne(data);
        res.send(result);
    })


    app.get("/getlipsproducts", async(req, res) => {
        const data = lipsCollection.find();
        const result = await data.toArray();
        res.send(result);
    })

    app.get("/getlipproductbyid/:id", async(req, res) => {
        const id = req.params.id;
        const objectId = {_id: new ObjectId(id)};
        const data = await lipsCollection.findOne(objectId);
        res.send(data);
    })

    app.delete("/deletelipproductbyid/:id", async(req, res) => {
        const id = req.params.id;
        const objectId = {_id: new ObjectId(id)};
        const data = await lipsCollection.deleteOne(objectId);
        res.send(data);
    })

    app.patch("/editlipproducts/:id", async(req, res) => {
        const id = req.params.id;
        const objectId = {_id: new ObjectId(id)};
        const data = req.body;
        const correctdata = {
            $set: {
                ...data
            }
        }
        const optional = {upsert: true};
        const result = await lipsCollection.updateOne(objectId, correctdata, optional);
        res.send(result);
    })

    // eyes products
    const eyesCollection = client.db("lakme").collection("eyes");
    app.post("/uploadeyesproducts", async(req, res) => {
        const data = req.body;
        const result = await eyesCollection.insertOne(data);
        res.send(result);
    })

    app.get("/geteyesproducts", async(req, res) => {
        const data = eyesCollection.find();
        const result = await data.toArray();
        res.send(result);
    })

    app.get("/geteyesproductbyid/:id", async(req, res) => {
        const id = req.params.id;
        const objectId = {_id: new ObjectId(id)};
        const data = await eyesCollection.findOne(objectId);
        res.send(data);
    })

    app.delete("/deleteeyesproductbyid/:id", async(req, res) => {
        const id = req.params.id;
        const objectId = {_id: new ObjectId(id)};
        const data = await eyesCollection.deleteOne(objectId);
        res.send(data);
    })

    app.patch("/editeyes/:id", async(req, res) => {
        const id = req.params.id;
        const objectId = {_id: new ObjectId(id)};
        const data = req.body;
        const correctdata = {
            $set: {
                ...data
            }
        }
        const optional = {upsert: true};
        const result = await eyesCollection.updateOne(objectId, correctdata, optional);
        res.send(result);
    })

    // skin products
    const skinCollection = client.db("lakme").collection("skin");
    app.post("/uploadskinproducts", async(req, res) => {
        const data = req.body;
        const result = await skinCollection.insertOne(data);
        res.send(result);
    })

    app.get("/getskinproducts", async(req, res) => {
        const data = skinCollection.find();
        const result = await data.toArray();
        res.send(result);
    })

    app.get("/getskinproductbyid/:id", async(req, res) => {
        const id = req.params.id;
        const objectId = {_id: new ObjectId(id)};
        const data = await skinCollection.findOne(objectId);
        res.send(data);
    })

    app.delete("/deleteskinproductbyid/:id", async(req, res) => {
        const id = req.params.id;
        const objectId = {_id: new ObjectId(id)};
        const data = await skinCollection.deleteOne(objectId);
        res.send(data);
    })

    app.patch("/editskin/:id", async(req, res) => {
        const id = req.params.id;
        const objectId = {_id: new ObjectId(id)};
        const data = req.body;
        const correctdata = {
            $set: {
                ...data
            }
        }
        const optional = {upsert: true};
        const result = await skinCollection.updateOne(objectId, correctdata, optional);
        res.send(result);
    })

    // nail products
    const nailCollection = client.db("lakme").collection("nail");
    app.post("/uploadnailproducts", async(req, res) => {
        const data = req.body;
        const result = await nailCollection.insertOne(data);
        res.send(result);
    })

    app.get("/getnailproducts", async(req, res) => {
        const data = nailCollection.find();
        const result = await data.toArray();
        res.send(result);
    })

    app.get("/getnailbyid/:id", async(req, res) => {
        const id = req.params.id;
        const objectId = {_id: new ObjectId(id)};
        const data = await nailCollection.findOne(objectId);
        res.send(data);
    })

    app.delete("/deletenailbyid/:id", async(req, res) => {
        const id = req.params.id;
        const objectId = {_id: new ObjectId(id)};
        const data = await nailCollection.deleteOne(objectId);
        res.send(data);
    })

    app.patch("/editnail/:id",async(req,res)=>{
        const id = req.params.id;
        const objectId = {_id: new ObjectId(id)};
        const data=req.body;
        const correctdata={
            $set:{
                ...data
            }
        }
        const optional={upsert:true};
        const result=await nailCollection.updateOne(objectId,correctdata,optional)
        res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Connected to Port: ${port}`);
})