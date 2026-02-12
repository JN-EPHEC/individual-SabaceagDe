import express, { Request,  Response }  from "express";

const app = express();
const port = 3000;
app.get('/',(req : Request,res : Response)=> {
    res.send('Bienvenuuuuuuue');
});
app.get("/api/data", (req: Request, res: Response) => {
    res.json(etudiants);
}) 
app.listen(port, () => {
    console.log('serveur lancé sur htpp://localhost:${port}');
});
const etudiants = [
    { id: 1 , nom: "Dupont", prenom: "Jean"},
    { id: 2 , nom: "Martin", prenom: "Sophie"},
    { id: 3 , nom: "Doe", prenom: "John"}
]
