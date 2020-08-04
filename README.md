> [‘Own The Internet’ Hackathon](https://gitcoin.co/hackathon/own-the-internet)

-   Hackathon page: https://gitcoin.co/hackathon/own-the-internet

### Handshake

-   Project page: https://handshake.org
-   Learn Center: https://learn.namebase.io

### Sia

-   Project page: https://siasky.net
-   Docs: https://sia.tech/docs/#skynet

## Freunde Von Ideen - Node Skynet Client Library

Node Skynet Client Library using [fvi-axios-client](https://github.com/salespaulo/fvi-axios-client).

### Using

-   Terminal

```shell
mkdir test-skynet
cd test-skynet
npm install --save fvi-skynet-client
touch index.js
vi index.js
```

-   Vi (Text editor)

```javascript
const skynet = require('fvi-skynet-client')

// URL default is http://siasky.net.
// Other options follows [axios config](https://github.com/axios/axios).
const opts = {}
const client = skynet(opts)
```

### Upload File

```javascript
const fs = require('fs')

const opts = {
    endpoint: '/skynet/skyfile', // optional
    filename: null, // optional
    dryRun: true, // optional
}
const stream = fs.createReadStream('test.xyz')

client
    .uploadFile(stream, opts)
    .then(res => console.log(res))
    .catch(e => console.error(e))

/*
Example of success print:
{
    skylink: 'CABAB_1Dt0FJsxqsu_J4TodNCbCGvtFf1Uys_3EgzOlTcg',
    merkleroot: 'QAf9Q7dBSbMarLvyeE6HTQmwhr7RX9VMrP9xIMzpU3I',
    bitfield: 2048,
}
*/
```

### Upload Directory

```javascript
const fs = require('fs')

const opts = {
    endpoint: '/skynet/skyfile', // optional
    filename: null, // optional
    dryRun: true, // optional
}
const files = fs.readdirSync('dirnamehere')
const streams = files.map(f => fs.createReadStream(f))

client
    .uploadDirectory(streams, opts)
    .then(res => console.log(res))
    .catch(e => console.error(e))
/*
Example of success print:
{
    skylink: 'CABAB_1Dt0FJsxqsu_J4TodNCbCGvtFf1Uys_3EgzOlTcg',
    merkleroot: 'QAf9Q7dBSbMarLvyeE6HTQmwhr7RX9VMrP9xIMzpU3I',
    bitfield: 2048,
}
*/
```

### Download

```javascript
client
    .download('sia://CABAB_1Dt0FJsxqsu_J4TodNCbCGvtFf1Uys_3EgzOlTcg')
    .then(res => console.log(res))
    .catch(e => console.error(e))
```

### Statistics

```javascript
client
    .statistics()
    .then(res => console.log(res))
    .catch(e => console.error(e))

/*
Example of success print:
{
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
}
*/
```

### Mock

The mock object follows the [axios adapter mock](https://github.com/ctimmerm/axios-mock-adapter).

```javascript
const fs = require('fs')

if (client.mock) {
    const stream = fs.createReadStream('mock.xyz')
    client.mock.onPost(`/skynet/skyfile`).reply(200, { mock: true })
    client.mock.onGet(`/CABAB_1Dt0FJsxqsu_J4TodNCbCGvtFf1Uys_3EgzOlTcg`).reply(200, stream)
}
```

### Audit

-   [HIGH](./AUDIT.md)

### fvi-skynet-client

-   `npm run compile`: Clean temp files and e directories.
-   `npm run debug-test`: Run mocha unit tests with DEBUG enabled.
-   `npm run test`: Run mocha unit tests.
-   `npm run debug-dev`: Run dev mode, waiting for changes to run unit tests with DEBUG enabled (watch mode).
-   `npm run dev`: Run dev mode, waiting for changes to run unit tests.
-   `npm run prod`: Run with NODE_ENV=production.
-   `npm run coverage`: Run unit tests and coverage with [nyc](https://github.com/istanbuljs/nyc/).
-   `npm run release`: Init git flow release from next package version, **patch**, [git flow](https://github.com/nvie/gitflow/).
-   `npm run release:minor`: Init git flow release from next package version, **minor**, [git flow](https://github.com/nvie/gitflow/).
-   `npm run release:major`: Init git flow release from next package version, **major**, [git flow](https://github.com/nvie/gitflow/) release start.
-   `npm run release:finish`: Finish current releas, [git flow](https://github.com/nvie/gitflow/).
