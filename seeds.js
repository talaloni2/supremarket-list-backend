

const { default: mongoose } = require("mongoose");

const {Product} = require('./models/Product')

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true })
    .then(() => {
        console.log("mongo connection open!!");
    }).catch(err => {
        console.log("no connection start");
    })


const seedProducts = [
    {
        name: "water",
        description: "Great Ein Gedi water. Buy fast while they last!",
        price: "4",
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1DDt7Ok8QM-TTfRCT6qsHmNp55Ag0iZDiufLjwl3MhiGYupJ9MOu1MPTnwYEO1W_eIC4&usqp=CAU"
    },
    {
        name: "bread",
        description: "This stuff is selling like hotcakes",
        price: "20",
        photo: "https://www.theclevercarrot.com/wp-content/uploads/2013/12/sourdough-bread-round-1-of-1.jpg"
    },
    {
        name: "milk",
        description: "Got milk?",
        price: "6.13",
        photo: "https://www.tnuva.co.il/uploads/f_606ee43fa87cf_1617880127.jpg",
    },
    {
        name: "eggs",
        description: "How did the hen get to work so fast? She used the eggs-press lane!",
        price: "13",
        photo: "https://upload.wikimedia.org/wikipedia/commons/5/56/Eierdoosmet10eierengevuld2010.jpg",
    }
]

const populateProducts = async () => {
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);
}

populateProducts().then(() => { mongoose.connection.close(); })