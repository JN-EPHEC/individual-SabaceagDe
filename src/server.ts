import express, { Request,  Response }  from "express";
import timeStamp = require("node:console");
import console = require("node:console");
import userRoutes  from "./routes/userRoutes";
import sequelize from "./config/database";
import User from "./models/User";



const app = express();
const port = 3000;
app.get('/',(req : Request,res : Response)=> {
    res.send('Bienvenuuuuuuue');
});
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
app.use(express.json());
app.use("/api",userRoutes);


sequelize.authenticate()
    .then(()=>{console.log("conex good de database");})
    .catch((error)=>{console.log("erooooor a ouvrir",error);});


app.post("/api/users", async (req, res) => {
  const { name } = req.body;

  const newUser = await User.create({ name });

  res.json(newUser);
});
app.get("/api/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.listen(port, () => {
    console.log('serveur lancé sur htpp://localhost:${port}');
});
