import * as React from 'react';
import PropTypes from 'prop-types';
import {usePopper} from 'react-popper';
import {motion, AnimatePresence } from 'framer-motion';

const DropdownContext = React.createContext();


const DropdownProvider = ({children}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [element, setElement] = React.useState(null);
    const [reference, setReference] = React.useState(null);

    return (
        <DropdownContext.Provider value={{
            element,
            setElement,
            reference,
            setReference,
            isOpen,
            setIsOpen
        }}>
            {children}
        </DropdownContext.Provider>
    )
}

// dropdown hooks
const useDropdown = () => {
    const context = React.useContext(DropdownContext);
    if(!context) {
        throw new Error('useDropdown must be used within a DropdownProvider');
    }
    return context;
}


// dropdown item
const DropdownItem = ({children, className, onClick, disabled=false, ...props}) => {
    const {setIsOpen} = useDropdown();
    return(
        <div 
            onMouseUp={() => disabled ? null : setIsOpen(false)}
            onClick={() => disabled ? null : onClick ? onClick(): null}
            className={`cnx_dropdown__item ${disabled ? 'cnx_dropdown__item_disabled}': ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}

const DropdownToggle = ({children, icon=true, className}) => {
    const {setIsOpen, isOpen, setReference} = useDropdown();
    const toggle = () => setIsOpen(!isOpen);
    return(
        <div
            ref={setReference}
            className={`cnx_dropdown__toggle ${className}`}
            onClick={toggle}
        >

            {children}
            {icon && <i className={`fas fa-caret-${isOpen ? 'up' : 'down'} cnx_dropdown__toggle_icon`}/>}
        </div>
    )
}

// dropdown menu
const DropdownMenu = ({children, className, ...props}) => {
    const { reference, setIsOpen, isOpen} = useDropdown();
    const [popperElement , setPopperElement] = React.useState(null);
    const {styles, attributes} = usePopper(reference, popperElement, {
        placement: 'bottom-start',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 3],
                },
            },
            {
                name: 'flip',
                options: {
                    fallbackPlacements: ['bottom', 'top'],
                },
            }
        ],
    });


    // outside click

    React.useEffect(() => {
        let timeout;
        const handleClickOutside = (event) => {
            if (popperElement && !popperElement.contains(event.target)) {
                setIsOpen(false);
            }
        };


        if(isOpen) {
            timeout = setTimeout(() => {
                document.addEventListener('mousedown', handleClickOutside);
            }, 0);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            clearTimeout(timeout);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, popperElement])

    return(
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{opacity: 0}}
                    animate={{opacity: 1 }}
                    exit={{opacity: 0}}
                    className={`cnx_dropdown__menu ${isOpen ? 'cnx_dropdown__menu_open' : ''} ${className}`}
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                    {...props}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
} 



const Dropdown = ({children}) => {
    return(
        <div className='cnx_dropdown'>
            <DropdownProvider>
                {children}
            </DropdownProvider>
        </div>
    )
}

Dropdown.Item = DropdownItem;
Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;

export default Dropdown;


// type

DropdownProvider.propTypes = {
    children: PropTypes.node.isRequired
}

DropdownItem.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
}

DropdownToggle.propTypes = {
    children: PropTypes.node.isRequired,
    icon: PropTypes.bool,
    className: PropTypes.string,
}


DropdownMenu.propTypes = {
    children: PropTypes.node.isRequired || PropTypes.arrayOf(PropTypes.node).isRequired,
    className: PropTypes.string,
}

Dropdown.propTypes = {
    children: PropTypes.node.isRequired || PropTypes.arrayOf(PropTypes.node).isRequired,
}