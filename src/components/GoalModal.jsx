import * as React from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import { Icon } from '../utils/Icon';




const goal = [
    {
        id: 'goal_1',
        title: 'Deal',
        types : [
            {
                id: 'goal_1_type_1',
                title: "Added",
                subtitle: 'Based on the number or value of new deals'
            },
            {
                id: 'goal_1_type_2',
                title: "Progressed",
                subtitle: 'Based on the number or value of deals entering a certain stage'
            },
            {
                id: 'goal_1_type_3',
                title: "Won",
                subtitle: 'Based on the number or value of won deals'
            }

        ]
        
    },
    {
        id: 'goal_2',
        title: "Forecast",
        types: [
            {
                id: 'goal_2_type_1',
                title: 'Revenue forecast',
                subtitle: 'Based on weighted value of open and won deals'
            }
        ]
    }
]


const GoalModal = () => {
    const [isOpen, setIsOpen] = React.useState(true);
    const [selectedEntry, setSelectedEntry] = React.useState("Deal");
    const [selectedGoal, setSelectedGoal] = React.useState(null);


    const getEntries = () => {
        return goal?.map((item) => ({
            id: item.id,
            title: item.title,
        }));
    }

    const getTypes = (type) => {
        const goalTypes = goal?.find((item) => item.title === type);
        return goalTypes?.types;
    }



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
                            <div className='cnx_ins__goal_modal_entry hr'>
                                <div className='cnx_ins__goal_modal_entry_title'>CHOOSE ENTITY</div>
                                <div className='cnx_ins__goal_modal_entry_list'>
                                    {
                                        getEntries().map((item) => (
                                            <div 
                                                key={item.id} 
                                                onClick={() => setSelectedEntry(item.title)}
                                                className={`cnx_ins__goal_modal_entry_list_item ${selectedEntry === item.title ? 'active' :''}`
                                            }>
                                                {Icon(item.title)}
                                                <span>{item.title}</span>
                                                <i className="fa-solid fa-chevron-right"></i>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className='cnx_ins__goal_modal_entry'>
                                <div className='cnx_ins__goal_modal_entry_choose'>
                                    <div className='cnx_ins__goal_modal_entry_title'>CHOOSE GOAL</div>
                                    <div className='cnx_ins__goal_modal_entry_list'>
                                        {
                                            getTypes(selectedEntry)?.map((item) => (
                                                <div 
                                                    key={item.id} 
                                                    onClick={() => setSelectedGoal(item.title)}
                                                    className={`cnx_ins__goal_modal_entry_list_item ${selectedGoal === item.title ? 'active' :''}`
                                                }>
                                                    {Icon(item.title)}
                                                    <div>
                                                        <span>{item.title}</span>
                                                        <article>
                                                            {item.subtitle}
                                                        </article>
                                                    </div>
                                                    {selectedGoal === item.title && <i className="fa-solid fa-check"></i>}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
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


export default GoalModal;



