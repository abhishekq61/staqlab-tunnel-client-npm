import {StaqlabTunnelClient} from "../src/StaqlabTunnelClient";


export class StaqlabTunnelClientTest {
    testModule(){
        new StaqlabTunnelClient("30001 hostname=kitty").init();
    }
}
new StaqlabTunnelClientTest().testModule()