const crypto = require('crypto');
const key = crypto.randomBytes(32).toString('hex').toUpperCase();
console.log(key);
// 754785A92E646D7BCB3BB9B2668C0C3BF473FD60C36D80146C59F00BD05BCA52
// 9996D634C8404D5809122083F7596F8FB98E3B827CB719FED0859A2B5E7A929F