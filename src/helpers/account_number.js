
module.exports = accountNumber;

function accountNumber() {
    let min = Math.ceil(5111111111);
    let max = Math.floor(5999999999);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
