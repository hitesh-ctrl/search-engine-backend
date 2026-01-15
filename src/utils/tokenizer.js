const tokenize = (text) => {
    return text.lowecase().split(/[^a-z0-9]+/).filter(Boolean)
}
module.exports = {tokenize}