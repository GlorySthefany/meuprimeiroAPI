import express from 'express';
import { db, firestore } from '../bancodedados/firebase';

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Bem vindo ap APP!!!")
})

app.post('/usuario', async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email
    const telefone = req.body.telefone

    try {
        const docRef = await firestore.addDoc(firestore.collection(db, 'usuarios'), {
            nome: nome,
            email: email,
            telefone: telefone
        })

        return res.send('Usuario cadastrado com sucesso: ' + docRef.id)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)

    }
});

app.get('/listarUsuarios', async (req, res) =>{
    try {
        const usuarios = await firestore.getDocs(firestore.collection(db, 'usuarios'))

        const usuariosLista = usuarios.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        res.send(usuariosLista) 
    } catch (e) {
        console.log("Erro ao listar usuários: " + e)
        
        res.status(500).send("Erro ao listar usuários: " + e)
    }
})



app.listen(3000, function () {
    console.log("servidor rodando na porta http://localhost:3000")
});
