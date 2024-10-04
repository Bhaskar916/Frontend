import axios from "axios";
import Constants from "../common/Constants";
// import moment from 'moment';

axios.interceptors.request.use(
  (config) => {
    if (
      window.sessionStorage.getItem("avekshaaeasySWATToken") &&
      window.sessionStorage.getItem("avekshaaeasySWATToken") !== ""
    )
      config.headers.authorization =
        "Bearer " + window.sessionStorage.getItem("avekshaaeasySWATToken");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class AuthService {
  async forgotPassword(email) {
    try {
      const response = await fetch(
        `${Constants.COMMON_MODULE_BASE_URL}auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailId: email }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error("Error sending password reset email", error);
      throw error;
    }
  }

  async getSupportTicketList() {
    return axios
      .get(Constants.COMMON_MODULE_BASE_URL + Constants.SUPPORT_TICKET_LIST_URL)
      .then((response) => {
        if (response.status === 200) {
          var ticketArray = response.data.ticketList;
          var tbRows = [];
          var rows = {};
          for (var i = 0; i < ticketArray.length; i++) {
            rows = {
              id: response.data.ticketList[i].ticketID,
              issueType: response.data.ticketList[i].issueType,
              priority: response.data.ticketList[i].priority,
              status: response.data.ticketList[i].status,
              issueDetails: response.data.ticketList[i].issueDetails,
            };
            tbRows.push(rows);
          }
          const preloadData = {
            tbRows: tbRows,
          };
          return preloadData;
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
        const tbRows = [];
        const preloadData = {
          tbRows: tbRows,
        };
        return preloadData;
      });
  }

  async createSupportTicket(reqData) {
    console.log("innnnn");
    let status = "";
    const axios = require("axios");
    await axios
      .post(
        Constants.COMMON_MODULE_BASE_URL + Constants.SUPPORT_CREATE_TICKET_URL,
        reqData
      )
      .then((response) => {
        if (response.status === 200) {
          status = "Inserted";
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          status = "Duplicate";
        } else {
          status = "Exception";
        }
      });
    console.log(status);
    return status;
  }

  async updateSupportTicket(reqData) {
    let status = "";
    const axios = require("axios");
    await axios
      .put(
        Constants.COMMON_MODULE_BASE_URL + Constants.SUPPORT_UPDATE_TICKET_URL,
        reqData
      )
      .then((response) => {
        if (response.status === 200) {
          status = "Updated";
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          status = "Duplicate";
        } else {
          status = "Exception";
        }
      });
    return status;
  }

  async deleteSupportTicket(ticketID) {
    return axios
      .delete(
        Constants.COMMON_MODULE_BASE_URL +
          Constants.SUPPORT_DELETE_TICKET_URL +
          "?ticketID=" +
          ticketID
      )
      .then((response) => {
        return response.data;
      });
  }

  async getDropDownValues(masterType) {
    return axios
      .get(
        Constants.COMMON_MODULE_BASE_URL +
          Constants.DROPDOWN_LIST_URL +
          "?masterType=" +
          masterType
      )
      .then((response) => {
        if (response.status === 200) {
          return response.data.datafordropdown;
        } else {
          return null;
        }
      });
  }

  async getTeamDropValues() {
    return axios
      .get(Constants.COMMON_MODULE_BASE_URL + Constants.TEAM_DROPDOWN_LIST_URL)
      .then((response) => {
        if (response.status === 200) {
          return response.data.teamDropList;
        } else {
          return null;
        }
      });
  }

  async getSettings(settingType) {
    let responseData = "";
    return axios
      .get(
        Constants.COMMON_MODULE_BASE_URL +
          Constants.SETTINGS_URL +
          "?settingType=" +
          settingType
      )
      .then(
        (response) => {
          if (response.status === 200) {
            responseData = response.data;
            return responseData;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  async getProfileData(resourceId) {
    let resourceData = {};
    await axios
      .get(Constants.COMMON_MODULE_BASE_URL + Constants.USER_PROFILE_URL, {
        params: { resourceID: resourceId },
      })
      .then((response) => {
        if (response.status === 200) {
          resourceData = response.data.profileData;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return resourceData;
  }

  async getRecommDropDownValues(masterType) {
    return axios
      .get(
        Constants.COMMON_MODULE_BASE_URL +
          Constants.RECOMMENDATION_DROPDOWN_URL +
          "?masterType=" +
          masterType
      )
      .then((response) => {
        if (response.status === 200) {
          return response.data.datafordropdown;
        } else {
          return null;
        }
      });
  }

  async getDropDownValues(masterType) {
    return axios
      .get(
        Constants.COMMON_MODULE_BASE_URL +
          Constants.DROPDOWN_LIST_URL +
          "?masterType=" +
          masterType
      )
      .then((response) => {
        if (response.status === 200) {
          return response.data.datafordropdown;
        } else {
          return null;
        }
      });
  }

  async getTeamDropValues() {
    return axios
      .get(Constants.COMMON_MODULE_BASE_URL + Constants.TEAM_DROPDOWN_LIST_URL)
      .then((response) => {
        if (response.status === 200) {
          return response.data.teamDropList;
        } else {
          return null;
        }
      });
  }

  async getSettings(settingType) {
    let responseData = "";
    return axios
      .get(
        Constants.COMMON_MODULE_BASE_URL +
          Constants.SETTINGS_URL +
          "?settingType=" +
          settingType
      )
      .then(
        (response) => {
          if (response.status === 200) {
            responseData = response.data;
            return responseData;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  async getAllSettings() {
    let responseData = "";
    return axios
      .get(Constants.COMMON_MODULE_BASE_URL + Constants.ALL_SETTINGS_URL)
      .then(
        (response) => {
          if (response.status === 200) {
            responseData = response.data;
            return responseData;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  async addSettings(reqData) {
    let insertingStatus = "";
    await axios
      .post(
        Constants.COMMON_MODULE_BASE_URL + Constants.UPDATE_SETTINGS_URL,
        reqData
      )
      .then((response) => {
        if (response.status === 200) {
          insertingStatus = "success";
        } else {
          insertingStatus = "Exception";
        }
      })
      .catch((error) => {
        console.log(error);
        insertingStatus = "Exception";
      });
    return insertingStatus;
  }

  async getProfileData(resourceId) {
    let resourceData = {};
    await axios
      .get(Constants.COMMON_MODULE_BASE_URL + Constants.USER_PROFILE_URL, {
        params: { resourceID: resourceId },
      })
      .then((response) => {
        if (response.status === 200) {
          resourceData = response.data.profileData;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return resourceData;
  }

  async getRecommDropDownValues(masterType) {
    return axios
      .get(
        Constants.COMMON_MODULE_BASE_URL +
          Constants.RECOMMENDATION_DROPDOWN_URL +
          "?masterType=" +
          masterType
      )
      .then((response) => {
        if (response.status === 200) {
          return response.data.datafordropdown;
        } else {
          return null;
        }
      });
  }

  async getAppDropDown() {
    var appArray = [];

    await axios
      .get(Constants.COMMON_MODULE_BASE_URL + Constants.APP_DROPDOWN_URL)
      .then((response) => {
        if (response.status === 200) {
          appArray = response.data.appList;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return appArray;
  }

  async getTrackBasedAppDropDown() {
    var appArray = [];

    await axios
      .get(Constants.ONBOARD_MODULE_BASE_URL + Constants.TRACK_BASED_APP_LIST)
      .then((response) => {
        if (response.status === 200) {
          appArray = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return appArray;
  }

  async getManagerList() {
    return axios
      .get(Constants.COMMON_MODULE_BASE_URL + Constants.MANAGER_LIST)
      .then((response) => {
        if (response.status === 200) {
          let manList = response.data.managerList;

          return manList;
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  async userLogin(emailID, password) {
    let userDetail = {};
    await axios
      .get(Constants.COMMON_MODULE_BASE_URL + Constants.USER_LOGIN_URL, {
        params: { emailID: emailID, password: password },
      })
      .then((response) => {
        if (response.status === 200) {
          userDetail = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401)
          userDetail = { error: "invalid credentials" };
        else userDetail = { error: "internal server error" };
      });

    return userDetail;
  }

  async changePassword(data) {
    let responseData = "";
    const axios = require("axios");
    await axios
      .put(
        Constants.COMMON_MODULE_BASE_URL + Constants.CHANGE_PASSWORD_URL,
        data
      )
      .then(
        (response) => {
          responseData = response;
        },
        (error) => {
          responseData = error.response;
          return responseData;
        }
      );

    return responseData;
  }

  async getTrackBasedAppDropDown() {
    var appArray = [];

    await axios
      .get(Constants.ONBOARD_MODULE_BASE_URL + Constants.TRACK_BASED_APP_LIST)
      .then((response) => {
        if (response.status === 200) {
          appArray = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return appArray;
  }

  async getManagerList() {
    return axios
      .get(Constants.COMMON_MODULE_BASE_URL + Constants.MANAGER_LIST)
      .then((response) => {
        if (response.status === 200) {
          let manList = response.data.managerList;

          return manList;
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  async userLogin(emailID, password) {
    let userDetail = {};

    await axios
      .get(Constants.COMMON_MODULE_BASE_URL + Constants.USER_LOGIN_URL, {
        params: { emailID: emailID, password: password },
      })
      .then((response) => {
        if (response.status === 200) {
          userDetail = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401)
          userDetail = { error: "invalid credentials" };
        else userDetail = { error: "internal server error" };
      });

    return userDetail;
  }

  async changePassword(data) {
    let responseData = "";
    const axios = require("axios");
    await axios
      .put(
        Constants.COMMON_MODULE_BASE_URL + Constants.CHANGE_PASSWORD_URL,
        data
      )
      .then(
        (response) => {
          responseData = response;
        },
        (error) => {
          responseData = error.response;
          return responseData;
        }
      );

    return responseData;
  }

  async getVersion() {
    let appVersion = "v1.0.0.0";

    const preloadData = {
      version: appVersion,
    };
    return preloadData;
  }

  async onboardClient(formData) {
    let status = "Error";

    await axios
      .post(
        Constants.ONBOARD_MODULE_BASE_URL + Constants.ONBOARD_CLIENT_URL,
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data.status;
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) status = "Duplicate";
      });

    return status;
  }

  async updateOnboardedClient(formData) {
    let status = "Error";
    await axios
      .put(
        Constants.ONBOARD_MODULE_BASE_URL + Constants.UPDATE_CLIENT_URL,
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data.status;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return status;
  }

  async deleteOnboardedClient(clientID) {
    let status = "Error";
    await axios
      .delete(Constants.ONBOARD_MODULE_BASE_URL + Constants.DELETE_CLIENT_URL, {
        params: { clientID: clientID },
      })
      .then((response) => {
        if (response.status === 200) {
          status = response.data.status;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return status;
  }

  async getClientDetailsList(userRole, loginResourceID) {
    let clientList = [];

    await axios
      .get(Constants.ONBOARD_MODULE_BASE_URL + Constants.CLIENT_LIST_URL, {
        params: { userRole: userRole, resourceEmail: loginResourceID },
      })
      .then((response) => {
        if (response.status === 200) {
          clientList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    clientList.forEach((client, index) => {
      client["id"] = index;
    });

    return clientList;
  }

  async getClientNameList(userRole, resourceEmail) {
    let clientList = [];

    await axios
      .get(Constants.ONBOARD_MODULE_BASE_URL + Constants.CLIENT_NAME_LIST_URL, {
        params: { userRole: userRole, resourceEmail: resourceEmail },
      })
      .then((response) => {
        if (response.status === 200) {
          clientList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return clientList;
  }

  async getAccountManagerNameList() {
    let accountManagerNameList = [];

    await axios
      .get(
        Constants.ONBOARD_MODULE_BASE_URL +
          Constants.ACCOUNT_MANAGER_NAME_LIST_URL
      )
      .then((response) => {
        if (response.status === 200) {
          accountManagerNameList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return accountManagerNameList;
  }

  async getProjectManagerNameList() {
    let projectManagerNameList = [];

    await axios
      .get(
        Constants.ONBOARD_MODULE_BASE_URL +
          Constants.PROJECT_MANAGER_NAME_LIST_URL
      )
      .then((response) => {
        if (response.status === 200) {
          projectManagerNameList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return projectManagerNameList;
  }

  async getResourceNameList() {
    let resourceNameList = [];

    await axios
      .get(Constants.ONBOARD_MODULE_BASE_URL + Constants.RESOURCE_NAME_LIST_URL)
      .then((response) => {
        if (response.status === 200) {
          resourceNameList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return resourceNameList;
  }

  async onboardProject(formData) {
    let status = "Error";

    await axios
      .post(
        Constants.ONBOARD_MODULE_BASE_URL + Constants.ONBOARD_PROJECT_URL,
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data.status;
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) status = "Duplicate";
      });

    return status;
  }

  async updateOnboardedProject(formData) {
    let status = "Error";
    await axios
      .put(
        Constants.ONBOARD_MODULE_BASE_URL + Constants.UPDATE_PROJECT_URL,
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data.status;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return status;
  }

  async deleteOnboardedProject(projectID) {
    let status = "Error";
    await axios
      .delete(
        Constants.ONBOARD_MODULE_BASE_URL + Constants.DELETE_PROJECT_URL,
        { params: { projectID: projectID } }
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data.status;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return status;
  }

  async getProjectDetailsList(userRole, loginResourceID) {
    let projectList = [];

    await axios
      .get(Constants.ONBOARD_MODULE_BASE_URL + Constants.PROJECT_LIST_URL, {
        params: { userRole: userRole, resourceEmail: loginResourceID },
      })
      .then((response) => {
        if (response.status === 200) {
          projectList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    projectList.forEach((project, index) => {
      project["id"] = index;
    });

    return projectList;
  }

  async getClientBasedProjectList(clientID, userRole, resourceEmail) {
    let projectList = [];

    await axios
      .get(
        Constants.ONBOARD_MODULE_BASE_URL +
          Constants.CLIENT_BASED_PROJECT_NAME_LIST_URL,
        {
          params: {
            clientID: clientID,
            userRole: userRole,
            resourceEmail: resourceEmail,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          projectList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return projectList;
  }

  async getClntPrjctBasedProjectList(
    clientID,
    projectID,
    userRole,
    resourceEmail
  ) {
    let appList = [];

    await axios
      .get(
        Constants.ONBOARD_MODULE_BASE_URL +
          Constants.CLNT_PRJCT_BASED_APP_NAME_LIST_URL,
        {
          params: {
            clientID: clientID,
            projectID: projectID,
            userRole: userRole,
            resourceEmail: resourceEmail,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          appList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return appList;
  }

  async onboardTrack(formData) {
    let status = "Error";

    await axios
      .post(
        Constants.ONBOARD_MODULE_BASE_URL + Constants.ONBOARD_TRACK_URL,
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data.status;
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) status = "Duplicate";
      });

    return status;
  }

  async updateOnboardedTrack(formData) {
    let status = "Error";
    await axios
      .put(
        Constants.ONBOARD_MODULE_BASE_URL + Constants.UPDATE_TRACK_URL,
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data.status;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return status;
  }

  async deleteOnboardedTrack(trackID) {
    let status = "Error";
    await axios
      .delete(Constants.ONBOARD_MODULE_BASE_URL + Constants.DELETE_TRACK_URL, {
        params: { trackID: trackID },
      })
      .then((response) => {
        if (response.status === 200) {
          status = response.data.status;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return status;
  }

  async getTrackDetailsList(userRole, loginResourceID) {
    let trackList = [];

    await axios
      .get(Constants.ONBOARD_MODULE_BASE_URL + Constants.TRACK_LIST_URL, {
        params: { userRole: userRole, resourceEmail: loginResourceID },
      })
      .then((response) => {
        if (response.status === 200) {
          trackList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    trackList.forEach((track, index) => {
      track["id"] = index;
    });

    return trackList;
  }

  async getAddedMomList() {
    let momList = [];

    await axios
      .get(Constants.BASE_URL + Constants.MOM_LIST_URL)
      .then((response) => {
        if (response.status === 200) {
          momList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return momList;
  }

  async addIncidentEvent(reqData) {
    var respnseData = "Error";

    return axios
      .post(
        Constants.INCIDENT_MGM_BASE_URL + Constants.ADD_INCIDENT_EVENT_URL,
        reqData
      )
      .then((response) => {
        if (response.status === 200) {
          respnseData = response.data.status;
        } else {
          respnseData = "Exception";
        }
        return respnseData;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async updateIncidentEvent(reqBody) {
    return axios
      .put(
        Constants.INCIDENT_MGM_BASE_URL + Constants.UPDATE_INCIDENT_EVENT_URL,
        reqBody
      )
      .then((response) => {
        var respnseData = false;
        if (response.status === 200) {
          respnseData = response.data.status;
        } else {
          respnseData = "Exception";
        }
        return respnseData;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async deleteIncidentEvent(incidentEventId) {
    return axios
      .delete(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.DELETE_INCIDENT_EVENT_URL +
          "?incidentEventId=" +
          incidentEventId
      )
      .then((response) => {
        var responseCode = response.data.status;
        return responseCode;
      });
  }

  async getIncidentEventList(userRole, respurceId) {
    return axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.VIEW_INCIDENT_EVENT_URL +
          "?userRole=" +
          userRole +
          "&resourceId=" +
          respurceId
      )
      .then((response) => {
        if (response.status === 200) {
          var resArray = response.data;
          var tbRows = [];
          var rows = {};
          for (var i = 0; i < resArray.length; i++) {
            rows = {
              id: resArray[i].incidentEventID,
              rcaIncidentNo: resArray[i].rcaIncidentNo,
              clientName: resArray[i].clientName,
              projectName: resArray[i].projectName,
              applicationName: resArray[i].applicationName,
              applicationID: resArray[i].applicationID,
              componentID: resArray[i].componentID,
              componentName: resArray[i].componentName,
              startTime: new Date(resArray[i].startDateTimeL).toLocaleString(),
              startTimeL: resArray[i].startDateTimeL,
              endTime: new Date(resArray[i].endDateTimeL).toLocaleString(),
              endTimeL: resArray[i].endDateTimeL,
              eventHeaderInfo: resArray[i].eventHeaderInfo,
              eventBriefInfo: resArray[i].eventBriefInfo,
              problemDetectionStatus: resArray[i].problemDetectionStatus,
              conclusion: resArray[i].conclusion,
              action: "action",
            };
            tbRows.push(rows);
          }

          return tbRows;
        } else {
          return [];
        }
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  }

  async addIncidentAnalysis(reqData) {
    let status = "Error";
    return axios
      .post(
        Constants.INCIDENT_MGM_BASE_URL + Constants.ADD_INCIDENT_ANALYSIS_URL,
        reqData
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data.status;
          return status;
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) status = "Duplicate";
      });
  }

  async updateIncidentAnalysis(reqBody) {
    return axios
      .put(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.UPDATE_INCIDENT_ANALYSIS_URL,
        reqBody
      )
      .then((response) => {
        var respnseData = false;
        if (response.status === 200) {
          respnseData = response.data.status;
        } else {
          respnseData = "Exception";
        }
        return respnseData;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async deleteIncidentAnalysis(incidentAnalysisId) {
    return axios
      .delete(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.DELETE_INCIDENT_ANALYSIS_URL +
          "?incidentAnalysisId=" +
          incidentAnalysisId
      )
      .then((response) => {
        var responseCode = response.data.status;
        return responseCode;
      });
  }

  async getIncidentAnalysisList(userRole, resourceId) {
    return axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.VIEW_INCIDENT_ANALYSIS_URL +
          "?userRole=" +
          userRole +
          "&resourceId=" +
          resourceId
      )
      .then((response) => {
        if (response.status === 200) {
          var resArray = response.data;
          var tbRows = [];
          var rows = {};
          for (var i = 0; i < resArray.length; i++) {
            // const startTime = resArray[i].startDateTimeL;
            // let newstartTime = moment(startTime).format('DD-MM-YYYY, hh:mm:ss A');

            // const endTime = resArray[i].endDateTimeL;
            // let newendTime = moment(endTime).format('DD-MM-YYYY, hh:mm:ss A');

            // if(newendTime == "Invalid date"){
            //     newendTime = "NA";
            // }

            rows = {
              id: resArray[i].incidentAnalysisId,
              rcaIncidentNo: resArray[i].rcaIncidentNo,

              clientName: resArray[i].clientName,
              projectName: resArray[i].projectName,
              applicationName: resArray[i].applicationName,
              applicationID: resArray[i].applicationId,
              componentID: resArray[i].componentID,
              componentName: resArray[i].componentName,
              startTime: new Date(resArray[i].startDateTimeL).toLocaleString(),
              startTimeL: resArray[i].startDateTimeL,
              endTime: new Date(resArray[i].endDateTimeL).toLocaleString(),
              endTimeL: resArray[i].endDateTimeL,
              eventHeaderInfo: resArray[i].analysisHeaderInfo,
              eventBriefInfo: resArray[i].analysisBriefInfo,
              referenceLink: resArray[i].referenceLink,
              problemDetectionStatus: resArray[i].problemDetectionStatus,
              conclusion: resArray[i].analysisConclusion,
              action: "action",
            };
            tbRows.push(rows);
          }

          return tbRows;
        } else {
          return [];
        }
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  }

  async getIncidentIdList(userRole, userEmail, appId, isModInc) {
    return axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.INCIDENT_ID_LIST_URL +
          "?userRole=" +
          userRole +
          "&resourceEmail=" +
          userEmail +
          "&appId=" +
          appId +
          "&isModInc=" +
          isModInc
      )
      .then((response) => {
        if (response.status === 200) {
          var resArray = response.data.incidentIdList;
          var tbRows = [];

          for (var i = 0; i < resArray.length; i++) {
            tbRows.push(resArray[i]);
          }
          return tbRows;
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getNewIncidentId() {
    return axios
      .get(Constants.INCIDENT_MGM_BASE_URL + Constants.NEW_INCIDENT_ID_URL)
      .then((response) => {
        if (response.status === 200) {
          return response.data.newIncidentId;
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async createIncident(reqData) {
    return axios
      .post(
        Constants.INCIDENT_MGM_BASE_URL + Constants.CREATE_INCIDENT_URL,
        reqData
      )
      .then((response) => {
        //var respnseData = false;
        let responseData = {};
        if (response.status === 200) {
          responseData = {
            insertingStatus: response.data.insertingStatus,
            incNo: response.data.rcaIncidentNo,
          };
        } else {
          responseData = {
            insertingStatus: "Exception",
          };
        }
        return responseData;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getIncidentDetails(resourceId, userRole) {
    return axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.VIEW_INCIDENT_URL +
          "?resourceId=" +
          resourceId +
          "&userRole=" +
          userRole
      )
      .then((response) => {
        if (response.status === 200) {
          var resArray = response.data.incidentList;

          var tbRows = [];
          var rows = {};
          for (var i = 0; i < resArray.length; i++) {
            // const reportedDate = resArray[i].reportedDate;
            // let newreportedDate = moment(reportedDate).format('DD-MM-YYYY');;

            // if(newreportedDate == "Invalid date"){
            //     newreportedDate = "NA";
            // }

            // console.log(newreportedDate);
            rows = {
              id: resArray[i].rcaIncidentNo,
              incidentNo: resArray[i].rcaIncidentNo,
              category: resArray[i].category,
              subCategory: resArray[i].subCategory,
              reportedDate: resArray[i].reportedDate,
              approvedBy: resArray[i].approvedBy,
              status: resArray[i].currentStatus,
              action: "action",
            };
            tbRows.push(rows);
          }
          const preloadData = {
            tbRows: tbRows,
          };
          return preloadData;
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
        const tbRows = [];
        const preloadData = {
          tbRows: tbRows,
        };
        return preloadData;
      });
  }

  async getIncidentAuditHistory(incidentId) {
    return axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.INCIDENT_AUDIT_INCIDENT_URL +
          "?incidentId=" +
          incidentId
      )
      .then((response) => {
        let responseData = [];
        if (response.status === 200) {
          responseData = response.data.auditHistoryList;
        } else {
          responseData = [];
        }
        return responseData;
      })
      .catch((error) => {
        console.log(error);
        const tbRows = [];

        return tbRows;
      });
  }

  async getRCACheckerList() {
    return axios
      .get(Constants.COMMON_MODULE_BASE_URL + Constants.RCA_APPROVER_LIST_URL)
      .then((response) => {
        let responseData = [];
        if (response.status === 200) {
          responseData = response.data.rcaCheckerList;
        } else {
          responseData = [];
        }
        return responseData;
      })
      .catch((error) => {
        console.log(error);
        const tbRows = [];

        return tbRows;
      });
  }

  async deleteIncident(incidentId) {
    return axios
      .delete(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.DELETE_INCIDENT_URL +
          "?incidentId=" +
          incidentId
      )
      .then((response) => {
        var responseCode = response.status;
        return responseCode;
      });
  }

  async editIncident(incidentId) {
    return axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.EDIT_INCIDENT_URL +
          "?incidentId=" +
          incidentId
      )
      .then((response) => {
        console.log(response);
        return response.data;
      });
  }

  async UpdateIncident(reqBody) {
    console.log(reqBody);
    return axios
      .put(
        Constants.INCIDENT_MGM_BASE_URL + Constants.UPDATE_INCIDENT_URL,
        reqBody
      )
      .then((response) => {
        var respnseData = false;
        if (response.status === 200) {
          respnseData = true;
        } else {
          respnseData = false;
        }
        return respnseData;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async UpdateIncidentfromMod(reqBody) {
    return axios
      .put(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.UPDATE_INCIDENT_FROM_MOD_URL,
        reqBody
      )
      .then((response) => {
        //console.log(response)
        var respnseData = "Error";
        if (response.status === 200) {
          respnseData = response.data.updatingStatus;
        } else {
          respnseData = response.data.updatingStatus;
        }
        return respnseData;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async incidentMgmtEvents(reqBody) {
    return axios
      .put(
        Constants.INCIDENT_MGM_BASE_URL + Constants.INCIDENT_AUDIT_EVENTS_URL,
        reqBody
      )
      .then((response) => {
        var respnseData = false;
        if (
          response.status === 200 &&
          (response.data.incidentStatus === "Approved" ||
            response.data.incidentStatus === "Rejected" ||
            response.data.incidentStatus === "Reopened" ||
            response.data.incidentStatus === "Closed")
        ) {
          respnseData = true;
        } else {
          respnseData = false;
        }
        return respnseData;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getOnboardedUserList() {
    let userList = [];

    await axios
      .get(Constants.COMMON_MODULE_BASE_URL + Constants.ONBOARDED_USER_LIST_URL)
      .then((response) => {
        if (response.status === 200) {
          userList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return userList;
  }

  async onboardUser(formData) {
    let status = "Error";
    await axios
      .post(
        Constants.COMMON_MODULE_BASE_URL + Constants.ONBOARD_USER_URL,
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data.status;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return status;
  }

  async updateOnboardedUser(formData) {
    let status = "Error";
    await axios
      .put(
        Constants.COMMON_MODULE_BASE_URL + Constants.UPDATE_ONBOARDED_USER_URL,
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data.status;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return status;
  }

  async deleteOnboardedUser(userId) {
    let status = "Error";
    await axios
      .delete(
        Constants.COMMON_MODULE_BASE_URL + Constants.DELETE_ONBOARDED_USER_URL,
        { params: { userId: userId } }
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data.status;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return status;
  }

  async getDropValuesList(masterType) {
    let dropdownList = [];

    await axios
      .get(Constants.COMMON_MODULE_BASE_URL + Constants.DROPDOWN_LIST_URL, {
        params: { masterType: masterType },
      })
      .then((response) => {
        if (response.status === 200) {
          dropdownList = response.data.datafordropdown;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return dropdownList;
  }

  async onboardResource(resourceData) {
    let status = "Error";
    await axios
      .post(
        Constants.ONBOARD_MODULE_BASE_URL + Constants.ONBOARD_RESOURCE_URL,
        resourceData
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data.status;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return status;
  }

  async updateOnboardedResource(resourceData) {
    let status = "Error";
    await axios
      .put(
        Constants.ONBOARD_MODULE_BASE_URL + Constants.UPDATE_RESOURCE_URL,
        resourceData
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data.status;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return status;
  }

  async getResourceDetailsList(userRole, resourceEmail) {
    let resourceList = [];

    await axios
      .get(
        Constants.ONBOARD_MODULE_BASE_URL +
          Constants.ONBOARDED_RESOURCE_LIST_URL,
        { params: { userRole: userRole, resourceEmail: resourceEmail } }
      )
      .then((response) => {
        if (response.status === 200) {
          resourceList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return resourceList;
  }

  async deleteOnboardedResource(resourceID) {
    let status = "Error";
    await axios
      .delete(
        Constants.ONBOARD_MODULE_BASE_URL +
          Constants.DELETE_ONBOARDED_RESOURCE_URL,
        { params: { resourceId: resourceID } }
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data.status;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return status;
  }

  async dwnStrmAppOnboard(reqData) {
    let status = "";
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(reqData)], { type: "application/json" })
    );
    const axios = require("axios");
    await axios
      .post(
        Constants.ONBOARD_MODULE_BASE_URL + Constants.ONBOARD_DWN_STRM_APP_URL,
        reqData
      )
      .then((response) => {
        if (response.status === 200) {
          status = "Inserted";
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          status = "Duplicate";
        } else {
          status = "Exception";
        }
      });
    return status;
  }

  async updateDwnStrmApp(reqData) {
    let status = "";
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(reqData)], { type: "application/json" })
    );
    const axios = require("axios");
    await axios
      .put(
        Constants.ONBOARD_MODULE_BASE_URL + Constants.UPDATE_DWN_STRM_APP_URL,
        reqData
      )
      .then((response) => {
        if (response.status === 200) {
          status = "Updated";
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          status = "Duplicate";
        } else {
          status = "Exception";
        }
      });
    return status;
  }

  async getDwnStrmAppList() {
    return axios
      .get(
        Constants.ONBOARD_MODULE_BASE_URL + Constants.GET_DWN_STRM_APPLIST_URL
      )
      .then((response) => {
        if (response.status === 200) {
          var appArray = response.data.appDataList;
          var tbRows = [];
          var rows = {};

          for (var i = 0; i < appArray.length; i++) {
            rows = {
              id: response.data.appDataList[i].dwnStrmAppId,
              clientID: response.data.appDataList[i].clientId,
              clientName: response.data.appDataList[i].clientName,
              projectID: response.data.appDataList[i].projectId,
              projectName: response.data.appDataList[i].projectName,
              dwnStrmAppName: response.data.appDataList[i].dwnStrmAppName,
              appOwnerId: response.data.appDataList[i].appOwnerID,
              appOwnerName: response.data.appDataList[i].appOwnerName,
              appOwnerEmail: response.data.appDataList[i].appOwnerEmail,
              appOwnerMobile: response.data.appDataList[i].appOwnerMobile,
              groupDl: response.data.appDataList[i].groupDl,
              description: response.data.appDataList[i].description,
              appIdLists: response.data.appDataList[i].appId,
              appNameLists: response.data.appDataList[i].appName,
              integrationLayer: response.data.appDataList[i].integrationLayer,
              componentId: response.data.appDataList[i].componentId,
              componentLayerId: response.data.appDataList[i].compLayerId,
              componentLayer: response.data.appDataList[i].compLayer,
              componentName: response.data.appDataList[i].componentName,
              componentOwnerId: response.data.appDataList[i].compOwnerID,
              componentOwnerName: response.data.appDataList[i].compOwnerName,
              compGroupDl: response.data.appDataList[i].compGroupDL,
              compDescription: response.data.appDataList[i].componentBrief,
            };
            tbRows.push(rows);
          }
          const preloadData = {
            tbRows: tbRows,
          };
          return preloadData;
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
        const tbRows = [];
        const preloadData = {
          tbRows: tbRows,
        };
        return preloadData;
      });
  }

  async getDwnStrmAppListForApp(appId) {
    return axios
      .get(
        Constants.ONBOARD_MODULE_BASE_URL +
          Constants.GET_DWN_STRM_APPLIST_FOR_APP_URL +
          "?appId=" +
          appId
      )
      .then((response) => {
        if (response.status === 200) {
          var appArray = response.data.dsAppDataList;
          var tbRows = [];
          var rows = {};

          for (var i = 0; i < appArray.length; i++) {
            rows = {
              id: response.data.dsAppDataList[i].dwnStrmAppId,
              dwnStrmAppName: response.data.dsAppDataList[i].dwnStrmAppName,
            };
            tbRows.push(rows);
          }
          const preloadData = {
            tbRows: tbRows,
          };
          return preloadData;
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
        const tbRows = [];
        const preloadData = {
          tbRows: tbRows,
        };
        return preloadData;
      });
  }

  async deleteDwnStrmApp(appId) {
    return axios
      .delete(
        Constants.ONBOARD_MODULE_BASE_URL +
          Constants.DELETE_DWN_STRM_APP_URL +
          "?appId=" +
          appId
      )
      .then((response) => {
        var responseCode = response.status;
        return responseCode;
      });
  }

  async appOnboard(reqData) {
    let status = "";
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(reqData)], { type: "application/json" })
    );
    const axios = require("axios");
    await axios
      .post(
        Constants.ONBOARD_MODULE_BASE_URL + Constants.ONBOARD_APP_URL,
        reqData
      )
      .then((response) => {
        if (response.status === 200) {
          status = "Inserted";
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          status = "Duplicate";
        } else {
          status = "Exception";
        }
      });
    return status;
  }

  async updateApp(reqData) {
    let status = "";
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(reqData)], { type: "application/json" })
    );
    const axios = require("axios");
    await axios
      .put(
        Constants.ONBOARD_MODULE_BASE_URL + Constants.UPDATE_APP_URL,
        reqData
      )
      .then((response) => {
        if (response.status === 200) {
          status = "Updated";
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          status = "Duplicate";
        } else {
          status = "Exception";
        }
      });
    return status;
  }

  async getAppList() {
    return axios
      .get(Constants.ONBOARD_MODULE_BASE_URL + Constants.GET_APPLIST_URL)
      .then((response) => {
        if (response.status === 200) {
          var appArray = response.data.appDataList;
          var tbRows = [];
          var rows = {};

          for (var i = 0; i < appArray.length; i++) {
            rows = {
              id: response.data.appDataList[i].applicationID,
              clientID: response.data.appDataList[i].clientID,
              projectID: response.data.appDataList[i].projectID,
              appName: response.data.appDataList[i].applicationName,
              appOwnerName: response.data.appDataList[i].app_OWNER_NAME,
              appOwnerEmail: response.data.appDataList[i].app_OWNER_EMAIL,
              appOwnerMobile: response.data.appDataList[i].app_OWNER_MOBILE,
              projectManagerName:
                response.data.appDataList[i].project_MANAGER_NAME,
              projectManagerEmail:
                response.data.appDataList[i].project_MANAGER_EMAIL,
              projectManagerMobile:
                response.data.appDataList[i].project_MANAGER_MOBILE,
              tier: response.data.appDataList[i].application_TIER,
              appEnv: response.data.appDataList[i].app_ENVIRONMENT,
              groupDl: response.data.appDataList[i].group_DL,
              attchSizeLimit:
                response.data.appDataList[i].email_ATTACHMENT_SIZE_LIMIT,
              emailThreshold: response.data.appDataList[i].email_THRESHOLD,
              statsEmailFreq: response.data.appDataList[i].stats_EMAIL_FREQ,
              emailFrequency: response.data.appDataList[i].email_FREQUENCY,
              slackChannel: response.data.appDataList[i].slackChannel,
              meetingID: response.data.appDataList[i].meetingID,
            };
            tbRows.push(rows);
          }
          const preloadData = {
            tbRows: tbRows,
          };
          return preloadData;
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
        const tbRows = [];
        const preloadData = {
          tbRows: tbRows,
        };
        return preloadData;
      });
  }

  async deleteApp(appId) {
    return axios
      .delete(
        Constants.ONBOARD_MODULE_BASE_URL +
          Constants.DELETE_APP_URL +
          "?appId=" +
          appId
      )
      .then((response) => {
        var responseCode = response.status;
        return responseCode;
      });
  }

  async getClientProjectBasedList(
    clientID,
    projectID,
    userRole,
    resourceEmail
  ) {
    let appList = [];

    await axios
      .get(
        Constants.ONBOARD_MODULE_BASE_URL +
          Constants.CLNT_PRJCT_BASED_APP_NAME_LIST_URL,
        {
          params: {
            clientID: clientID,
            projectID: projectID,
            userRole: userRole,
            resourceEmail: resourceEmail,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          appList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return appList;
  }

  async addRecommendation(reqData) {
    let insertingStatus = "";
    await axios
      .post(
        Constants.RECOMMENDATION_BASE_URL + Constants.ADD_RECOMMENDATION,
        reqData
      )
      .then((response) => {
        if (response.status === 200) {
          if (response.data.insertingStatus === "Inserted") {
            insertingStatus = "Inserted";
          } else if (response.data.insertingStatus === "DuplicateKey") {
            insertingStatus = "DuplicateKey";
          } else {
            insertingStatus = "Exception";
          }
        } else {
          insertingStatus = "Exception";
        }
      })
      .catch((error) => {
        console.log(error);
        insertingStatus = "Exception";
      });
    return insertingStatus;
  }
  async getRecommendationsForApp(appID, appName) {
    let recommendDetails = {};
    await axios
      .get(
        Constants.RECOMMENDATION_BASE_URL + Constants.GET_RECOMMENDATION_URL,
        { params: { appID: appID, appName: appName } }
      )
      .then((response) => {
        if (response.status === 200) {
          recommendDetails = response.data.recommendList;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // for (var i = 0; i < recommendDetails.length; i++) {

    //     const shareDate = recommendDetails[i].shareDate;
    //     const newshareDate = moment(shareDate).format('DD-MM-YYYY');
    //     recommendDetails[i].shareDate = newshareDate;
    //     console.log(newshareDate);

    // }

    console.log(recommendDetails);
    return recommendDetails;
  }
  async updateRecommendation(reqData) {
    let updatingStatus = "";
    await axios
      .post(
        Constants.RECOMMENDATION_BASE_URL + Constants.UPDATE_RECOMMENDATION,
        reqData
      )
      .then((response) => {
        if (response.status === 200) {
          updatingStatus = response.data.updatingStatus;
        } else {
          updatingStatus = "Exception";
        }
      })
      .catch((error) => {
        console.log(error);
        updatingStatus = "Exception";
      });
    return updatingStatus;
  }
  async deleteRecommendation(recomID) {
    let deletingStatus = "";
    await axios
      .delete(
        Constants.RECOMMENDATION_BASE_URL + Constants.DELETE_RECOMMENDATION,
        { params: { recomID: recomID } }
      )
      .then((response) => {
        if (response.status === 200) {
          deletingStatus = response.data.deletingStatus;
        } else {
          deletingStatus = "Exception";
        }
      })
      .catch((error) => {
        console.log(error);
        deletingStatus = "Exception";
      });
    return deletingStatus;
  }

  async getRecommendationDetails(recomID, appID) {
    let recommendDetails = {};
    await axios
      .get(Constants.RECOMMENDATION_BASE_URL + Constants.GET_RECOMM_ON_ID_URL, {
        params: { recomID: recomID, appID: appID },
      })
      .then((response) => {
        if (response.status === 200) {
          recommendDetails = response.data.recommendDetails;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return recommendDetails;
  }
  async getRecommendationEventHistory(recomID) {
    let eventList = [];
    await axios
      .get(
        Constants.RECOMMENDATION_BASE_URL +
          Constants.GET_RECOMM_EVENT_HISTORY_LIST_URL,
        { params: { recomID: recomID } }
      )
      .then((response) => {
        if (response.status === 200) {
          eventList = response.data.eventList;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return eventList;
  }
  async getAllRecommendationDetails() {
    let tbRows = [];
    await axios
      .get(Constants.RECOMMENDATION_BASE_URL + Constants.GET_ALL_RECOMM_URL)
      .then((response) => {
        if (response.status === 200) {
          var recomArray = response.data.allRecommendDetails;
          var rows = {};

          for (var i = 0; i < recomArray.length; i++) {
            rows = {
              id: i,
              recomId: recomArray[i].recomm_ID,
              applicationName: recomArray[i].application_NAME,
              recommendation: recomArray[i].recommendation,
              improvements: recomArray[i].expected_IMPROVEMENT,
              issue: recomArray[i].issue_OR_OBSERVATION,
            };
            tbRows.push(rows);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return tbRows;
  }

  async exportRecommendationsDetails(appID, appName) {
    console.log(appID + ":" + appName);
    await axios({
      url:
        Constants.RECOMMENDATION_BASE_URL +
        Constants.EXPORT_RECOMMENDATION_DETAILS_URL,
      method: "GET",
      params: { appID: appID, appName: appName },
      responseType: "blob",
    })
      .then((response) => {
        let fileName = response.headers["content-disposition"]
          .replace("attachment; ", "")
          .split("=")[1];
        console.log(fileName);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        if (error.status === 500) {
          console.log(error);
          return false;
        }
      });
  }

  async importRecommendationsDetails(formData) {
    let importingStatus = "";
    await axios
      .post(
        Constants.RECOMMENDATION_BASE_URL +
          Constants.IMPORT_RECOMMENDATION_DETAILS_URL,
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          importingStatus = response.data;
        } else {
          importingStatus = "Exception";
        }
      })
      .catch((error) => {
        console.log(error);
        importingStatus = "Exception";
      });

    return importingStatus;
  }

  async getConfigDropdowns() {
    let gcToolMasterList = [];
    await axios
      .get(
        Constants.COMMON_MODULE_BASE_URL + Constants.GET_COMPONENT_PRELOADS_URL
      )
      .then((response) => {
        if (response.status === 200) {
          gcToolMasterList = response.data;
        }
      })
      .catch((error) => {
        if (error.status === 500) {
          console.log(error);
          return false;
        }
      });
    return gcToolMasterList;
  }

  async addComponents(reqData) {
    let insertingStatus = "";
    await axios
      .post(
        Constants.ONBOARD_MODULE_BASE_URL + Constants.ADD_COMPONENT_URL,
        reqData
      )
      .then((response) => {
        if (response.status === 200) {
          insertingStatus = "Inserted";
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          insertingStatus = "Duplicate";
        } else {
          insertingStatus = "Server Error";
        }
      });
    return insertingStatus;
  }

  async updateComponent(reqData) {
    let insertingStatus = "";
    await axios
      .put(
        Constants.ONBOARD_MODULE_BASE_URL + Constants.UPDATE_COMPONENT,
        reqData
      )
      .then((response) => {
        if (response.status === 200) {
          insertingStatus = "Inserted";
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          insertingStatus = "Duplicate";
        } else {
          insertingStatus = "Server Error";
        }
      });
    return insertingStatus;
  }

  async getComponentList() {
    let componentList = [];
    await axios
      .get(Constants.ONBOARD_MODULE_BASE_URL + Constants.GET_COMPONENT_LIST)
      .then((response) => {
        if (response.status === 200) {
          componentList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return componentList;
  }

  async getAppBasedComponentList(appId) {
    let componentList = [];
    await axios
      .get(
        Constants.COMMON_MODULE_BASE_URL +
          Constants.APP_BASED_COMPONENT_NAME_LIST_URL,
        { params: { appId: appId } }
      )
      .then((response) => {
        if (response.status === 200) {
          componentList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return componentList;
  }

  async deleteComponent(componentId) {
    let deletingStatus = "";
    await axios
      .delete(Constants.ONBOARD_MODULE_BASE_URL + Constants.DELETE_COMPONENT, {
        params: { componentID: componentId },
      })
      .then((response) => {
        if (response.status === 200) {
          deletingStatus = response.data.status;
        } else {
          deletingStatus = "Exception";
        }
      })
      .catch((error) => {
        console.log(error);
        deletingStatus = "Exception";
      });
    return deletingStatus;
  }

  async dashboardButtonValues(userRole, resourceEmail) {
    let ButtonValues = [];

    await axios
      .get(
        Constants.ONBOARD_MODULE_BASE_URL +
          Constants.DASHBOARD_BUTTON_VALUES_URL,
        { params: { userRole: userRole, resourceEmail: resourceEmail } }
      )
      .then((response) => {
        if (response.status === 200) {
          ButtonValues = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return ButtonValues;
  }

  async clientNameListWithProCount(userRole, resourceEmail) {
    let clientList = [];

    await axios
      .get(
        Constants.ONBOARD_MODULE_BASE_URL +
          Constants.CLIENT_NAME_LIST_WITH_PRO_COUNT_URL,
        { params: { userRole: userRole, resourceEmail: resourceEmail } }
      )
      .then((response) => {
        if (response.status === 200) {
          clientList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return clientList;
  }

  async projectNameListWithAppCount(clientID, userRole, resourceEmail) {
    let projectList = [];

    await axios
      .get(
        Constants.ONBOARD_MODULE_BASE_URL +
          Constants.PROJECT_NAME_LIST_WITH_APP_COUNT_URL,
        {
          params: {
            clientID: clientID,
            userRole: userRole,
            resourceEmail: resourceEmail,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          projectList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return projectList;
  }

  async cltNameProjectNameListWithAppCount(
    clientName,
    userRole,
    resourceEmail
  ) {
    let projectList = [];

    await axios
      .get(
        Constants.ONBOARD_MODULE_BASE_URL +
          Constants.CLT_NAME_PROJECT_NAME_LIST_WITH_APP_COUNT_URL,
        {
          params: {
            clientName: clientName,
            userRole: userRole,
            resourceEmail: resourceEmail,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          projectList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return projectList;
  }

  async appNameListWithTrackCount(
    clientID,
    projectID,
    userRole,
    resourceEmail
  ) {
    let appList = [];

    await axios
      .get(
        Constants.ONBOARD_MODULE_BASE_URL +
          Constants.APP_NAME_LIST_WITH_TRACK_COUNT_URL,
        {
          params: {
            clientID: clientID,
            projectID: projectID,
            userRole: userRole,
            resourceEmail: resourceEmail,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          appList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return appList;
  }

  async appLevelTrackList(clientID, projectID, appID, userRole, resourceEmail) {
    let trackList = [];

    await axios
      .get(
        Constants.ONBOARD_MODULE_BASE_URL + Constants.APP_LEVEL_TRACK_LIST_URL,
        {
          params: {
            clientID: clientID,
            projectID: projectID,
            appID: appID,
            userRole: userRole,
            resourceEmail: resourceEmail,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          trackList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return trackList;
  }

  async appBasedTrackNameList(appID, userRole, resourceEmail) {
    let trackList = [];

    await axios
      .get(
        Constants.ONBOARD_MODULE_BASE_URL +
          Constants.APP_BASED_TRACK_NAME_LIST_URL,
        {
          params: {
            appID: appID,
            userRole: userRole,
            resourceEmail: resourceEmail,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          trackList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return trackList;
  }

  async appTrackBasedIncidentList(appID, trackID) {
    let incidentList = [];

    await axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.APP_TRACK_BASED_INCIDENT_LIST_URL,
        { params: { appID: appID, trackID: trackID } }
      )
      .then((response) => {
        if (response.status === 200) {
          incidentList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return incidentList;
  }

  async getTrackDetailsBasedOnID(trackID) {
    let trackDetails = {};

    await axios
      .get(
        Constants.ONBOARD_MODULE_BASE_URL +
          Constants.GET_TRACK_DETAILS_BASEDON_ID_URL,
        { params: { trackID: trackID } }
      )
      .then((response) => {
        if (response.status === 200) {
          trackDetails = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return trackDetails;
  }

  async incidentCurrentStatusCount(appID, trackID) {
    var statusCount = [];

    await axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.INCIDENT_CURRENT_STATUS_COUNT_URL,
        { params: { appID: appID, trackID: trackID } }
      )
      .then((response) => {
        if (response.status === 200) {
          statusCount = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return statusCount;
  }

  async recommendCurrentStatusCount(appID, trackID) {
    var statusCount = [];

    await axios
      .get(
        Constants.RECOMMENDATION_BASE_URL +
          Constants.RECOMMENDATION_CURRENT_STATUS_COUNT_URL,
        { params: { appID: appID, trackID: trackID } }
      )
      .then((response) => {
        if (response.status === 200) {
          statusCount = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return statusCount;
  }

  async incidentDetailsIDBased(incidentID) {
    let incidentDetails = {};

    await axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.INCIDENT_DETAILS_ID_BASED_URL,
        { params: { incidentID: incidentID } }
      )
      .then((response) => {
        if (response.status === 200) {
          incidentDetails = response.data.editincident;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return incidentDetails;
  }

  async getWorkflowDetails(applicationId, userRole, resourceID) {
    let appLevelDetails = {};

    await axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.APPLICATION_LEVEL_EVENT_ANALYSIS_DETAILS_URL,
        {
          params: {
            applicationId: applicationId,
            userRole: userRole,
            resourceID: resourceID,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          appLevelDetails = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return appLevelDetails;
  }

  async raiseAlarm(formData) {
    let status = "Error";

    await axios
      .post(
        Constants.COMMON_MODULE_BASE_URL + Constants.RAISE_ALARM_URL,
        formData
      )
      .then((response) => {
        console.log("status", response.data);
        console.log("status", response.status);
        //  headers={ "Content-Type": "application/x-www-form-urlencoded"}
        // header("Access-Control-Allow-Origin: *");
        // dataType : 'jsonp';
        if (response.status === 200) {
          status = response.data;
          console.log("status", status);
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 400) {
          status = "Duplicate";
        } else {
          status = "Error";
        }
      });
    return status;
  }

  async stopAlarm(formData) {
    let status = "Error";
    await axios
      .post(
        Constants.COMMON_MODULE_BASE_URL + Constants.STOP_ALARM_URL,
        formData
      )
      .then((response) => {
        console.log("status", response.data);
        console.log("status", response.status);
        //  headers={ "Content-Type": "application/x-www-form-urlencoded"}
        // header("Access-Control-Allow-Origin: *");
        // dataType : 'jsonp';
        if (response.status === 200) {
          status = response.data;
          console.log("status", status);
        }
      })
      .catch((error) => {
        console.log();
        if (error.response.status === 400) status = "Duplicate";
      });
    console.log(status);
    return status;
  }

  async getModAlerts(appId, resourceId, userRole) {
    let modAlerts = [];

    await axios
      .get(Constants.COMMON_MODULE_BASE_URL + Constants.GET_MOD_ALERTS, {
        params: { resourceId: resourceId, userRole: userRole, appId: appId },
      })
      .then((response) => {
        if (response.status === 200) {
          modAlerts = response.data.alertsList;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return modAlerts;
  }

  //PAS Guidelines

  async addPASGuidelines(formData) {
    let status = "Error";

    await axios
      .post(
        Constants.INCIDENT_MGM_BASE_URL + Constants.ADD_PAS_GUIDELINES_URL,
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data.status;
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) status = "Duplicate";
      });

    return status;
  }

  async updatePASGuidelines(formData) {
    let status = "Error";

    await axios
      .put(
        Constants.INCIDENT_MGM_BASE_URL + Constants.UPDATE_PAS_GUIDELINES_URL,
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data.status;
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) status = "Duplicate";
      });

    return status;
  }

  async getPASGuidelinesDataList(userRole, loginResourceID) {
    let pasList = [];

    await axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL + Constants.PAS_GUIDELINES_LIST_URL,
        { params: { userRole: userRole, resourceEmail: loginResourceID } }
      )
      .then((response) => {
        if (response.status === 200) {
          pasList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // clientList.forEach((client, index) => {
    //     client["id"] = index;
    // });

    return pasList;
  }

  async deletePASGuidelines(id) {
    let status = "Error";
    await axios
      .delete(
        Constants.INCIDENT_MGM_BASE_URL + Constants.DELETE_PAS_GUIDELINES_URL,
        { params: { id: id } }
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data.status;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return status;
  }

  async incidentBasedIncidentEventList(incidentID, userRole, resourceID) {
    let incidentEventDetails = {};

    await axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.INCIDENT_BASED_INCIDENT_EVENT_LIST_URL,
        {
          params: {
            incidentID: incidentID,
            userRole: userRole,
            resourceID: resourceID,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          incidentEventDetails = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return incidentEventDetails;
  }

  async incidentBasedIncidentAnalysisList(incidentID, userRole, resourceID) {
    let incidentAnalysisDetails = {};

    await axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.INCIDENT_BASED_INCIDENT_ANALYSIS_LIST_URL,
        {
          params: {
            incidentID: incidentID,
            userRole: userRole,
            resourceID: resourceID,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          incidentAnalysisDetails = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return incidentAnalysisDetails;
  }

  async getEventTimelineReportDetails(incidentID, userRole, resourceID) {
    let eventList = [];

    await axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.GET_EVENT_TIMELINE_REPORT_DETAILS_URL,
        {
          params: {
            incidentID: incidentID,
            userRole: userRole,
            resourceID: resourceID,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          eventList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return eventList;
  }

  async getAnalysisTimelineReportDetails(incidentID, userRole, resourceID) {
    let analysisList = [];

    await axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.GET_ANALYSIS_TIMELINE_REPORT_DETAILS_URL,
        {
          params: {
            incidentID: incidentID,
            userRole: userRole,
            resourceID: resourceID,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          analysisList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return analysisList;
  }

  async compLevelEventAnalysisDetails(incidentID, userRole, resourceID) {
    let compLevelDetails = {};

    await axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.COMPONENT_LEVEL_EVENT_ANALYSIS_DETAILS_URL,
        {
          params: {
            incidentID: incidentID,
            userRole: userRole,
            resourceID: resourceID,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          compLevelDetails = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return compLevelDetails;
  }

  async getRecomListBasedIDList(recomIDListStr) {
    let recomList = [];

    await axios
      .get(
        Constants.RECOMMENDATION_BASE_URL +
          Constants.GET_RECOMM_LIST_BASED_ID_LIST_URL,
        { params: { recomIDListStr: recomIDListStr } }
      )
      .then((response) => {
        if (response.status === 200) {
          recomList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return recomList;
  }

  async getPGuidelineListBasedIDList(guideLinesIDListStr) {
    let guideLinesList = [];

    await axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.GET_PAS_GUIDELINES_LIST_BASED_ID_LIST,
        { params: { guideLinesIDListStr: guideLinesIDListStr } }
      )
      .then((response) => {
        if (response.status === 200) {
          guideLinesList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return guideLinesList;
  }

  //Import Incident

  async importIncidentDetails(formData) {
    let importingStatus = "";
    await axios
      .post(
        Constants.INCIDENT_MGM_BASE_URL + Constants.IMPORT_INCIDENT_DETAILS_URL,
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          importingStatus = response.data.importingStatus;
          console.log(importingStatus);
        } else {
          importingStatus = "Exception";
        }
      })
      .catch((error) => {
        console.log(error);
        importingStatus = "Exception";
      });

    return importingStatus;
  }

  async importPasGuidlines(formData) {
    let importingStatus = "";
    await axios
      .post(
        Constants.INCIDENT_MGM_BASE_URL + Constants.IMPORT_PAS_GUIDLINES_URL,
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          importingStatus = response.data.importingStatus;
          console.log(importingStatus);
        } else {
          importingStatus = "Exception";
        }
      })
      .catch((error) => {
        console.log(error);
        importingStatus = "Exception";
      });

    return importingStatus;
  }

  async getIEventArtifactsImageBase64(incidentEventID) {
    let base64Data = {};

    await axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.GET_INCIDENT_EVENT_ARTIFACTS_IMAGE_BASE64_URL,
        { params: { incidentEventID: incidentEventID } }
      )
      .then((response) => {
        if (response.status === 200) {
          base64Data = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return base64Data;
  }

  async appTrackLevelRecomList(appID, trackID) {
    let recomList = [];

    await axios
      .get(
        Constants.RECOMMENDATION_BASE_URL +
          Constants.APP_TRACK_LEVEL_RECOMMENDATION_LIST_URL,
        { params: { appID: appID, trackID: trackID } }
      )
      .then((response) => {
        if (response.status === 200) {
          recomList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return recomList;
  }

  async getIncidentArtifactsImageBase64(incidentID) {
    let base64Data = {};

    await axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.GET_INCIDENT_ARTIFACTS_IMAGE_BASE64_URL,
        { params: { incidentID: incidentID } }
      )
      .then((response) => {
        if (response.status === 200) {
          base64Data = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return base64Data;
  }

  async getIncidentCreatedDetails(incidentID) {
    let createdDetails = {};

    await axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.GET_INCIDENT_CREATED_DETAILS_URL,
        { params: { incidentID: incidentID } }
      )
      .then((response) => {
        if (response.status === 200) {
          createdDetails = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return createdDetails;
  }

  async getIAnalysisArtifactsImageBase64(incidentAnalysisID) {
    let base64Data = {};

    await axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.GET_INCIDENT_ANALYSIS_ARTIFACTS_IMAGE_BASE64_URL,
        { params: { incidentAnalysisID: incidentAnalysisID } }
      )
      .then((response) => {
        if (response.status === 200) {
          base64Data = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return base64Data;
  }

  async getRecommendArtifactsImageBase64(recommendID) {
    let base64Data = {};

    await axios
      .get(
        Constants.RECOMMENDATION_BASE_URL +
          Constants.GET_RECOMMEND_ARTIFACTS_IMAGE_BASE64_URL,
        { params: { recommendID: recommendID } }
      )
      .then((response) => {
        if (response.status === 200) {
          base64Data = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return base64Data;
  }

  async publishIncidentDetails(formData) {
    let status = "Error";

    await axios
      .post(
        Constants.COMMON_MODULE_BASE_URL +
          Constants.PUBLISH_INCIDENT_DETAILS_URL,
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return status;
  }

  async publishRecommendationDetails(formData) {
    let status = "Error";

    await axios
      .post(
        Constants.COMMON_MODULE_BASE_URL +
          Constants.PUBLISH_RECOMMENDATION_DETAILS_URL,
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return status;
  }

  async publishResource(formData) {
    let status = "Error";

    await axios
      .post(
        Constants.COMMON_MODULE_BASE_URL +
          Constants.PUBLISH_ONBOARD_RESOURCE_DETAILS_URL,
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return status;
  }

  async publishUser(formData) {
    let status = "Error";

    await axios
      .post(
        Constants.COMMON_MODULE_BASE_URL +
          Constants.PUBLISH_ONBOARD_USER_DETAILS_URL,
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return status;
  }

  async publishComponent(formData) {
    let status = "Error";

    await axios
      .post(
        Constants.COMMON_MODULE_BASE_URL +
          Constants.PUBLISH_ONBOARD_COMPONENT_DETAILS_URL,
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return status;
  }

  //Deploy Resources

  async deployResource(formData) {
    let status = "Error";

    await axios
      .post(
        Constants.ONBOARD_MODULE_BASE_URL + Constants.DEPLOY_RESOURCE_URL,
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          status = response.data.status;
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) status = "Duplicate";
      });

    return status;
  }

  async getDeployedResourceList(userRole, resourceName) {
    let depresourceList = [];

    await axios
      .get(
        Constants.ONBOARD_MODULE_BASE_URL +
          Constants.DEPLOYED_RESOURCE_LIST_URL,
        { params: { userRole: userRole, resourceName: resourceName } }
      )
      .then((response) => {
        if (response.status === 200) {
          depresourceList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(depresourceList);
    return depresourceList;
  }

  async deleteDeployedResource(resourceID) {
    console.log(resourceID);
    let status = "Error";
    await axios
      .delete(
        Constants.ONBOARD_MODULE_BASE_URL +
          Constants.DELETE_DEPLOYED_RESOURCE_URL,
        { params: { resourceId: resourceID } }
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data.status;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return status;
  }

  async updateDeployedResource(formData) {
    let status = "Error";
    await axios
      .put(
        Constants.ONBOARD_MODULE_BASE_URL +
          Constants.UPDATE_DEPLOYED_RESOURCE_URL,
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data.status;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return status;
  }

  async getTrackBasedDpyRsList(trackID, userRole, resourceEmail) {
    let depresourceList = [];

    await axios
      .get(
        Constants.ONBOARD_MODULE_BASE_URL +
          Constants.GET_TRACK_BASED_DEPLOYED_RESOURCE_LIST_URL,
        {
          params: {
            trackID: trackID,
            userRole: userRole,
            resourceEmail: resourceEmail,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          depresourceList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(depresourceList);
    return depresourceList;
  }

  async projBasedTrackNameList(projID, userRole, resourceEmail) {
    let trackList = [];

    await axios
      .get(
        Constants.ONBOARD_MODULE_BASE_URL +
          Constants.PROJ_BASED_TRACK_NAME_LIST_URL,
        {
          params: {
            projID: projID,
            userRole: userRole,
            resourceEmail: resourceEmail,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          trackList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return trackList;
  }

  async publishDeployedResource(formData) {
    let status = "Error";

    await axios
      .post(
        Constants.COMMON_MODULE_BASE_URL +
          Constants.PUBLISH_DEPLOY_RESOURCE_DETAILS_URL,
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return status;
  }

  async publishRecommendationsDetails(formData) {
    let status = "Error";
    console.log(formData);
    await axios
      .post(
        Constants.COMMON_MODULE_BASE_URL +
          Constants.PUBLISH_CONSOILDATE_RECOMMENDATIONS_URL,
        formData
      )
      .then((response) => {
        if (response.status === 200) {
          status = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return status;
  }

  async getDashboardAppList(userRole, userEmail) {
    let projectList = [];

    await axios
      .get(
        Constants.ONBOARD_MODULE_BASE_URL +
          Constants.GET_DASHBOARD_APP_LIST_URL,
        { params: { userRole: userRole, userEmail: userEmail } }
      )
      .then((response) => {
        if (response.status === 200) {
          projectList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return projectList;
  }

  async getNameBasedTrackList(userRole, loginResourceID, trackName) {
    let trackList = [];

    await axios
      .get(
        Constants.ONBOARD_MODULE_BASE_URL +
          Constants.GET_NAME_BASED_TRACK_LIST_URL,
        {
          params: {
            userRole: userRole,
            managerEmail: loginResourceID,
            trackName: trackName,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          trackList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    trackList.forEach((track, index) => {
      track["id"] = index;
    });

    return trackList;
  }

  async incidentCurrentStatusCountList(userRole, managerEmail) {
    var statusCount = [];

    await axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.INCIDENT_CURRENT_STATUS_COUNT_LIST_URL,
        { params: { userRole: userRole, managerEmail: managerEmail } }
      )
      .then((response) => {
        if (response.status === 200) {
          statusCount = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return statusCount;
  }

  async recommendCurrentStatusCountList(userRole, managerEmail) {
    var statusCount = [];

    await axios
      .get(
        Constants.RECOMMENDATION_BASE_URL +
          Constants.RECOMMENDATION_CURRENT_STATUS_COUNT_LIST_URL,
        { params: { userRole: userRole, managerEmail: managerEmail } }
      )
      .then((response) => {
        if (response.status === 200) {
          statusCount = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return statusCount;
  }

  async appTrackStatusBasedIncidentList(appID, trackID, status) {
    let incidentList = [];

    await axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.APP_TRACK_STATUS_BASED_INCIDENT_LIST_URL,
        { params: { appID: appID, trackID: trackID, status: status } }
      )
      .then((response) => {
        if (response.status === 200) {
          incidentList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return incidentList;
  }

  async appTrackStatusLevelRecomList(appID, trackID, status) {
    let recomList = [];

    await axios
      .get(
        Constants.RECOMMENDATION_BASE_URL +
          Constants.APP_TRACK_STATUS_LEVEL_RECOMMENDATION_LIST_URL,
        { params: { appID: appID, trackID: trackID, status: status } }
      )
      .then((response) => {
        if (response.status === 200) {
          recomList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return recomList;
  }

  async getAllModAlarmsList(userRole, userEmail) {
    let alarmsList = [];

    await axios
      .get(
        Constants.COMMON_MODULE_BASE_URL + Constants.GET_ALL_MOD_ALARM_LIST_URL,
        { params: { userRole: userRole, userEmail: userEmail } }
      )
      .then((response) => {
        if (response.status === 200) {
          alarmsList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return alarmsList;
  }

  async getDateBasedMODAlarmsList(userRole, userEmail) {
    let alarmsList = [];

    await axios
      .get(
        Constants.COMMON_MODULE_BASE_URL +
          Constants.GET_DATE_BASED_MOD_ALARM_LIST_URL,
        { params: { userRole: userRole, userEmail: userEmail } }
      )
      .then((response) => {
        if (response.status === 200) {
          alarmsList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return alarmsList;
  }

  async getDashboardModAlarmsChart(userRole, userEmail) {
    let alarmsList = [];

    await axios
      .get(
        Constants.COMMON_MODULE_BASE_URL +
          Constants.GET_DASHBOARD_MOD_ALARMS_CHART_URL,
        { params: { userRole: userRole, userEmail: userEmail } }
      )
      .then((response) => {
        if (response.status === 200) {
          alarmsList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return alarmsList;
  }

  async getMitigationComponentCounts() {
    let componentCounts = [];

    await axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.GET_MITIGATION_COMPONENT_COUNTS_URL
      )
      .then((response) => {
        if (response.status === 200) {
          componentCounts = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return componentCounts;
  }

  async getTrackNameBasedIncidentList(trackName, userRole, userEmail) {
    let incidentList = [];

    await axios
      .get(
        Constants.INCIDENT_MGM_BASE_URL +
          Constants.GET_TRACK_NAME_BASED_INCIDENT_LIST_URL,
        {
          params: {
            trackName: trackName,
            userRole: userRole,
            userEmail: userEmail,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          incidentList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return incidentList;
  }

  async getTrackNameBasedRecommendList(trackName) {
    let incidentList = [];

    await axios
      .get(
        Constants.RECOMMENDATION_BASE_URL +
          Constants.GET_TRACK_NAME_BASED_RECOMMEND_LIST_URL,
        { params: { trackName: trackName } }
      )
      .then((response) => {
        if (response.status === 200) {
          incidentList = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return incidentList;
  }

  //File Uploader
  async testSFTPConnection(username, hostname, port, password) {
    const response = await axios.post(
      `${
        Constants.COMMON_MODULE_BASE_URL + Constants.SFTP_CREATE_CONNECTION
      }?username=${username}&host=${hostname}&port=${port}&password=${password}`
    );
    return response;
  }

  async getSFTPUploadStatus(
    fileName,
    CHUNK_SIZE,
    username,
    hostname,
    port,
    password
  ) {
    const response = await axios.get(
      `${
        Constants.COMMON_MODULE_BASE_URL + Constants.SFTP_UPLOAD_STATUS
      }?fileName=${fileName}&chunkSize=${CHUNK_SIZE}&username=${username}&host=${hostname}&port=${port}&password=${password}`
    );
    return response;
  }

  async sftpFileDownload(filePath, userID, username, hostname, port, password) {
    const response = await fetch(
      `${
        Constants.COMMON_MODULE_BASE_URL + Constants.SFTP_FILE_DOWNLOAD
      }?filePath=${filePath}&userID=${userID}&username=${username}&host=${hostname}&port=${port}&password=${password}`
    );
    return response;
  }

  async getSFTPDirectory(hostname, port, username, password, dirPath) {
    const response = await axios.get(
      `${
        Constants.COMMON_MODULE_BASE_URL + Constants.SFTP_REMOTE_DIRECTORY
      }?host=${hostname}&port=${port}&username=${username}&password=${password}&dirPath=${dirPath}`
    );
    return response;
  }
  async uploadFileChunk(username, hostname, port, password, file, remoteDirc) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", username);
    formData.append("host", hostname);
    formData.append("port", port);
    formData.append("password", password);
    formData.append("remoteDirc", remoteDirc);

    try {
      const response = await axios.post(
        `${Constants.COMMON_MODULE_BASE_URL + Constants.SFTP_FILE_UPLOAD}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  async validateLicense() {
    let message = [];

    await axios
      .get(
        Constants.COMMON_MODULE_BASE_URL + Constants.VALIDATE_LICENSE).then((response) => {
        if (response.status === 200) {
          message = response.data.license;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return message;
  }
}

export default new AuthService();
