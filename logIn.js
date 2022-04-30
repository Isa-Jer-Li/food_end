const express = require('express')
const app = express()  //create new express app
const port = 5000;  //using designated port number on front end to access back end

const {MongoClient} = require('mongodb')  //create a new mongoDB client
const url = "mongodb+srv://krshinn:1029384756@cluster0.oam60.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(url)

app.use(express.static('public'))  //allows you to pass json data from front end to back end
app.use(express.urlencoded({extended:true})) //allows you to access req.body


//function to post user sign-up data
app.post('/users', (req,res) => {

  let user = {
	email: req.body.email,
	password: req.body.password,
  } //establish credentials as user obj

  async function insertUser() {
	await client.connect()
	const collection = client.db('test_db').collection('users')
	await collection.insertOne(user)
	await client.close()
  }
  insertUser()
  res.redirect('/home.html')
})

//function to verify log-in data
app.post('/login', (req,res) => {

  let user = {
	email: req.body.email,
	password: req.body.password,
  } //establish credentials as user obj


  async function verifyUser() {
  await client.connect()
  const collection = client.db('test_db').collection('users')
  let findUser = await collection.findOne(user)
  console.log(findUser)
  await client.close()
	if (findUser !== null) {
	  res.redirect('/home.html')
	} else {
	  res.redirect('/index.html')
	}
  }
  verifyUser()
})

app.listen(port)



