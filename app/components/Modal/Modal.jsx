
export default function Modal({children, onClose}) {
    return (
        <div className='fixed top-0 start-0 bottom-4 w-full h-full flex items-center justify-center p-4 z-50'>
            <div className='relative w-3/5 h-full bg-white mx-auto px-8 rounded-3xl z-50'>
                <span onClick={onClose} className='absolute top-6 end-6 cursor-pointer'>X</span>
                <div className='w-full h-full py-8 px-4 overflow-auto'>
                    {children}
                </div>
            </div>
            <span onClick={onClose} className='absolute w-full h-full bg-black bg-opacity-25 cursor-pointer'></span>
        </div>
    )
}