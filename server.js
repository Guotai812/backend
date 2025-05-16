const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();

const DUMMY_PRODUCTS = []; // not a database, just some in-memory storage for now

// CORS Configuration
app.use(cors({
  origin: 'https://frontend-eight-self-88.vercel.app/:1', // Allow your frontend
  credentials: true, // Allow cookies and credentials
  methods: 'GET, POST, PATCH, DELETE, OPTIONS', // Allowed methods
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization' // Allowed headers
}));


app.use(bodyParser.json());

app.get('/products', (req, res, next) => {
  res.status(200).json({ products: DUMMY_PRODUCTS });
});

app.post('/product', (req, res, next) => {
  const { title, price } = req.body;

  if (!title || title.trim().length === 0 || !price || price <= 0) {
    return res.status(422).json({
      message: 'Invalid input, please enter a valid title and price.'
    });
  }

  const createdProduct = {
    id: uuidv4(),
    title,
    price
  };

  DUMMY_PRODUCTS.push(createdProduct);

  res
    .status(201)
    .json({ message: 'Created new product.', product: createdProduct });
});

app.listen(process.env.PORT || 5001, () => {
  console.log(`Server is running on port ${process.env.PORT || 5001}`);
}); // start Node + Express server on port 5000
