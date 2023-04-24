import { Provider, useSelector } from 'react-redux';
import { store } from './services/store';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';


import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import './insights.css';
import InsightSidebar from './components/Sidebar';
import GoalModal from './components/GoalModal';
import GoalFormModal from './components/GoalFormModal';
import Modal from './ui/Modal';
import NewDashboardModal from './components/NewDashboardModal';
import AddSectionModal from './components/AddSectionModal';
// import ReportModal from './components/ReportModal';

const InsightsComponent = () => {
  const {goalModalOpen} = useSelector((state) => state.goalModal);
  const {goalFormModalOpen} = useSelector((state) => state.goalFormModal);
  const {dashboardModalOpen} = useSelector((state) => state.dashboardModal);
  const {sectionModalOpen} = useSelector((state) => state.sectionModal);


  return(
    <div className='cnx_insights'>
        <InsightSidebar />
        <main>
          hello
          <Outlet />
        </main>

      {/* goal modals */}
        <Modal isOpen={goalFormModalOpen || goalModalOpen}>
           {goalModalOpen && <GoalModal />}
           {goalFormModalOpen && <GoalFormModal /> }
        </Modal>
        {/* <ReportModal /> */}

        <Modal isOpen={dashboardModalOpen || sectionModalOpen}>
          { dashboardModalOpen && <NewDashboardModal /> }
          { sectionModalOpen && <AddSectionModal />}
        </Modal>
    </div>
  )
}




// Insights Component 

const Insights = () => {
    return(
        <BrowserRouter>
          <Provider store={store}>
            <Routes>
              <Route path="/" element={<InsightsComponent />}>
                <Route path="/insights/dashboards/:dashboardId" element={<h1>Dashboard</h1>} />
                <Route path="*" element={<h1>404</h1>} />
              </Route>
            </Routes>
          </Provider>
        </BrowserRouter>
    )
}

export default Insights;