const md5 = require("blueimp-md5");
const path = require('path');
const fs = require('fs');
const key = "changepassword";
const changePassword = (password) => {
    return md5(password, key);
}
const fileOperation = async(file) => {
    let originalname = file.originalname,
        fieldname = file.fieldname,
        tmp_path = file.path,
        target_path = path.join(__dirname, '../assets/images/', originalname),
        src = fs.createReadStream(tmp_path),
        dest = fs.createWriteStream(target_path);
    await src.pipe(dest);
    await fs.unlink(tmp_path);
    return `images/${originalname}`;
};
module.exports = {
    changePassword: changePassword,
    fileOperation: fileOperation
}