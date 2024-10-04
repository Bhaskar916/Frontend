const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const monthNameList = () => {
    return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
}

const addLeadingZeros = (num, totalLength) => {
    return String(num).padStart(totalLength, '0');
  }

const blockInvalidNumberChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

export {escapeRegExp, monthNameList, addLeadingZeros, blockInvalidNumberChar};