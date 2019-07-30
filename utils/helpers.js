export function isBase64(str) {
    if (str === '' || str.trim() === '') { return false; }
    try {
        return btoa(atob(str)) == str;
    } catch (err) {
        return false;
    }
}

export function toCronString(fields) {
    return (fields.seconds ? `${fields.seconds} ` : "") +
        `${fields.minutes} ` +
        `${fields.hours} ` +
        `${fields.days} ` +
        `${fields.month} ` +
        `${fields.weeks} ` +
        `${fields.years}`;
}

export function capitalize(s) {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export function spacedLongString(str, offset = 20) {
    if (str.length <= 20)
        return str;

    const splitted = str.split("");
    for (let i = 0; i < splitted.length;) {
        const idx = splitted.slice(i, i + offset).findIndex(ch => ch === " ");
        if (idx === -1) {
            splitted.splice(i + offset, 0, " ");
            i += offset + 1;
        } else {
            i += idx + 1;
        }
    }

    return splitted.join("");
}
