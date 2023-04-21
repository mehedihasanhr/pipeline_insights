import * as React from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import Dropdown from '../ui/Dropdown';
import SearchBox from '../ui/Searchbox';
import PropsTypes from 'prop-types';




// assignee for 

const AssigneeFor = ({assigneeFor, setAssigneeFor, assigneeType}) => {
    const [search, setSearch] = React.useState('');
    const searchRef = React.useRef(null);

    React.useEffect(() => {
        if(searchRef && searchRef.current){
            searchRef.current.focus();
        }
    }, [searchRef]);

    const options = () => {
        if(assigneeType === "Team"){
            return ['Team 1', 'Team 2', 'Team 3', 'Team 4'];
        }else if(assigneeType === "User"){
            return ['User 1', 'User 2', 'User 3', 'User 4'];
        }

        return [];
    }

    return(
        <React.Fragment>
            <Dropdown className="cnx_select_box_dd">
                <Dropdown.Toggle className="cnx_select_box">
                    {assigneeFor || `Select ${assigneeType}`}
                </Dropdown.Toggle>
                <Dropdown.Menu className="cnx_select_box_options">
                    <div className='cnx_select_box_search'>
                        <SearchBox ref={searchRef} value={search} onChange={setSearch} />
                    </div>
                    {
                        options()?.map((option => ( 
                            <Dropdown.Item 
                                key={`${option}-${Math.random()}`}
                                onClick={() => setAssigneeFor(option)}
                                className={ `cnx_select_box_option ${assigneeFor === option ? 'active': ''}`}> 
                                    {option}
                                    {assigneeFor === option && <i className="fa-solid fa-check" />}
                                </Dropdown.Item>
                        )))
                    }
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    )
}

// pipeline 

const PipelineSelect = ({ pipeline, setPipeline, multiple }) => {
    const [search, setSearch] = React.useState('');

    const searchRef = React.useRef(null);

    React.useEffect(() => {
        if(searchRef && searchRef.current){
            searchRef.current.focus();
        }
    }, [searchRef]);

    const onSelected = (option) => {
        if(multiple){
            if(pipeline.includes(option)){
                setPipeline(pipeline.filter(p => p !== option));
            }else{
                setPipeline([...pipeline, option]);
            }
        }else{
            setPipeline([option]);
        }
    }

    // remove tag
    const remove = (option) => {
        setPipeline(pipeline.filter(p => p !== option));
    }

    // remove all tags
    const removeAll = () => {
        if(multiple){
            setPipeline([]);
        }else setPipeline('Select Pipeline');
    }

    const options = () => ([
        'Pipeline',
        'Pipeline 1',
    ])

    return(
        <React.Fragment>
            <Dropdown className="cnx_select_box_dd">
                <Dropdown.Toggle className="cnx_select_box">
                    <div>
                        {multiple ? pipeline.length > 0 ? pipeline.map(p => (
                            <div key={`${p}-${Math.random()}`} className="cnx_select_box_tag">
                                <button aria-label='removeTag' onMouseDown={() => remove(p)}>
                                    <i className="fa-solid fa-xmark" />
                                </button>
                                <span>{p}</span> 
                            </div>
                        )) : 'Select Pipeline' : pipeline || 'Select Pipeline'}
                    </div>

                    <button aria-label='close' onMouseDown={() => removeAll()}>
                        <i className="fa-solid fa-xmark" />
                    </button>
                </Dropdown.Toggle>
                <Dropdown.Menu className="cnx_select_box_options pipeline">
                    <div className='cnx_select_box_search'>
                        <SearchBox ref={searchRef} value={search} onChange={setSearch}  className="cnx_select_box_search_input" />
                    </div>

                    {
                        multiple && (
                            <Dropdown.Item
                            onClick={() => setPipeline([...options()])}
                            className={`cnx_select_box_option all`}> All Pipeline </Dropdown.Item>
                        )
                    }
                    <div className="hr" />
                    {options()?.map(option => (
                        <Dropdown.Item key={`${option}-${Math.random()}`} 
                        onClick={() => onSelected(option)}
                        className={`cnx_select_box_option ${multiple ? pipeline.includes(option) &&'active' : pipeline===option ? 'active' : '' }`}> {option} 
                        {multiple ? pipeline.includes(option) && 
                        <i className="fa-solid fa-check" /> 
                         : pipeline === option && <i className="fa-solid fa-check" />}
                        </Dropdown.Item>

                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    )
}



const GoalFormModal = () => {
    const [isOpen, setIsOpen] = React.useState(true);

    // form data
    const [assigneeType, setAssigneeType] = React.useState('User');
    const [assigneeFor, setAssigneeFor] = React.useState('');
    const [pipeline, setPipeline] = React.useState(["Pipeline"]);

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
                    <Card.Body className='cnx_ins__goal_modal cnx_ins__goal_form_modal'>

                        {/* assignee  */}
                        <div className='cnx_ins__goal_modal__card_body'>
                            <div className='cnx_ins__goal_modal__card_body_label'>
                                Assignee
                            </div>
                            {/* assignee type */}
                            <div className='cnx_select_box_wrapper'>
                                <Dropdown className="cnx_select_box_dd">
                                    <Dropdown.Toggle className="cnx_select_box">
                                        {assigneeType}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="cnx_select_box_options">
                                        <Dropdown.Item onClick={() => setAssigneeType("Company")} className={`cnx_select_box_option ${assigneeType === 'Company'? 'active' : ''}`}> Company (everyone) 
                                            {assigneeType === 'company' && <i className="fa-solid fa-check" />}
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => setAssigneeType("Team")} className={`cnx_select_box_option ${assigneeType === 'Team'? 'active' : ''}`}> Team
                                        {assigneeType === 'Team' && <i className="fa-solid fa-check" />}</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setAssigneeType("User")} className={`cnx_select_box_option ${assigneeType === 'User'? 'active' : ''}`}> User {assigneeType === 'user' && <i className="fa-solid fa-check" />}</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            {/* end assignee type */} 
                            {assigneeType === 'Company' ? null :  
                            <AssigneeFor 
                                assigneeFor={assigneeFor} 
                                setAssigneeFor={setAssigneeFor}
                                assigneeType={assigneeType}    
                            />}
                            </div>
                        </div>
                        {/* end assignee */}

                        {/* pipeline */}
                        <div className='cnx_ins__goal_modal__card_body'>
                            <div className='cnx_ins__goal_modal__card_body_label'>
                                Pipeline
                            </div>

                            <div className='cnx_select_box_wrapper'>
                                <PipelineSelect 
                                    pipeline={pipeline}
                                    setPipeline={setPipeline}
                                    multiple={true}
                                />
                            </div>
                        </div>

                        {/* end pipeline */}
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






// props types 

AssigneeFor.propTypes = {
    assigneeFor: PropsTypes.string.isRequired,
    setAssigneeFor: PropsTypes.func.isRequired,
    assigneeType: PropsTypes.string.isRequired,
}


PipelineSelect.propTypes = {
    pipeline: PropsTypes.array.isRequired,
    setPipeline: PropsTypes.func.isRequired,
    multiple: PropsTypes.bool.isRequired,
}