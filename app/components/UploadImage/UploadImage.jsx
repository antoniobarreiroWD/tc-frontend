import Button from "../Button/Button";

export default function UploadImage({image}) {    
    return (
        <>
            { image &&
                <img src={image} alt="" className="absolute w-full h-full object-cover z-[-1]"/>
            }
            <div className={`w-full h-full flex flex-col justify-center items-center ${ image && 'bg-black/40'}`}>
                { image 
                    ? <Button className='invert'>Eliminar</Button>
                    : <span>Añadir imagen</span>
                }
            </div>
        </>
    )
}