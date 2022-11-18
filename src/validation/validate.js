export const checkEmpty = (value) => {
    if(value.trim() === '') {
        return false;
    }
    return true
}