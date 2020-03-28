import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css'

import LogoImg from '../../assets/logo.svg'

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');

    // Navegação através de uma função JS, quando não usamos o link do router-dom
    const history = useHistory();

    async function handleRegister(e) { // e recebe o evento do formulário
        e.preventDefault(); // Quando o formulário é acionado, ele não atualiza mais a página toda
        
        const data = {
            name,
            email, 
            whatsapp, 
            cidade, 
            uf,
        };

        try {
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso é ${response.data.id}`);
            history.push('/');
        } catch (err) {
            alert('Erro ao cadatrar. Tente novamente')
        }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={LogoImg} alt="Be The Hero" className="src"/>

                    <h1>Cadastro</h1>
                    <p>Faça o seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para Logon
                    </Link>
                </section>

                {/* Quando o formulário for enviado, chama a função para cadastrar o usuário */}
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        // Escuta as mudanças no campo e atualiza a variável nome
                        onChange={e => setName(e.target.value)} //Arrow function
                    />

                    <input 
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    
                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    
                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={cidade}
                            onChange={e => setCidade(e.target.value)}
                        />

                        <input 
                            placeholder="UF" 
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    );
}