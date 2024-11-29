export const formatCurrency = (value) => {
    if (!value || value === '') return '$0.00';
    const number = parseFloat(value);
    if (isNaN(number)) return '$0.00';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
};
