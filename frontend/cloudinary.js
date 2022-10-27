// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
    cloud_name: 'dzzvhocib', 
    api_key: '127716544588549', 
    api_secret: 'fkf9WyqcK_frb7fgDi397_NlwR0' 
  });

module.exports = cloudinary;
