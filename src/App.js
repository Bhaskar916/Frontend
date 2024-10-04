import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Constants, { UPLOADER } from "./components/common/Constants";
import UserAuth from "./components/common/UserAuth";
import SessionValidation from "./components/common/SessionValidation";
import Header from "./components/common/header/Header";
import SideBar from "./components/common/side-bar/SideBar";

import Login from "./components/common/login/Login";
import Uploader from "./components/uploader/uploader";

import Dashboard from "./components/dashboard/Dashboard";
// import TrackDashboard from './components/dashboard/TrackDashboard';
// import IncidentDashboard from './components/dashboard/IncidentDashboard';
// import RecommendDashboard from './components/dashboard/RecommendDashboard';

// import RaiseAlarm from './components/mod-alerts/RaiseAlarm'
// import StopAlarm from './components/mod-alerts/StopAlarm'
// import ModAlert from './components/mod-alerts/ModAlert'

// import OnboardClient from './components/clients/OnboardClients';
// import OnboardProject from './components/project/OnboardProject';
// import OnboardTrack from './components/track/OnboardTrack';
// import OnboardComponent from './components/component/OnboardComponent';

// import MOM from './components/mom/js/AddMom.js';
import OnboardUser from "./components/onboard-user/js/OnboardUser";
// import AddIncident from './components/incident-management/js/AddIncident';
// import UpdateIncident from './components/incident-management/js/UpdateIncident';
// import IncidentList from './components/incident-management/js/ViewIncident';
// import AddEvent from './components/incident-management/js/AddEvent';

// import OnboardResource from './components/resources/onboard-resources/js/OnboardResources';

// import DeployResource from './components/resources/deploy-resources/js/DeployResource';

import ChangePassword from "./components/profile/changePassword/js/ChangePassword";
import UserProfile from "./components/profile/myProfile/js/MyProfile";
import Settings from "./components/profile/settings/js/Setting";
import ForgotPassword from './components/common/forgot-password/ForgotPassword';
import Support from './components/profile/support/Support';

// import OnboardApplication from './components/app-onboarding/js/AppOnboard';
// import DwnStreamAppOnb from './components/downstream-app-onboarding/DwnStreamAppOnb'

// import AddRecommendations from './components/recommendations/add-recommendations/AddRecommendations';
// import ViewRecommendations from './components/recommendations/recommendation-list/RecommendationList';
// import UpdateRecommendations from './components/recommendations/update-recommendations/UpdateRecommendations';
import commonStyles from "./components/common/common-css/CommonStyle";
// import AddAnalysis from './components/incident-management/js/AddAnalysis';
// import PasGuidelines from './components/incident-management/js/PasGuidelines';
// import PublishRecommendation from './components/recommendations/reports/PublishRecommendation';
// import ViewPasGuidelines from './components/incident-management/js/ViewPasGuidelines';

function App() {
  const commonClasses = commonStyles();

  return (
    <UserAuth>
      <SessionValidation />
      <BrowserRouter>
        <div className={commonClasses.appLevelMaindiv}>
          {/* <SideBar /> */}

          <div id="appMainRoutesDivOuter">
            <div>
              <Header />
            </div>

            <Routes>
              <Route path={Constants.LOGIN_LINK} element={<Login />} />
            </Routes>

            <Routes>
              <Route path={Constants.DASHBOARD_LINK} element={<Dashboard />} />
            </Routes>
            <Routes>
              <Route path={Constants.UPLOADER_LINK} element={<Uploader />} />
            </Routes>
            {/* <Routes>
              <Route path={Constants.TRACK_DASHBOARD_LINK} element={<TrackDashboard />} />
            </Routes>
            <Routes>
              <Route path={Constants.INCIDENT_DASHBOARD_LINK} element={<IncidentDashboard />} />
            </Routes>
            <Routes>
              <Route path={Constants.RECOMMENDATION_DASHBOARD_LINK} element={<RecommendDashboard />} />
            </Routes> */}

            {/* <Routes>
              <Route path={Constants.RAISE_MOD_ALERT_LINK} element={<RaiseAlarm />} />
            </Routes>
            <Routes>
              <Route path={Constants.STOP_MOD_ALERT_LINK} element={<StopAlarm />} />
            </Routes>
            <Routes>
              <Route path={Constants.MOD_ALERT_PAGE_LINK} element={<ModAlert />} />
            </Routes>
 */}

            {/* <Routes>
              <Route
                path={Constants.ONBOARD_CLIENT_LINK}
                element={<OnboardClient />}
              />
            </Routes>
            <Routes>
              <Route
                path={Constants.ONBOARD_PROJECT_LINK}
                element={<OnboardProject />}
              />
            </Routes>

            <Routes>
              <Route
                path={Constants.ONBOARD_TRACK_LINK}
                element={<OnboardTrack />}
              />
            </Routes>

            <Routes>
              <Route
                path={Constants.ONBOARD_COMPONENT_LINK}
                element={<OnboardComponent />}
              />
            </Routes> */}

            <Routes>
              <Route
                path={Constants.ONBOARD_USER_LINK}
                element={<OnboardUser />}
              />
            </Routes>

            <Routes>
            <Route 
               path={Constants.FORGOT_PASSWORD_LINK} 
               element={<ForgotPassword />} />
            </Routes>

            <Routes>
              <Route path={Constants.SETTINGS_LINK} element={<Settings />} />
            </Routes>

            <Routes>
              <Route
                path={Constants.CHANGE_PASSWORD_LINK}
                element={<ChangePassword />}
              />
            </Routes>
            
            <Routes>
              <Route path={Constants.SUPPORT_LINK} element={<Support />} />
            </Routes>

            {/* <Routes>
              <Route
                path={Constants.ONBOARD_RESOURCE_LINK}
                element={<OnboardResource />}
              />
            </Routes>

            <Routes>
              <Route
                path={Constants.DEPLOY_RESOURCE_LINK}
                element={<DeployResource />}
              />
            </Routes>
            <Routes>
              <Route path={Constants.MOM_LINK} element={<MOM />} />
            </Routes>

            <Routes>
              <Route
                path={Constants.CREATE_INCIDENT_LINK}
                element={<AddIncident />}
              />
            </Routes>

            <Routes>
              <Route
                path={Constants.UPDATE_INCIDENT_LINK}
                element={<UpdateIncident />}
              />
            </Routes>

            <Routes>
              <Route
                path={Constants.VIEW_INCIDENTS_LINK}
                element={<IncidentList />}
              />
            </Routes>

            <Routes>
              <Route
                path={Constants.ADD_INCIDENT_EVENT_LINK}
                element={<AddEvent />}
              />
            </Routes>

            <Routes>
              <Route
                path={Constants.ADD_INCIDENT_ANALYSIS_LINK}
                element={<AddAnalysis />}
              />
            </Routes>

            <Routes>
              <Route
                path={Constants.CHANGE_PASSWORD_LINK}
                element={<ChangePassword />}
              />
            </Routes>
            
            <Routes>
              <Route path={Constants.SETTINGS_LINK} element={<Settings />} />
            </Routes>

            {/* <Routes>
              <Route path={Constants.ADD_RECOMMENDATIONS_LINK} element={<AddRecommendations />} />
            </Routes>

            <Routes>
              <Route path={Constants.VIEW_RECOMMENDATIONS_LINK} element={<ViewRecommendations />} />
            </Routes>

            <Routes>
              <Route path={Constants.UPDATE_RECOMMENDATIONS_LINK} element={<UpdateRecommendations />} />
            </Routes>
            <Routes>
              <Route path={Constants.PUBLISH_RECOMMENDATIONS_LINK} element={<PublishRecommendation />} />
            </Routes>

            <Routes>
              <Route path={Constants.ONBOARD_DWN_STREAM_APP_LINK} element={<DwnStreamAppOnb />} />
            </Routes>
            <Routes>
              <Route path={Constants.ONBOARD_APP_LINK} element={<OnboardApplication />} />
            </Routes>

            <Routes>
              <Route path={Constants.ADD_PAS_GUIDELINES_LINK} element={<PasGuidelines />} />
            </Routes>

            <Routes>
              <Route path={Constants.VIEW_PAS_GUIDELINES_LINK} element={<ViewPasGuidelines />} />
            </Routes> */}
          </div>
        </div>
      </BrowserRouter>
    </UserAuth>
  );
}

export default App;
