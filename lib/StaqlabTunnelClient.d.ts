declare const _default: {
    new (runCommand: string): {
        home: string;
        runCommand: string;
        init(): Promise<void>;
        downloadFile(platform: any): Promise<boolean>;
    };
};
export = _default;
