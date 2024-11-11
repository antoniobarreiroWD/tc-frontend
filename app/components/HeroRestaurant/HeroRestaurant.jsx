export default function HeroRestaurant ({restaurant}) {
    return (
        <div className='relative w-full h-[250px] md:h-[600px] flex intems-center justify-center rounded-3xl overflow-hidden'>
            <img 
                src={restaurant.image} 
                alt={`Foto restaurante ${restaurant.name}`}
                className='absolute w-full h-full object-cover z-[-1]'
                />
            <div className='
                w-full h-full flex flex-col justify-center items-center
                bg-black/40
                text-center p-4
                '>
                <h1 className='text-white text-2xl lg:text-4xl font-semibold mb-2'>{restaurant.name}</h1>
                <p className='text-white'>{restaurant.address}</p>
            </div>
        </div>
    )
}