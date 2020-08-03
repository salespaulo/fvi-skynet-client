'use strict'

const stats = client => () => {
    const url = `/skynet/stats`
    return client.get(url)
}

module.exports = client => {
    return {
        stats: stats(client),
    }
}
