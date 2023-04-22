import * as React from 'react';
import SearchBox from '../ui/Searchbox';
import Button from '../ui/Button';
import Tooltip from '../ui/Tooltip';
import Dropdown from '../ui/Dropdown';


const InsightSidebar = () => {
    const [search, setSearch] = React.useState('');


    return(
        <aside className='cnx_ins__sidebar'> 

            {/* search box  */}
            <div className='cnx_ins__sidebar_header'>
                <SearchBox 
                    value={search} 
                    onChange={setSearch} 
                    placeholder="Search from Insights"
                />

               <Dropdown>
                    <Dropdown.Toggle icon={false}>
                        <Tooltip text="add Goal" >
                            <Button aria-label="GoalAddButton" variant='success' className='cnx_ins__sidebar_btn'>
                                <i className="fas fa-plus cnx__btn_icon"/>
                            </Button>
                        </Tooltip>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="cnx_ins__sidebar_header_dd">
                        <Dropdown.Item className="cnx_ins__sidebar_header_dd_item">
                            <i className="fa-solid fa-chart-column" />
                            <span>Report</span>
                        </Dropdown.Item>
                        
                        <Dropdown.Item className="cnx_ins__sidebar_header_dd_item">
                            <i className="fa-solid fa-chart-pie" />
                            <span>Dashboard</span>
                        </Dropdown.Item>

                        <Dropdown.Item className="cnx_ins__sidebar_header_dd_item">
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                width="16" 
                                height="16"
                            >
                                <path d="M24,12c0,6.62-5.38,12-12,12S0,18.62,0,12,5.38,0,12,0c.73,0,1.47,.07,2.18,.2,.54,.1,.9,.62,.8,1.16-.1,.54-.62,.9-1.16,.8-.59-.11-1.21-.16-1.82-.16C6.49,2,2,6.49,2,12s4.49,10,10,10,10-4.49,10-10c0-.61-.06-1.22-.16-1.82-.1-.54,.26-1.06,.8-1.16,.55-.1,1.06,.26,1.16,.8,.13,.71,.2,1.45,.2,2.18ZM12.86,6.06c.55,.08,1.05-.3,1.13-.85s-.3-1.05-.85-1.13c-.38-.05-.76-.08-1.14-.08-4.41,0-8,3.59-8,8s3.59,8,8,8,8-3.59,8-8c0-.38-.03-.76-.08-1.14-.08-.55-.58-.93-1.13-.85-.55,.08-.93,.58-.85,1.13,.04,.28,.06,.57,.06,.86,0,3.31-2.69,6-6,6s-6-2.69-6-6,2.69-6,6-6c.29,0,.58,.02,.86,.06Zm-2.19,4.45c.41-.37,.45-1,.08-1.41-.37-.41-1-.45-1.41-.08-.85,.76-1.33,1.85-1.33,2.98,0,2.21,1.79,4,4,4,1.14,0,2.22-.49,2.98-1.33,.37-.41,.33-1.04-.08-1.41-.41-.37-1.04-.33-1.41,.08-.38,.42-.92,.67-1.49,.67-1.1,0-2-.9-2-2,0-.57,.24-1.11,.67-1.49Zm1.63-.22c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29l4.71-4.71h2.59c.27,0,.52-.11,.71-.29l2-2c.29-.29,.37-.72,.22-1.09-.15-.37-.52-.62-.92-.62h-2V1c0-.4-.24-.77-.62-.92-.38-.16-.8-.07-1.09,.22l-2,2c-.19,.19-.29,.44-.29,.71v2.59l-4.71,4.71Z"/>
                            </svg>

                            <span>Report</span>
                        </Dropdown.Item>
                    </Dropdown.Menu>
               </Dropdown>
            </div>



        </aside>
    )
}

export default InsightSidebar;