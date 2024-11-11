import Button from "../Button/Button";
import Fieldset from "../Fieldset/Fieldset";

export default function CreateRestaurantForm({handleChange, handleSubmit}) {
    return (
        <div className="flex flex-col gap-6 mt-1">
            <Fieldset handleChange={handleChange} type='text' name='name' labelText='Nombre de restaurante:' placeholder='Nombre' />
            <Fieldset handleChange={handleChange} type='text' name='address' labelText='Dirección de restaurante:' placeholder='Dirección' />
            <Fieldset handleChange={handleChange} type='textarea' name='description' labelText='Descripción de restaurante:' placeholder='Escribe información acerca del restaurante' />
            <Button onClick={handleSubmit}>Guardar</Button>
        </div>
    )
}