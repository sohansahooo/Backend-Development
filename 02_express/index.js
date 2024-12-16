import "dotenv/config";
import express from "express";
import logger from "./logger.js";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

let product = [];
let nextId = 1;

// Add product
app.post("/products", (req, res) => {
  //   console.log("POST");
  logger.warn("A post request is made to add a new product");
  const { name, price } = req.body;
  const newProduct = {
    id: nextId++,
    name,
    price,
  };
  product.push(newProduct);
  res.status(201).send(newProduct);
});

// Get all products
app.get("/products", (req, res) => {
  res.status(200).send(product);
});

// Get a product with id
app.get("/products/:id", (req, res) => {
  const prod = product.find((p) => p.id === parseInt(req.params.id));
  if (!prod) {
    return res.status(404).send("Product not found");
  } else {
    res.status(200).send(prod);
  }
});

// Update a product with id
app.put("/products/:id", (req, res) => {
  const prod = product.find((p) => p.id === parseInt(req.params.id));
  if (!prod) {
    return res.status(404).send("Product not found");
  } else {
    const { name, price } = req.body;
    prod.name = name;
    prod.price = price;
    res.status(200).send(prod);
  }
});

// Delete a product with id
app.delete("/products/:id", (req, res) => {
  const index = product.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Product not found");
  }
  product.splice(index, 1);
  return res.status(200).send("Product deleted");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
