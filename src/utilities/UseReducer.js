export const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGGEDIN":
      return {
        ...state,
        loggedin: action.payload,
      };
    case "PATIENT":
      return {
        ...state,
        patient: action.payload,
      };
    case "DOCTOR":
      return {
        ...state,
        doctor: action.payload,
      };
    case "RESULT":
      return {
        ...state,
        result: action.payload,
      };
    case "TEST_HISTORY":
      return {
        ...state,
        testhistory: action.payload,
      };
    case "TEST_ID":
      return {
        ...state,
        testid: action.payload,
      };
    case "CURR_TEST_RESULT":
      return {
        ...state,
        currtestresult: action.payload,
      };
    case "TEST_RESULT":
      return {
        ...state,
        testresult: action.payload,
      };
    case "DEEP_TEST_RESULT":
      return {
        ...state,
        deepTestResult: action.payload,
      };
    case "TEST_DATA":
      return {
        ...state,
        testdata: action.payload,
      };
    case "ADMIN_LOGIN":
      return {
        ...state,
        adminloggedin: action.payload,
      };
    case "CURR_BLOG_ID":
      return {
        ...state,
        currblogid: action.payload,
      };
    case "EDIT_BLOG_ID":
      return {
        ...state,
        editblogid: action.payload,
      };
    case "EDIT_DOC_ID":
      return {
        ...state,
        editdocid: action.payload,
      };
    case "SET_MESSAGE":
      return {
        ...state,
        usermsg: action.payload,
      };

    default:
      return state;
  }
};

