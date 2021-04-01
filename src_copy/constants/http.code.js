// //  "100": "Continue",
// export const CONTINUE = 100;
// //  "101": "Switching Protocols",
// export const SWITCHING_PROTOCOLS = 101;
// //  "102": "Processing",
// export const PROCESSING = 102;
// //  "103": "Early Hints",
// export const EARLY_HINTS = 103;
// //  "200": "OK",
// export const OK = 200;
// //  "201": "Created",
// export const CREATED = 201;
// //  "202": "Accepted",
// export const ACCEPTED = 202;
// //  "203": "Non-Authoritative Information",
// export const NON_AUTHORITATIVE_INFORMATION = 203;
// //  "204": "No Content",
// export const NO_CONTENT = 204;
// //  "205": "Reset Content",
// export const RESET_CONTENT = 205;
// //  "206": "Partial Content",
// export const PARTIAL_CONTENT = 206;
// //  "207": "Multi-Status",
// export const MULTI_STATUS = 207;
// //  "208": "Already Reported",
// export const ALREADY_REPORTED = 208;
// //  "226": "IM Used",
// export const IM_USED = 226;
// //  "300": "Multiple Choices",
// export const MULTIPLE_CHOICES = 300;
// //  "301": "Moved Permanently",
// export const MOVED_PERMANENTLY = 301;
// //  "302": "Found",
// export const FOUND = 302;
// //  "303": "See Other",
// export const SEE_OTHER = 303;
// //  "304": "Not Modified",
// export const NOT_MODIFIED = 304;
// //  "305": "Use Proxy",
// export const USE_PROXY = 305;
// //  "306": "(Unused)",
// export const UNUSED = 306;
// //  "307": "Temporary Redirect",
// export const TEMPORARY_REDIRECT = 307;
// //  "308": "Permanent Redirect",
// export const PERMANENT_REDIRECT = 308;
// //  "400": "Bad Request",
// export const BAD_REQUEST = 400;
// //  "401": "Unauthorized",
// export const UNAUTHORIZED = 401;
// //  "402": "Payment Required",
// export const PAYMENT_REQUIRED = 402;
// //  "403": "Forbidden",
// export const FORBIDDEN = 403;
// //  "404": "Not Found",
// export const NOT_FOUND = 404;
// //  "405": "Method Not Allowed",
// export const METHOD_NOT_ALLOWED = 405;
// //  "406": "Not Acceptable",
// export const NOT_ACCEPTABLE = 406;
// //  "407": "Proxy Authentication Required",
// export const PROXY_AUTHENTICATION_REQUIRED = 407;
// //  "408": "Request Timeout",
// export const REQUEST_TIMEOUT = 408;
// //  "409": "Conflict",
// export const CONFLICT = 409;
// //  "410": "Gone",
// export const GONE = 410;
// //  "411": "Length Required",
// export const LENGTH_REQUIRED = 411;
// //  "412": "Precondition Failed",
// export const PRECONDITION_FAILED = 412;
// //  "413": "Payload Too Large",
// export const PAYLOAD_TOO_LARGE = 413;
// //  "414": "URI Too Long",
// export const URI_TOO_LONG = 414;
// //  "415": "Unsupported Media Type",
// export const UNSUPPORTED_MEDIA_TYPE = 415;
// //  "416": "Range Not Satisfiable",
// export const RANGE_NOT_SATISFIBALE = 416;
// //  "417": "Expectation Failed",
// export const EXPECTATION_FAILED = 417;
// //  "418": "I'm a teapot",
// export const IM_A_TEAPOT = 418;
// //  "421": "Misdirected Request",
// export const MISDIRECTED_REQUEST = 421;
// //  "422": "Unprocessable Entity",
// export const UNPROCESSABLE_ENTITY = 422;
// //  "423": "Locked",
// export const LOCKED = 423;
// //  "424": "Failed Dependency",
// export const FAILED_DEPENDENCY = 424;
// //  "425": "Unordered Collection",
// export const UNORDERED_COLLECTION = 425;
// //  "426": "Upgrade Required",
// export const UPGRADE_REQUIRED = 426;
// //  "428": "Precondition Required",
// export const PRECONDITION_REQUIRED = 428;
// //  "429": "Too Many Requests",
// export const TOO_MANY_REQUESTS = 429;
// //  "431": "Request Header Fields Too Large",
// export const REQUEST_HEADER_FIELDS_TOO_LARGE = 431;
// //  "451": "Unavailable For Legal Reasons",
// export const UNAVAILABLE_FOR_LEGAL_REASONS = 451;
// //  "500": "Internal Server Error",
// export const INTERNAL_SERVER_ERROR = 500;
// //  "501": "Not Implemented",
// export const NOT_IMPLEMENTED = 501;
// //  "502": "Bad Gateway",
// export const BAD_GATEWAY = 502;
// //  "503": "Service Unavailable",
// export const SERVICE_UNAVAILABLE = 503;
// //  "504": "Gateway Timeout",
// export const GATEWAY_TIMEOUT = 504;
// //  "505": "HTTP Version Not Supported",
// export const HTTP_VERSION_NOT_SUPPORTED = 505;
// //  "506": "Variant Also Negotiates",
// export const VARIANT_ALSO_NEGOTIATES = 506;
// //  "507": "Insufficient Storage",
// export const INSUFFICIENT_STORAGE = 507;
// //  "508": "Loop Detected",
// export const LOOP_DETECTED = 508;
// //  "509": "Bandwidth Limit Exceeded",
// export const BANDWIDTH_LIMIT_EXCEEDED = 509;
// //  "510": "Not Extended",
// export const NOT_EXTENDED = 510;
// //  "511": "Network Authentication Required"
// export const NETWORK_AUTHENTICATION_REQUIRED = 511;

const HTTP_CODE = {
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    PROCESSING: 102,
    EARLY_HINTS: 103,
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    MULTI_STATUS: 207,
    ALREADY_REPORTED: 208,
    IM_USED: 226,
    MULTIPLE_CHOICES: 300,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    USE_PROXY: 305,
    UNUSED: 306,
    TEMPORARY_REDIRECT: 307,
    PERMANENT_REDIRECT: 308,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    PAYLOAD_TOO_LARGE: 413,
    URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    RANGE_NOT_SATISFIBALE: 416,
    EXPECTATION_FAILED: 417,
    IM_A_TEAPOT: 418,
    MISDIRECTED_REQUEST: 421,
    UNPROCESSABLE_ENTITY: 422,
    LOCKED: 423,
    FAILED_DEPENDENCY: 424,
    UNORDERED_COLLECTION: 425,
    UPGRADE_REQUIRED: 426,
    PRECONDITION_REQUIRED: 428,
    TOO_MANY_REQUESTS: 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
    UNAVAILABLE_FOR_LEGAL_REASONS: 451,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505,
    VARIANT_ALSO_NEGOTIATES: 506,
    INSUFFICIENT_STORAGE: 507,
    LOOP_DETECTED: 508,
    BANDWIDTH_LIMIT_EXCEEDED: 509,
    NOT_EXTENDED: 510,
    NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.freeze(HTTP_CODE);

module.exports = HTTP_CODE;