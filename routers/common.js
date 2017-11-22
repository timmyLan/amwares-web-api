const md5 = require("blueimp-md5");
const path = require('path');
const fs = require('fs');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, colorize } = format;
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
const fileOperation = async(files, folder) => {
    try {
        let target_dir = path.join(__dirname, `../assets/images/${folder}`)
        let exist = fs.existsSync(target_dir);
        if (!exist) {
            await fs.mkdir(target_dir, (err) => {
                if (err) {
                    throw `error with mkdir:${err}`;
                }
            })
        }
        let info = {};
        for (let key in files) {
            let imgInfo = {};
            const file = files[key][0],
                filename = file.filename,
                fieldname = file.fieldname,
                tmp_path = file.path,
                target_path = path.join(__dirname, `../assets/images/${folder}/`, filename),
                src = fs.createReadStream(tmp_path),
                dest = fs.createWriteStream(target_path);
            await src.pipe(dest);
            await fs.unlink(tmp_path, (err) => {
                if (err) {
                    throw `error with unlink imageFile:${err}`;
                }
            });
            imgInfo[`${fieldname}`] = `/images/${folder}/${filename}`;
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

const definePaging = (currentPage = 1, countPerPage = 10) => {
    return {
        'limit': countPerPage, // 每页多少条
        'offset': countPerPage * (currentPage - 1) // 跳过多少条
    }
}
const removeFile = async (tmp_path) =>{
    if(fs.existsSync(tmp_path)){
        await fs.unlink(tmp_path, (err) => {
        if (err) {
            throw `error with unlink imageFile:${err}`;
        }
        });
    }
}
module.exports = {
    changePassword: changePassword,
    fileOperation: fileOperation,
    loggerError: loggerError,
    definePaging: definePaging,
    removeFile:removeFile
}