import { useState } from "react";
import DownArrowIcon from "../Icons/DownArrowIcon/DownArrowIcon";
import UpArrowIcon from "../Icons/UpArrowIcon/UpArrowIcon";
import './Dropdown.css';

export default function Dropdown({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    const closeDropdown = () => setIsOpen(false);

    return (
        <div className="relative inline-block w-full sm:w-auto">
            <div onClick={toggleDropdown} className="dropdown-toggle flex items-center gap-1.5 cursor-pointer z-10">
                <span className="dropdown-title font-semibold">{title}</span>
                {isOpen ? <UpArrowIcon /> : <DownArrowIcon />}
            </div>
            <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                {children}
            </div>
            {isOpen && <div onClick={closeDropdown} className="dropdown-overlay fixed inset-0 z-40"></div>}
        </div>
    );
}
