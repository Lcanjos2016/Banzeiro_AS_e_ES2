import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js';
import { useNavigate } from 'react-router-dom';


export default function Register(){
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();


const handleSubmit = async (e) => {
e.preventDefault();
try{
await createUserWithEmailAndPassword(auth, email, password);
navigate('/dashboard');
}catch(err){
alert('Erro: ' + err.message);
}
}


return (
<div className="auth-container">
<h2>Registrar</h2>
<form onSubmit={handleSubmit}>
<input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
<input type="password" placeholder="senha" value={password} onChange={e=>setPassword(e.target.value)} />
<button type="submit">Criar conta</button>
</form>
<a href="/">Já tenho conta</a>
</div>
);
}