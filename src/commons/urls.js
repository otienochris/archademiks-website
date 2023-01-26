export const API_VERSION1 = "/api/v1";
export const SECOND_MACHINE = "https://192.168.0.102"
// export const SECOND_MACHINE = "http://localhost"

// Notification urls
export const NOTIFICATION_BASE_URL = SECOND_MACHINE + ":8081/notification-service";
export const NOTIFICATION_SEND_SIMPLE_MAIL = NOTIFICATION_BASE_URL + "/mail/send-simple-message"

// Payment urls
export const PAYMENT_BASE_URL = SECOND_MACHINE + ":8082/payment-service";


// lms urls
// export const LMS_BASE_URL = "http://localhost:8083/lms";
export const LMS_BASE_URL = SECOND_MACHINE + ":8083/lms";
export const LMS_BASE_URL_WITH_VERSION = LMS_BASE_URL + API_VERSION1;

export const LMS_AUTHENTICATION = LMS_BASE_URL + API_VERSION1 + "/authentication";
export const LMS_VERIFY_EMAIL = LMS_BASE_URL + API_VERSION1 + "/authentication/verifyEmail/"

export const LMS_STUDENTS = LMS_BASE_URL_WITH_VERSION + "/students"
export const LMS_STUDENTS_SIGNUP = LMS_STUDENTS + "/signup"

export const LMS_INSTRUCTORS = LMS_BASE_URL_WITH_VERSION + "/instructors"
export const LMS_INSTRUCTORS_SIGNUP = LMS_INSTRUCTORS + "/signup"

export const LMS_RELATIVES = LMS_BASE_URL_WITH_VERSION + "/relatives"
export const LMS_RELATIVES_SIGNUP = LMS_RELATIVES + "/signup"

export const LMS_COURSES = LMS_BASE_URL_WITH_VERSION + "/courses"
export const LMS_TOPICS = LMS_BASE_URL_WITH_VERSION + "/topics"
export const LMS_SUB_TOPICS = LMS_BASE_URL_WITH_VERSION + "/subtopics"
export const LMS_USERS = LMS_BASE_URL_WITH_VERSION + "/users"
export const LMS_COURSE_ENROLLMENTS = LMS_BASE_URL_WITH_VERSION + "/course-enrollments"


