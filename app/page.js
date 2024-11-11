import BasicTemplate from "./templates/Basic.template";
import Button from "./components/Button/Button";
import Link from "next/link";

export default function Home() {
   return (
      <BasicTemplate
         bgColor='tailor-gray'
         page='home'
      >
         <p>Hola, <br />Bienvenido a la prueba de Tailor hub, en ella has de añadir los restaurantes favoritos donde te gustaría ir en tu onboarding.</p>
         <Button href="/signup">Crear cuenta</Button>
         <Button href="/login">Iniciar sesión</Button>
      </BasicTemplate>
   );
}
