import express, { Request,  Response }  from "express";
import timeStamp = require("node:console");
import console = require("node:console");
import userRoutes  from "./routes/userRoutes";
import sequelize from "./config/database";
import User from "./models/User";
import path from "path";


const app = express();
const port = 3000;


app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.get("/api/data", (req: Request, res: Response) => {
    res.json(etudiants);
}) 
app.get("/api/hello/:name", (req:Request,res:Response)=> {
    const name = req.params.name;

    const response = {
        message: `Bonjourr ${name}`,
        timeStamp: new Date().toISOString(),
    };
    res.json(response);
})

const etudiants = [
    { id: 1 , nom: "Dupont", prenom: "Jean"},
    { id: 2 , nom: "Martin", prenom: "Sophie"},
    { id: 3 , nom: "Doe", prenom: "John"}
];

app.use("/api",userRoutes);


sequelize.sync()
  .then(() => {
    console.log("Database synchronisée");

    app.listen(port, () => {
      console.log(`serveur lancé sur http://localhost:${port}`);
    });

  })
  .catch((error) => {
    console.log("Erreur DB :", error);
  });


