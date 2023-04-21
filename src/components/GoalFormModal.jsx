import * as React from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import { Icon } from '../utils/Icon';




const GoalFormModal = () => {
    const [isOpen, setIsOpen] = React.useState(true);


    return(
        <Modal isOpen={isOpen}>
           <div className="cnx_ins__goal_modal__container">
                <Card className="cnx_ins__goal_modal__card">
                    <Card.Header 
                        className="cnx_ins__goal_modal__card_header"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className='cnx_ins__goal_modal__card_header_title'>
                            Goal Modal
                        </div>
                    </Card.Header>
                    {/* card body */}
                    <Card.Body className='cnx_ins__goal_modal'>
                            
                    </Card.Body>
                    {/* end card body */}
                    <Card.Footer>
                        <div className='cnx_ins__goal_modal__card_footer'>
                            <Button
                                onClick={() => setIsOpen(false)}
                                className='cnx_ins__goal_modal__card_footer_cancel'
                                variant='tertiary'
                            >Cancel</Button>
                            <Button variant='success'>Continue</Button>
                        </div>
                    </Card.Footer>
                </Card>
           </div> 
        </Modal>
    )
}


export default GoalFormModal;



