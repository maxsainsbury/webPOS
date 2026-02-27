export const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) {
        return digits;
    }
    else if (digits.length <= 6) {
        return `(${digits.slice(0,3)}) ${digits.slice(3)}`;
    }
    else {
        return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6,10)}`;
    }
}