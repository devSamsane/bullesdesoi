
// const API_ERROR_CODES = {
//   serverError: 'ERREUR_SERVEUR'
// };

// class ApiError extends Error {
//   constructor(message: any, { status, code }: any = {}) {
//     super(message);

//     // Set HTTP status code
//     this.status = status || 500;

//     // Set API error code
//     this.code = code || API_ERROR_CODES.serverError;

//     // Ensures that stack trace uses our subclass name
//     this.name = this.constructor.name;

//     // Ensures the ApiError subclass is sliced out of the
//     // stack trace dump for clarity
//     Error.captureStackTrace(this, this.constructor);
//   }
// }

