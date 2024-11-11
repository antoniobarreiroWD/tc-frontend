'use client'

import Link from "next/link";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import { useAuthContext } from "../../context/AuthContext";

export default function UserHeader () {
    const { user, logout } = useAuthContext();

    return (
        <header className="flex justify-end p-5 lg:p-10">
            { user 
                ? (
                    <Dropdown title={ user ? user.username : ''}>
                        <div className='bg-tailor-blue px-4 pt-8 pb-6 rounded-s-3xl rounded-br-3xl'>
                            <div className="flex flex-col gap-3 text-white pr-4 pb-6 mb-8 border-b border-white">
                                <Link href="/profile">Mi perfil</Link>
                                <Link href="/restaurants/list">Todos los restaurantes</Link>
                                <Link href="/restaurants/add-restaurant">Añadir restaurante</Link>
                            </div>
                            <Button onClick={logout} className="w-full invert">Cerrar sesión</Button>
                        </div>
                    </Dropdown>
                ) 
                : (<div className="flex gap-4">
                    <Link href="/login">Inicia sesión</Link>
                    <Link href="/signup">Regístrate</Link>
                </div>)
            }
        </header>
    )
}