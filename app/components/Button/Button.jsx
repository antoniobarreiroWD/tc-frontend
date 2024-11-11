import Link from 'next/link'

export default function Button ({onClick, href, type, children, className}) {
    const styledButton = 'inline-block w-fit py-4 px-8 border rounded-3xl border-black font-semibold cursor-pointer'
    return (
        <>
            { href && 
                <Link 
                    href={href}
                    className={`${styledButton} ${className}`}
                >
                    {children}
                </Link>
            } 

            { onClick &&
                <button 
                    onClick={onClick}
                    className={`${styledButton} ${className}`}
                >
                    {children}
                </button>
            } 

            { type &&
                <input 
                    type={type} 
                    value={children}
                    className={`${styledButton} ${className}`}
                />
            }

            { !href && !onClick && !type &&
                <button className={`${styledButton} ${className}`}>
                    {children}
                </button>
            }
        </>
    )
}