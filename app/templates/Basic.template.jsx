import Logo from "../components/Logo/Logo";

export default function BasicTemplate({ children, page, bgColor = 'tailor-blue', logoColor }) {
    const bgColorClass = bgColor === 'tailor-gray' ? 'bg-tailor-gray' : 'bg-tailor-blue';
    const bgImageClass = page === 'login' ? 'bg-login' : page === 'signup' ? 'bg-signup' : 'bg-home';

    return (
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 items-end p-5 lg:p-10 flex-1">
            <div className={`md:w-1/2 flex flex-col gap-5 lg:gap-10 ${bgColorClass} rounded-xl p-6`}>
                <Logo fill={logoColor} className="w-[100px] lg:w-[190px]" />
                {children}
            </div>
            <div className={`w-full md:w-1/2 h-[300px] md:h-full overflow-hidden rounded-xl relative ${bgImageClass} bg-cover bg-center`}></div>
        </div>
    );
}
