const md5 = require("blueimp-md5");
const path = require('path');
const fs = require('fs');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf,colorize } = format;
const key = "changepassword";
const changePassword = (password) => {
    return md5(password, key);
}
const myFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});
const logger = createLogger({
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.Console()
    ],
    format: combine(
        timestamp(),
        myFormat
    )
});
const loggerError = (err) => {
    logger.log('error', err);
}
const fileOperation = async(files) => {
    try {
        let info = {};
        for (let key in files) {
            let imgInfo = {};
            const file = files[key][0],
                originalname = file.originalname,
                fieldname = file.fieldname,
                tmp_path = file.path,
                target_path = path.join(__dirname, '../assets/images/', originalname),
                src = fs.createReadStream(tmp_path),
                dest = fs.createWriteStream(target_path);
            await src.pipe(dest);
            await fs.unlink(tmp_path, (err) => {
                if (err) {
                    throw `error with unlink imageFile:${err}`;
                }
            });
            imgInfo[`${fieldname}`] = `/images/${originalname}`;
            info = {
                ...info,
                ...imgInfo
            }
        }
        return info;
    } catch (err) {
        loggerError(`fileOperation error:${err}`);
    }
};
module.exports = {
    changePassword: changePassword,
    fileOperation: fileOperation,
    loggerError: loggerError
}