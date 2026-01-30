const tokenize = (text) => {
    return text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)
}
module.exports = {tokenize}