// @ts-ignore
const StaqlabTunnelClient = require("@staqlab/staqlab-tunnel/lib/StaqlabTunnelClient")

export class StaqlabTunnelClientTest {
    testModule() {
        console.log(StaqlabTunnelClient);
        //    const StaqlabTunnelClient = require("@staqlab/staqlab-tunnel/StaqlabTunnelClient");

//3000 is desired port and hostname is desired hostname you want
        let staqlabTtunnelArguments = "3000 hostname=spider-man";

        let client = new StaqlabTunnelClient(staqlabTtunnelArguments);
        client.init();
    }
}

new StaqlabTunnelClientTest().testModule();