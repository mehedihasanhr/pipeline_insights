import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openGoalModal } from '../services/slices/goalModalSlice';
import { closeGoalFormModal } from '../services/slices/goalFormModalSlice';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Dropdown from '../ui/Dropdown';
import SearchBox from '../ui/Searchbox';
import PropsTypes from 'prop-types';
import RangeDatePicker from '../ui/RangeDatePicker';
import Tooltip from '../ui/Tooltip';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import WeekOfYear from "dayjs/plugin/weekOfYear";
import _ from 'lodash';


// assignee for 

const AssigneeFor = ({assigneeFor, setAssigneeFor, assigneeType}) => {
    const [search, setSearch] = React.useState('');

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
                        <SearchBox autoFocus={true} value={search} onChange={setSearch} />
                    </div>
                    {
                        options()?.filter(f => f.includes(search)).map((option => ( 
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
        }else setPipeline(['Select Pipeline']);
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
                        {multiple ? pipeline.length > 0 && pipeline.map(p => (
                            <div key={`${p}-${Math.random()}`} className="cnx_select_box_tag">
                                <button aria-label='removeTag' onMouseDown={() => remove(p)}>
                                    <i className="fa-solid fa-xmark" />
                                </button>
                                <span>{p}</span> 
                            </div>
                        )) : pipeline[0]}
                    </div>

                    <button aria-label='close' onMouseDown={() => removeAll()}>
                        <i className="fa-solid fa-xmark" />
                    </button>
                </Dropdown.Toggle>
                <Dropdown.Menu className="cnx_select_box_options pipeline">
                    <div className='cnx_select_box_search'>
                        <SearchBox autoFocus={true} value={search} onChange={setSearch}  className="cnx_select_box_search_input" />
                    </div>

                    {
                        multiple && (
                            <>
                                <Dropdown.Item
                                onClick={() => setPipeline([...options()])}
                                className={`cnx_select_box_option all`}> All Pipeline </Dropdown.Item>
                                <div className="hr" />
                            </>
                        )
                    }
                    {options()?.filter(f => f.includes(search)).map(option => (
                        <Dropdown.Item key={`${option}-${Math.random()}`} 
                        onClick={() => onSelected(option)}
                        className={`cnx_select_box_option ${multiple ? pipeline.includes(option) &&'active' : pipeline===option ? 'active' : '' }`}> {option} 
                        {pipeline.includes(option) && 
                        <i className="fa-solid fa-check" />   }
                        </Dropdown.Item>

                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    )
}

// Qualified
const Qualified = ({ qualified, setQualified }) => {
    const options = () => ([
        "Contact Mode",
        "Qualified",
        "Requirements Defined",
        "Proposal Made",
        "Negotiations Started",
    ])

    return(
        <React.Fragment>
            <Dropdown className="cnx_select_box_dd">
                <Dropdown.Toggle className="cnx_select_box">
                    {qualified}
                </Dropdown.Toggle>
                <Dropdown.Menu className="cnx_select_box_options">
                    {
                        options()?.map(option => (
                            <Dropdown.Item key={`${option}-${Math.random()}`} 
                            onClick={() => setQualified(option)}
                            className={`cnx_select_box_option ${qualified === option ? 'active' : ''}`}> {option} 
                            {qualified === option && <i className="fa-solid fa-check" />}
                            </Dropdown.Item>

                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    )
}

// Frequency
const Frequency = ({ frequency, setFrequency }) => {

    const options = () => ([
        'Weekly',
        'Monthly',
        'Quarterly',
        'Yearly',
    ])

    return(
        <React.Fragment>
            <Dropdown className="cnx_select_box_dd">
                <Dropdown.Toggle className="cnx_select_box">
                    {frequency || 'Select Frequency'}
                </Dropdown.Toggle>
                <Dropdown.Menu className="cnx_select_box_options">
                    {
                        options()?.map(option => (
                            <Dropdown.Item key={`${option}-${Math.random()}`} 
                            onClick={() => setFrequency(option)}
                            className={`cnx_select_box_option ${frequency === option ? 'active' : ''}`}> {option} 
                            {frequency === option && <i className="fa-solid fa-check" />}
                            </Dropdown.Item>

                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
    )
}
// period
const Period = ({ period, recurringValue, setRecurringValue, trackingType }) => {
    const [value, setValue] = React.useState('');

    const handleChange = e => {
        const index = recurringValue.findIndex(f => f?.title === period?.title);
        if(index !== -1){
            if(!e.target.value){
                const newValue = recurringValue.filter(f => f?.title !== period?.title);
                setValue(e.target.value);
                setRecurringValue(newValue);
                return;
            }

            const newValue = recurringValue.map((m, i) => {
                if(i === index){
                    return {...m, ...{value: e.target.value}}
                }
                return m;
            })
            setValue(e.target.value);
            setRecurringValue(newValue);
            return;
        }

        if(e.target.value){
            setValue(e.target.value);
            setRecurringValue([ ...recurringValue, {value: e.target.value, ...period}]);
        }

        
    }


    return(
        <div className='cnx_time_period__item'>
            <div className="cnx_select_box cnx_time_periods__title">
                {period?.title}
            </div>
            <div className='cnx_time_periods__input'>
                <input type='number' value={value} onChange={handleChange} placeholder={`Insert ${trackingType}`} min={0} className='cnx_select_box' />
            </div>
        </div>
    )
}

// tracking Value
const TrackingInput = ({ 
    trackingType, 
    startDate, 
    endDate, 
    trackingValue, 
    setTrackingValue,
    recurring,
    setRecurring, 
    applyRecurring,
    setApplyRecurring,
    frequency 
}) => {
    const [checked, setChecked] = React.useState(false);
    const [period, setPeriod] = React.useState([]);
    const [error, setError] = React.useState(recurring);

    React.useEffect(()=> {
        if(!endDate){
            setChecked(false);
        }
    }, [endDate])

    React.useEffect(() => {
        const doc = document.querySelector('.cnx_ins__goal_form_modal');
        if(doc.offsetHeight > 720){
            doc.style.height = '720px';
            doc.style.overflowY = 'auto';
        } else {
            doc.style.height = 'auto';
            doc.style.overflowY = 'unset';
        }

    }, [period, endDate, startDate, frequency])
    
    // apply all 
    const applyAll = () => {
        if(recurring.length > 0){
            setError(false);
            setApplyRecurring(true);
        } else setError(true);  
    }

    // remove error
    React.useEffect(() => {
        if(recurring.length > 0 || !checked){
            setError(false);
        }
    }, [recurring, checked])

    // period control
    React.useEffect(() => {
        dayjs.extend(utc);
        dayjs.extend(quarterOfYear);
        dayjs.extend(isSameOrBefore);
        dayjs.extend(WeekOfYear);

        setRecurring([]);

        // yearly
        const yearly = () => {
            let years = [];
            const yearStart = dayjs(startDate).startOf("year");
            const yearEnd = dayjs(endDate).endOf("year");
            let current = yearStart;

            while (current <= yearEnd) {
                years.push({
                    title: `${current.format("YYYY")}`,
                    start: dayjs(startDate).format(),
                    end: dayjs(endDate).format(),
                });
                current = dayjs(current).add(1, "year");
            }

            setPeriod([...years]);
        };

        // quarterly
        const quarterly = () => {
            let quarters = [];
            const qs = dayjs(startDate).startOf("quarter");
            const qe = dayjs(endDate).endOf("quarter");

            let curr = qs;
            while (curr <= qe) {
                const quarterNumber = dayjs(curr).quarter(); // number of quarter
                let quarterStart = dayjs(curr).format(); // get first date of a quarter start
                let quarterEnd = dayjs(curr)
                    .quarter(quarterNumber)
                    .endOf("quarter")
                    .format(); // get last date of a quarter end

                /*
                 ** if quarter start date less then or equal
                 ** duration start date then start date is duration start date
                 ** else start date is quarter start date
                 */
                quarterStart = dayjs(quarterStart).isSameOrBefore(startDate)
                    ? dayjs(startDate).format()
                    : quarterStart;

                /*
                 ** if duration end date less then or equal
                 ** duration end date then end date is duration end date
                 ** else end date is quarter end date
                 */
                quarterEnd = dayjs(endDate).isSameOrBefore(quarterEnd)
                    ? dayjs(endDate).format()
                    : quarterEnd;

                // create title for period
                const title = `Q${quarterNumber} (${dayjs(quarterStart).format(
                    `MMM DD`
                )} - ${dayjs(quarterEnd).format("MMM DD")}, ${dayjs(
                    quarterEnd
                ).format("YYYY")})`;

                // push quarters
                quarters.push({
                    quarterNumber,
                    title,
                    start: quarterStart,
                    end: quarterEnd,
                });

                curr = dayjs(curr).add(1, "quarter");
            }

            setPeriod([...quarters]);
        };

        // divide by month
        const monthly = () => {
            const months = [];
            const ms = dayjs(startDate).startOf("month");
            const me = dayjs(endDate).endOf("month");

            let curr = ms;

            while (curr <= me) {
                let monthStartDay = dayjs(curr).format();
                let monthEndDay = dayjs(curr).endOf("month").format();

                /*
                 ** if monthStartDay less then or equal
                 ** duration start date then return duration start
                 ** else return monthStartDay
                 */

                monthStartDay = dayjs(monthStartDay).isSameOrBefore(
                    startDate
                )
                    ? dayjs(startDate).format()
                    : monthStartDay;

                /*
                 ** if duration end less then or equal
                 ** monthEndDay date then return duration end
                 ** else return monthEndDay
                 */

                monthEndDay = dayjs(endDate).isSameOrBefore(monthEndDay)
                    ? dayjs(endDate).format()
                    : monthEndDay;

                // push month
                months.push({
                    title: dayjs(curr).format("MMM YYYY"),
                    start: monthStartDay,
                    end: monthEndDay,
                });

                curr = dayjs(curr).add(1, "month");
            }

            setPeriod([...months]);
        };

        // weekly
        const weekly = () => {
            const weeks = [];
            const ws = dayjs(startDate).startOf("week");
            const we = dayjs(endDate).endOf("week");

            let curr = ws;
            while (curr <= we) {
                const weekNumber = dayjs(curr).week();
                let weekStart = dayjs(curr).format();
                let weekEnd = dayjs(curr).endOf("week").format();

                /*
                 ** if week start less then or equal
                 ** duration start then return duration start
                 ** else return week start
                 */
                weekStart = dayjs(weekStart).isSameOrBefore(startDate)
                    ? dayjs(startDate).format()
                    : weekStart;

                /*
                 ** if duration end less then or equal
                 ** week end then return duration end
                 ** else return week end
                 */
                weekEnd = dayjs(endDate).isSameOrBefore(weekEnd)
                    ? dayjs(endDate).format()
                    : weekEnd;

                // title
                const title = `Week ${weekNumber} (${dayjs(weekStart).format(
                    "MMM DD"
                )} - ${dayjs(weekEnd).format("MMM DD")}, ${dayjs(
                    weekEnd
                ).format("YYYY")})`;

                // push
                weeks.push({
                    title,
                    start: weekStart,
                    end: weekEnd,
                });

                curr = dayjs(curr).add(1, "week");
            }

            setPeriod([...weeks]);
        };

        if (endDate) {
            if (_.toLower(frequency) === "monthly") {
                monthly();
            } else if (_.toLower(frequency) === "quarterly") {
                quarterly();
            } else if (_.toLower(frequency) === "yearly") {
                yearly();
            } else if (_.toLower(frequency) === "weekly") {
                weekly();
            }
        }
    }, [endDate, frequency, setRecurring, startDate]);
    // end time period control


    return(
        <div className='cnx_ins_tracking'>
            <div className="cnx_ins__goal_modal__tracking_input">
                <input 
                    type='number' 
                    value = {trackingValue}
                    onChange={e => setTrackingValue(e.target.value)}
                    placeholder={`Insert ${trackingType}`} 
                    min={0} 
                    className='cnx_select_box'
                    style={{width: 'auto'}}
                />
                {checked ? 
                    <Button size='sm' onClick={applyAll}>
                       {applyRecurring? 'Applied' : 'Apply all'}
                    </Button>
                : <Tooltip text='Recurring'>
                    <i className="fa-solid fa-repeat"></i>
                </Tooltip>}
            </div>
            {endDate ?  <div className="cnx_ins__goal_modal__tracking_input">
                <input type='checkbox' id="recurring" onChange={e =>setChecked(e.target.checked)}  />
                <label htmlFor='recurring'>Specify individual period goals</label>
            </div> :
                <Tooltip text='Select a duration end date to enable this option'>
                    <div className="cnx_ins__goal_modal__tracking_input">
                        <input type='checkbox' id="recurring" disabled />
                        <label htmlFor='recurring' className='disabled'>Specify individual period goals</label>
                    </div>
                </Tooltip>
            }

            {error && <div className='cnx_ins__goal_modal__tracking_input_error'>
                Please add minimum of {trackingType}
            </div>}

            {checked && <div className='cnx_time_period'>
                <div className='cnx_time_period__header'>
                    <div className="cnx_time_periods__title">
                        Period
                    </div>
                    <div className='cnx_time_periods__input' style={{marginLeft: '10px'}}>
                        {trackingType === 'value' ? 'Value (USD)' : 'Count'}
                    </div>
                </div>
                {period.map(p => (
                    <Period  
                        key={`${p.title}`} 
                        period={p} 
                        recurringValue={recurring}
                        trackingType={trackingType}
                        setRecurringValue={setRecurring}
                    />
                ))}
            </div>}
        </div>
    )
}


// goal modal
const GoalFormModal = () => {
    const { mode, entry, entryType } = useSelector(state => state.goalFormModal);
    const dispatch = useDispatch();

    // form data
    const [assigneeType, setAssigneeType] = React.useState('User');
    const [assigneeFor, setAssigneeFor] = React.useState('');
    const [pipeline, setPipeline] = React.useState(["Pipeline"]);
    const [frequency, setFrequency] = React.useState('Monthly');
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(null);
    const [trackingType, setTrackingType] = React.useState('value');
    const [trackingValue, setTrackingValue] = React.useState('');
    const [recurring, setRecurring] = React.useState([]);
    const [applyRecurring, setApplyRecurring] = React.useState(false);
    const [qualified, setQualified] = React.useState('Qualified');

    React.useEffect(() => {
        if(recurring.length === 0){
            setApplyRecurring(false);
        }
    }, [recurring])

    // close modal
    const previous = () => {
        if(mode === 'add'){
            dispatch(openGoalModal({
                entry,
                entryType,
            }))
            dispatch(closeGoalFormModal());
        }
    }

    // close modal
    const close = () => {
        dispatch(closeGoalFormModal());
    }

    return(
        <div className="cnx_ins__goal_modal__container">
            <Card className="cnx_ins__goal_modal__card">
                <Card.Header 
                    className="cnx_ins__goal_modal__card_header"
                    onClose={close}
                >
                    <div className='cnx_ins__goal_modal__card_header_title'>
                        Goal Modal
                    </div>
                </Card.Header>
                {/* card body */}
                <Card.Body className={`cnx_ins__goal_modal cnx_ins__goal_form_modal`}>
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
                                    {assigneeType === 'Company' && <i className="fa-solid fa-check" />}
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setAssigneeType("Team")} className={`cnx_select_box_option ${assigneeType === 'Team'? 'active' : ''}`}> Team
                                {assigneeType === 'Team' && <i className="fa-solid fa-check" />}</Dropdown.Item>
                                <Dropdown.Item onClick={() => setAssigneeType("User")} className={`cnx_select_box_option ${assigneeType === 'User'? 'active' : ''}`}> User {assigneeType === 'User' && <i className="fa-solid fa-check" />}</Dropdown.Item>
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
                            multiple={entryType !== 'Progressed'}
                        />

                        {entryType==='Progressed' &&
                            <Qualified qualified={qualified} setQualified={setQualified} />
                        }
                    </div>
                </div>
                {/* end pipeline */}



                {/* Frequency */}
                <div className='cnx_ins__goal_modal__card_body'>
                    <div className='cnx_ins__goal_modal__card_body_label'>
                        Frequency
                    </div>

                    <div className='cnx_select_box_wrapper'>
                    <Frequency frequency={frequency} setFrequency={setFrequency} />
                    </div>
                </div>
                {/* end Frequency */}

                {/* Duration */}
                <div className='cnx_ins__goal_modal__card_body'>
                    <div className='cnx_ins__goal_modal__card_body_label'>
                    Duration 
                    </div>

                    <div className='cnx_select_box_wrapper'>
                        <RangeDatePicker 
                            startDate={startDate}
                            endDate={endDate}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                        />
                    </div>
                </div>
                {/* end Duration */}


                {/* Tracking metric */}
                <div className='cnx_ins__goal_modal__card_body'>
                    <div className='cnx_ins__goal_modal__card_body_label'>
                        Tracking metric
                    </div>

                    <div className='cnx_select_box_wrapper'>
                        <label className='' htmlFor='metric_value'>
                            <input id="metric_value" type="radio" name="metric" value="value" onChange={e => setTrackingType(e.target.value)} defaultChecked={true} />
                            Value
                        </label>

                        <label className='' htmlFor='metric_count'>
                            <input type="radio" id="metric_count" name="metric" value="count" onChange={e => setTrackingType(e.target.value)} />
                            Count
                        </label>
                    </div>
                </div>
                {/* end Tracking metric */}


                {/* Tracking metric */}
                <div className='cnx_ins__goal_modal__card_body' style={{alignItems: 'flex-start'}}>
                    <div className='cnx_ins__goal_modal__card_body_label' style={{marginTop: '6px'}}>
                        {trackingType === 'value' ? 'Value (USD)' : 'Count'}
                    </div>

                    <div className='cnx_select_box_wrapper'>
                        <TrackingInput 
                            trackingType={trackingType} 
                            startDate={startDate}
                            endDate={endDate} 
                            recurring={recurring}
                            setRecurring={setRecurring}
                            trackingValue={trackingValue}
                            setTrackingValue={setTrackingValue}
                            frequency={frequency}
                            applyRecurring={applyRecurring}
                            setApplyRecurring={setApplyRecurring}
                        />
                    </div>
                </div>
                {/* end Tracking metric */}

                </Card.Body>
                {/* end card body */}
                <Card.Footer>
                        <Button
                            onClick={previous}
                            className='cnx_ins__goal_modal__card_footer_cancel'
                            variant='tertiary'
                        >
                            <i className="fa-solid fa-chevron-left" />
                            Previous
                        </Button>

                    <div className='cnx_ins__goal_modal__card_footer'>
                        <Button
                            onClick={close}
                            className='cnx_ins__goal_modal__card_footer_cancel'
                            variant='tertiary'
                        >Cancel</Button>
                        <Button 
                            disabled={ !trackingValue && !applyRecurring}  
                            variant='success'
                        >Save</Button>
                    </div>
                </Card.Footer>
            </Card>
        </div> 
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

Frequency.propTypes = {
    frequency: PropsTypes.string.isRequired,
    setFrequency: PropsTypes.func.isRequired,
}


TrackingInput.propTypes = {
    endDate: PropsTypes.any,
    startDate: PropsTypes.instanceOf(Date).isRequired,
    trackingType: PropsTypes.string.isRequired,
    recurring: PropsTypes.array.isRequired,
    setRecurring: PropsTypes.func.isRequired,
    trackingValue: PropsTypes.string.isRequired,
    setTrackingValue: PropsTypes.func.isRequired,
    frequency: PropsTypes.string.isRequired,
    applyRecurring: PropsTypes.bool.isRequired,
    setApplyRecurring: PropsTypes.func.isRequired,
}

Period.propTypes = {
    period: PropsTypes.object.isRequired,
    recurringValue: PropsTypes.array.isRequired,
    setRecurringValue: PropsTypes.func.isRequired,
    trackingType: PropsTypes.string.isRequired,
}

Qualified.propTypes = {
    qualified: PropsTypes.string.isRequired,
    setQualified: PropsTypes.func.isRequired,
}