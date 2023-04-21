import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import './insights.css';
import InsightSidebar from './components/Sidebar';
import GoalModal from './components/GoalModal';

const Insights = () => {
  return(
    <div className='cnx_insights'>
        <InsightSidebar />
        <GoalModal />
    </div>
  )
}

export default Insights;