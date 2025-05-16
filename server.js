import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const DUMMY_PRODUCTS = [{id:1}];

// CORS Configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.get('/products', (req, res) => {
  res.status(200).json({ products: DUMMY_PRODUCTS });
});

app.post('/product', (req, res) => {
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

  res.status(201).json({
    message: 'Created new product.',
    product: createdProduct
  });
});

// Fallback for 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});