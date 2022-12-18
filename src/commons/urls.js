export const API_VERSION1 = "/api/v1";

export const NOTIFICATION_BASE_URL = "http://localhost:8081/notification-service";
export const PAYMENT_BASE_URL = "http://localhost:8082/payment-service";


// lms urls
export const LMS_BASE_URL = "http://localhost:8083/lms";
export const LMS_BASE_URL_WITH_VERSION = "http://localhost:8083/lms" + API_VERSION1;
export const AUTHENTICATION = LMS_BASE_URL + API_VERSION1 + "/authentication";
export const VERIFY_EMAIL = LMS_BASE_URL + API_VERSION1 + "/authentication/verifyEmail/"
export const LMS_STUDENTS = LMS_BASE_URL_WITH_VERSION + "/students"
export const LMS_INSTRUCTORS = LMS_BASE_URL_WITH_VERSION + "/instructors"
export const LMS_RELATIVES = LMS_BASE_URL_WITH_VERSION + "/relatives"
export const LMS_COURSES = LMS_BASE_URL_WITH_VERSION + "/courses"
export const LMS_TOPICS = LMS_BASE_URL_WITH_VERSION + "/topics"
export const LMS_SUB_TOPICS = LMS_BASE_URL_WITH_VERSION + "/subtopics"
