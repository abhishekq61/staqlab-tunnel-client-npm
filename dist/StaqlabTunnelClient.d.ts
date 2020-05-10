export declare class StaqlabTunnelClient {
    private runCommand;
    home: string;
    constructor(runCommand: string);
    init(): Promise<void>;
    downloadFile(platform: any): Promise<boolean>;
}
