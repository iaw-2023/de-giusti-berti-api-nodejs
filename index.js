const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

/* Importa los router para la API */
const productosRouter = require('./routers/ProductosAPI');
const categoriasRouter = require('./routers/CategoriasAPI');
const clientesRouter = require('./routers/ClienteAPI');
const pedidosRouter = require('./routers/PedidosAPI');
const mercadoPagoRouter = require('./routers/MercadoPagoAPI');

const app = express();

const port = 3001;

app.use(cors());
app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false })); // sin esto no lee los req.body de crearpedido
app.use(bodyParser.json());
app.use('/pedidos', pedidosRouter);
app.use('/productos', productosRouter);
app.use('/categorias', categoriasRouter);
app.use('/clientes', clientesRouter);
app.use('/process_payment', mercadoPagoRouter);

// para iniciar el servidor usar node index.js
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
