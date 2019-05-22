class Helper {
    static isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n)
    }
}

export default Helper