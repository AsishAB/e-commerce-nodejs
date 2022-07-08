const crypto = require('crypto');

//exports.secret_key = crypto.createHash('sha256').update(String("bnTcwm2QbA18ZGn3RAfAuNVbnvUohElEdGFSWoJ9")).digest('base64').substring(0, 32);
//exports.iv = crypto.randomBytes(16).toString('hex').slice(0, 16);
// exports.algorithm = "aes-256-ctr";

exports.iv = crypto.randomBytes(16);
exports.secret_key = crypto.randomBytes(32);
exports.algorithm = "aes-256-cbc";





//exports.secret_key = "bnTcwm2QbA18ZGn3RAfAuNVbnvUohElEdGFSWoJ9";
//exports.iv = "ku91rodhmmraGuVPt9airrQwR62ex4eKymo3j5t4";



// Used in helper -> encrypt_decrypt