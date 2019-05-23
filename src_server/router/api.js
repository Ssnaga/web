module.exports = function (app){

var express = require('express');
var router =  express.Router();
var passport = require('passport');
const bcrypt = require('bcrypt');
const{ User, Product} = require('../db');


// import passport and passport-jwt modules
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');

/////////////////////////////////////////
const fs   = require('fs');
var pathkey = __dirname+'\\public.key';
console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr/n');

console.log(pathkey);
var publicKEY  = fs.readFileSync(pathkey, 'utf8');
console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr/n');
console.log(publicKEY);


// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;

// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

jwtOptions.secretOrKey = publicKEY; // 256 bit key
jwtOptions.algorithm = 'RS256';

// Lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {

  console.log('Payload received', jwt_payload);
  let user = getUser({ id: jwt_payload.id });

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
passport.use(strategy);

// Create some helper functions to work on the database
const createUser = async ({ name, email, password }) => {
    return await User.create({ name, email, password });
};
  
const getAllUsers = async () => {
    return await User.findAll();
};
  
const getUser = async obj => {
    return await User.findOne({
      where: obj,
    });
};
  
const createProduct = async ({ titre, price,image }) => {
    return await Product.create({ titre, price,image });
};
  
const destroyProduct = async ({ titre}) => {
  return await Product.destroy({where :{titre} });
};
const modifProduct = async ({ colone,modif}) => {
  return await Product.changed({colone}, {modif});
};
const getAllProducts = async () => {
    return await Product.findAll();
};

// ----------------------------------------------------------------
// Public route paths
// ----------------------------------------------------------------

// Home route

router.get('/', function(req, res) {    
  res.sendFile('index.html');
});

// Register route
router.post('/register', function(req, res, next) {
  const { name, email, password } = req.body;

<<<<<<< HEAD
  //const saltRounds = 10;
  //bycrypt.hash(password,saltRounds,function(err,hashedPassword){
    const saltRounds = 10;
    bcrypt.hash(password,saltRounds,function(err,hash){
      console.log('hashpassword:',hash)
      var password = hash;
      createUser({ name, email, password}).then(user =>
=======
  const saltRounds = 10;
  bcrypt.hash(password,saltRounds,function(err,hash){
    console.log('hashpassword:',hash)
    var password = hash;
    createUser({ name, email, password}).then(user =>
>>>>>>> ad3d69427cc0246bc90bc63c2191bad916633570
      res.json({ name, msg: 'Account created successfully' })
    );
  });

});

// Login route

router.post('/login', async function(req, res, next) {
  const { name, password } = req.body;
  console.log(name, password);
  
  if (name && password) {
    // we get the user with the name and save the resolved promise
    
    let user = await getUser({ name });
    if (!user) {
      res.status(401).json({ msg: 'No such user found', user });
    }
    //console.log(user);
    bcrypt.compare(password,user.password,function(err,resPassword){
      if (resPassword){//user.password === password) {
        // from now on we’ll identify the user by the id and the id is
        console.log('ready to sign token')
        // the only personalized value that goes into our token
        let payload = { id: user.id };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        var returnJson = { msg: 'ok', token: token }; 
        console.log(returnJson);
        res.json(returnJson);
      } else {
        res.status(401).json({ msg: 'Password is incorrect' });
      }
    });
<<<<<<< HEAD
=======
   
>>>>>>> ad3d69427cc0246bc90bc63c2191bad916633570
  }
});

// logout route

router.post('/logout', function(req, res, next) {
  
});

// ----------------------------------------------------------------
// Protected route paths
// ----------------------------------------------------------------

// Get all users

router.get('/users', passport.authenticate('jwt',{session:false}), function(req, res) {
    getAllUsers().then(user => res.json(user));
});

// Get all products

router.get('/products', passport.authenticate('jwt',{session:false}), function(req, res) {       
  getAllProducts().then(products => res.json(products));
}); 

// Add a product

router.post('/addproduct', passport.authenticate('jwt',{session:false}), function(req, res) {     
    const { titre, image, price } = req.body;
    console.log(titre, image, price);
    createProduct({ titre, image, price }).then(user =>
        res.json({ titre, msg: 'Product created successfully' })
    );
});
<<<<<<< HEAD
router.post('/removeProduct', passport.authenticate('jwt',{session:false}), function(req, res) {     
  const { titre } = req.body;
  console.log(titre);
  destroyProduct({ titre }).then(user =>
      res.json({ titre, msg: 'Product created successfully' })
  );
});
router.post('/modifProduct', passport.authenticate('jwt',{session:false}), function(req, res) {     
  const { colone, modif } = req.body;
  console.log('ca marche');
  console.log(colone,modif);
  modifProduct({ colone,modif }).then(user =>
      res.json({ colone, msg: 'Product created successfully' })
  );
=======

router.post('/test', passport.authenticate('jwt',{session:false}), function(req, res) {     
  console.log('Arrived to TEST');
  var token = req.headers.authorization.split(' ')[1];
  console.log('token:[',token,']');
  
  jwt.verify(token,jwtOptions.secretOrKey,function(err,decode){
    console.log('UserID taked from payload of token:',decode.id);
  
  })
  
>>>>>>> ad3d69427cc0246bc90bc63c2191bad916633570
});
//module.exports = router;

return router;
}