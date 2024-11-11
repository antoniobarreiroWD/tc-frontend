'use client'
import Button from "../Button/Button"
import Fieldset from "../Fieldset/Fieldset"
import Link from "next/link"

export default function LogInForm ({ handleSubmit, handleChange}) {
    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 mt-10'>
             <p className="text-center mt-4">
                ¿No tienes cuenta?{" "}
                <Link href="/signup" className="text-blue-500 hover:underline">
                    Regístrate
                </Link>
            </p>
            <Fieldset handleChange={handleChange} type="text" name="email" id="email" labelText="Email" placeholder="Escribe tu email" />
            <Fieldset handleChange={handleChange} type="password" name="password" id="password" labelText="Contraseña" placeholder="Escribe tu contraseña" />

            <Button type='submit'>Entrar</Button>
        </form>
    )
}