import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename);

const app = express();
const port = 3000;  


app.use(express.static(__dirname + "/src/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/src/pages/index.html");
});
app.get("/contatos", (req, res) => {
    res.sendFile(__dirname + "/src/pages/contatos.html");
});
app.get("/produtos", (req, res) => {
    res.sendFile(__dirname + "/src/pages/produtos.html");
});
app.get("/sobre", (req, res) => {
    res.sendFile(__dirname + "/src/pages/sobre.html");
});

app.listen(port, () => {
  console.log(`Rodando em  http://localhost:${port}`);
});