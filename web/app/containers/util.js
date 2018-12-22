import moment from 'moment';

export const formatTime = (time, formatStr = 'YYYY-MM-DD HH:mm:ss') => moment(time).format(formatStr)

export const doAction = (type, cb) => {

}