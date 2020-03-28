import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css'

import LogoImg from '../../assets/logo.svg'

export default function NewIncidents() {
    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();
        
        const data = {
            title,
            description,
            value,
        };
        
        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            });
            alert(`Caso cadastrado com sucesso!`);
            history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar novo caso. Tente novamente.')
        }
    }

    return (
        <div className="newIncident-container">
            <div className="content">
                <section>
                    <img src={LogoImg} alt="Be The Hero" className="src"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={18} color="#e02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        type="text" 
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <input 
                        type="text" 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <div className="button-group">
                        <Link to="/profile">
                            Canlecar
                        </Link>
                        <button type="submit" className="button">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>

    );
}