export const formatCurrency = (value) => {
    if (value >= 10000000) {
        return (value / 10000000).toFixed(2) + " Cr"; // 1 Crore = 10,000,000
    } else if (value >= 100000) {
        return (value / 100000).toFixed(2) + " Lac"; // 1 Lakh = 100,000
    } else if (value >= 1000) {
        return (value / 1000).toFixed(2) + " K"; // 1K = 1,000
    }
    return value; // Return the original value if less than 1K
};