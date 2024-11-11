'use client'
import { useState } from "react"
import BasicTemplate from '../templates/Basic.template'
import SignUpForm from '../components/SignUpForm/SignUpForm';
import authService from '../services/auth.service';
import { useAuthContext } from "../context/AuthContext";

export default function SignUp() {
    const { login } = useAuthContext(); 
    const [formSended, setFormSended] = useState(false);
    const [error, setError] = useState(false);
    const initialData = {
        email: '',
        username: '',
        password: ''
    };

    const [userData, setUserData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, username, password } = userData;
        const data = { email, username, password };

        try {
            await authService.fetchSignup(data);
            login(data);
            setFormSended(true);
            setError(false);
        } catch (err) {
            console.log(err);
            setFormSended(true);
            setError(true);
        }
    };

    const inputsForm = [
        { name: 'email', text: 'El email es obligatorio' },
        { name: 'username', text: 'El nombre de usuario es obligatorio' },
        { name: 'password', text: 'La contraseña es obligatoria' }
    ];

    return (
        <BasicTemplate page='signup' logoColor='#FFF'>
            <SignUpForm handleSubmit={handleSubmit} handleChange={handleChange} className="invert" />

            {formSended && (
                <div className="mt-4">
                    {!error ? (
                        <p className="text-sm text-green-500">
                            Enhorabuena, tu usuario ha sido creado.
                        </p>
                    ) : (
                        <>
                            <p className="text-sm text-red-500">
                                No ha podido crearse la cuenta.
                            </p>
                            {inputsForm.map((input) => {
                                if (!userData[input.name]) {
                                    return <p key={input.name} className="text-red-500">{input.text}</p>;
                                }
                                return null;
                            })}
                        </>
                    )}
                </div>
            )}
        </BasicTemplate>
    );
}
