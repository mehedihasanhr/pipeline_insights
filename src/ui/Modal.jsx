import * as React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Modal = ({ children, isOpen, className }) => {
    const [isBrowser, setIsBrowser] = React.useState(false);

    React.useEffect(() => {
        setIsBrowser(true);
    }, []);

    const modalContent = isOpen ? (
        <div className={`cnx_modal ${className}`}>
            {children}
        </div>
    ) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById('modal-root')
        );
    } else {
        return null;
    }
    

}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    className: PropTypes.string,
}


export default Modal;