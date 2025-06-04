const express = require("express");
const mongoose = require("mongoose");
const { dbUser, dbPassword, port} = require("./config/env");
const erroHandler = require("./middlewares/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");


// Cria uma instância do Express
const app = express();

// Configura o express para entender req. em Json
app.use(express.json());

// Rota aberta
app.get("/", (requisicao, resposta) => {
  resposta.status(200).send({ msg: "Bem vindo a API!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(erroHandler);

const startServer = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@api.zubui.mongodb.net/?retryWrites=true&w=majority&appName=api`
    );
    console.log("Conectou ao banco MongoDB")

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB", err);
    process.exit(1);
  }
};

// Inicia o servidor apenas se Não estiver em ambiente de teste.
if (process.env.NODE_ENV !== "test") {
  startServer();
}

module.exports = app

// Inicia o servidor na porta 3000
// mongoose
//   .connect(`mongodb+srv://${dbUser}:${dbPassword}@api.isusp.mongodb.net/?retryWrites=true&w=majority&appName=API`)
//   .then(() =>{
//     console.log("Conectado ao MongoDB");
//     app.listen(port, () => {
//       console.log(`Servidor rodando na porta ${port}`);
//     });
// })
// .catch((err) => {
//   console.error("Erro ao conectar ao MongoDB", err);
//   process.exit(1);
// });