import express from 'express';
import { db, firestore } from '../bancodedados/firebase';

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Bem vindo ap APP!!!")
})

app.post('/formulario', async (req, res) => {
    const aniversariante = req.body.aniversariante;
    const usuario = req.body.usuario
    const senha = req.body.senha
    const genero = req.body.genero

    try {
        const docRef = await firestore.addDoc(firestore.collection(db, 'formulario'), {
            aniversariante: aniversariante,
            usuario: usuario,
            senha: senha,
            genero: genero
        })

        return res.send('Resposta enviada com sucesso: ' + docRef.id)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)

    }
});

app.get('/listarFormulario', async (req, res) =>{
    try {
        const usuarios = await firestore.getDocs(firestore.collection(db, 'formulario'))

        const usuariosLista = usuarios.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        res.send(usuariosLista) 
    } catch (e) {
        console.log("Erro ao listar formulario: " + e)
        
        res.status(500).send("Erro ao listar formulario: " + e)
    }
})

app.put('/atualizarFormulario/:id', async (req, res) => {
  const id = req.params.id
  const nome = req.body.nome

  try {
    await firestore.updateDoc(firestore.doc(db, 'formulario', id), {
        nome: nome,
    })
    res.send('Formulario atualizado com sucesso!')
  } catch (e) {
    console.log('Erro ao atualizar Formulario: ' + e)
    
    res.status(500).send('Erro ao atualizar Formulario: ' + e)
  }
})

app.delete('/deletarFormulario/:id', async(req, res) =>{
    const id = req.params.id

    try {
        await firestore.deleteDoc(firestore.doc(db, 'formulario', id))

        res.send('Formulario deletado com sucesso!')

    } catch (e) {
        console.log('Erro ao deletar Formulario: ' +e)
        
        res.status(500).send('Erro ao deletar Formulario: ' +e)
    }
})


app.listen(3000, function () {
    console.log("servidor rodando na porta http://localhost:3000")
});
