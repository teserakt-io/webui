export function isBase64(str) {
    if (str ==='' || str.trim() ===''){ return false; }
    try {
        return btoa(atob(str)) == str;
    } catch (err) {
        return false;
    }
}

export function toCronString(fields) {
    let cron = (fields.seconds ? `${fields.seconds} ` : "") +
        `${fields.minutes} ` +
        `${fields.hours} ` +
        `${fields.days} ` +
        `${fields.month} ` +
        `${fields.weeks} ` +
        `${fields.years}`;

    return cron;
}

export function capitalize(s) {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}