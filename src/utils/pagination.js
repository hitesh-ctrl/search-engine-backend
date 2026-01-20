const paginate = (items, page, limit) => {
    const start = (page-1)*limit
    const end = start+limit
    return items.slice(start,end)
}

module.exports = { paginate }