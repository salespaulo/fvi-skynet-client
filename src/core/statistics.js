'use strict'

const statsMock = (client, url) => {
    if (!client.mock) {
        return
    }

    client.mock.onGet(url).reply(200, {
        uptime: 1234,
        uploadstats: {
            numfiles: 2,
            totalsize: 44527895,
        },
        versioninfo: {
            version: '1.4.4-master',
            gitrevision: 'cd5a83712',
        },
        performancestats: {
            // Fields omitted
        },
    })
}

const stats = client => () => {
    const url = `/skynet/stats`
    statsMock(client, url)
    return client.get(url)
}

module.exports = client => {
    return {
        stats: stats(client),
    }
}
