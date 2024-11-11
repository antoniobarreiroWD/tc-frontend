'use client'

import BasicTemplate from '../templates/Basic.template';
import LogInForm from '../components/LogInForm/LogInForm';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

export default function Login() {
    const { login } = useAuthContext(); 
    const [formSended, setFormSended] = useState(false);
    const [error, setError] = useState(false);
    const initialData = {
        email: '',
        password: ''
    };

    const [userData, setUserData] = useState(initialData);

    const handleChange = (e) => {
        let { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = userData;
        const data = { email, password };

        try {
            login(data);
            setFormSended(true);
            setError(false);
        } catch (err) {
            console.log(err);
            setFormSended(true);
            setError(true);
        }
    };

    return (
        <BasicTemplate page="login" logoColor="#FFF">
            <div className="invert">
                <LogInForm handleSubmit={handleSubmit} handleChange={handleChange} />
            </div>
            { formSended && error && (
                <div className="text-sm text-white mt-4">
                    Error al iniciar sesión. Comprueba que has escrito bien tus datos.
                </div>
            )}
        </BasicTemplate>
    );
}
