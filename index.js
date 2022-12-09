const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require('cors')
const bodyParser = require('body-parser')

var jsonParser = bodyParser.json();

const app = express();
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(express.urlencoded( { extended: true }));
const {Product} = require('./models/Product');
const Cart = require('./models/Cart');
const methodOverride = require('method-override');
const { createIndexes } = require("./models/Cart");
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true })
    .then(() => {
        console.log("mongo connection open!!");
    }).catch(err => {
        console.log("no connection start");
    })

// app.post('/products', jsonParser, async (req, res) => {
        
//     const newProduct = new Product(req.body);
//     await newProduct.save();
// })

app.get('/products', async (req, res) => {
    const products = await Product.find();
    const out = products.map((prod) => {
        return {name: prod.name, description: prod.description, price:prod.price, photo: prod.photo};
    });
    res.json(out);
})


app.post('/cart', jsonParser, async (req, res) => {
    if (await Cart.exists({_id: req.body.cartId})){
        await Cart.findByIdAndUpdate(req.body.cartId, {...req.body})
        res.sendStatus(200);
        return;
    }
    const cart = new Cart({_id: req.body.cartId, ...req.body});
    await cart.save();
    res.sendStatus(200);
})

app.get('/cart/:cartId', async (req, res) => {
    console.log("requesting cart "+req.params.cartId)
    let cart = await Cart.findById(req.params.cartId);
    if(cart === null) {
        res.sendStatus(404);
        return;
    }
    res.json(cart);
})


app.listen(3000, () => {
    console.log("listening on port 3000!");
})



















//************ */

// app.use((req, res) => {

//     console.log("we got a new request");
//     res.send("<h1> we got your request ! thank you </h1>");
// });
// app.get('/', (req, res) => {

//         res.render('home.ejs');
//     });



//     app.get('/search', (req, res) => {
    
//         const { q } = req.query.split('&');
//         if (!q) {
//             res.send("error this is null");
//         }
//         else {
//             res.send(`this is the ${q[0]}  and ${q[1]} page`);
//         }
    
//     })
    
//     app.get('/r/:subreddit', (req, res) => {
    
//         const { subreddit } = req.params;
//         res.send(`this is my ${subreddit} page`);
//     });
    
//     app.get('/r/:subreddit/:postid', (req, res) => {
    
//         const { subreddit, postid } = req.params;
//         res.send(` this is the page of ${subreddit} and ${postid}`);
//     });
    
//     app.get('/cats', (req, res) => {
    
//         res.send("<h1> we got your request ! thank you from cats  </h1>");
//     });
    
//     app.get('/dogs', (req, res) => {
    
//         res.send("<h1> we got your request ! thank you from dogs </h1>");
//     });
    
//     app.get('*', (req, res) => {
    
//         res.send("<h1> i dont know what you want  </h1>");
//     });
    