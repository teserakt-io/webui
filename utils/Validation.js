class Validation {
    static isEmpty(value: ?any) {
        return value === undefined || value === null || value === ''
    }
}

export default Validation