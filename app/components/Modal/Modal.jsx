export default function Modal({children, onClose}) {
    return (
        <div className='fixed top-0 start-0 bottom-0 w-full h-full flex items-center justify-center p-4 z-50'>
            <div className='relative w-full md:w-4/5 lg:w-3/5 h-full bg-white mx-auto px-4 md:px-8 rounded-3xl z-50'>
                <span onClick={onClose} className='absolute top-4 md:top-6 end-4 md:end-6 cursor-pointer'>X</span>
                <div className='w-full h-full py-6 md:py-8 px-2 md:px-4 overflow-auto'>
                    {children}
                </div>
            </div>
            <span onClick={onClose} className='absolute w-full h-full bg-black bg-opacity-25 cursor-pointer'></span>
        </div>
    )
}