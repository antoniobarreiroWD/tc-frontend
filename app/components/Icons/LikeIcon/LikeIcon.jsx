import './LikeIcon.css';


export default function LikeIcon({ like }) {
    return (
        <svg
            className="pointer-events-none transition-transform duration-300"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                className="hover:fill-[#df4d6b] transition-colors duration-200"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={like ? '#d62549' : '#fff'}
                stroke="#d62549"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        </svg>
    );
}
