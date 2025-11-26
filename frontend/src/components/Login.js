import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../theme.css';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    }catch(err){
      alert('Erro: ' + err.message);
    }
  }

  return (
    <div className="page-container">

      <div className="card" style={{ maxWidth: "400px", margin: "40px auto" }}>
        <h2>Entrar</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="btn" style={{ width:"100%" }} type="submit">Entrar</button>
        </form>
        <a className="link" href="/register">Criar conta</a>
      </div>

    </div>
  );
}
