import userHome from 'user-home';
import * as fs from "fs";
import * as  os from 'os';
import {exec} from "child_process";
import * as unzip from "unzip";

export = class StaqlabTunnelClient {
    home: string;

    constructor(private runCommand: string) {
    }

    async init() {
        this.home = userHome;
        let platform: any = os.platform();
        if (platform == "darwin") {
            platform = "MacOS";
        } else if (platform == "win32" || platform == "win64") {
            platform = "Windows";
        } else if (platform == "linux") {
            platform = "Linux";
        }
        let isClientExist = await this.downloadFile(platform);
        if (isClientExist) {
            let clientArguments = this.runCommand ? this.runCommand : process.argv.splice(2, process.argv.length).join(" ");
            let runCommand = "./staqlab-tunnel";
            if (platform === "Windows")
                runCommand = "staqlab-tunnel";
            await new Promise((res) => {
                setTimeout(() => {
                    res();
                }, 2000);
            });
            exec(`cd ${this.home};chmod +x staqlab-tunnel; ${runCommand} ${clientArguments}`, (err, stdout, stderr) => {
                if (stdout)
                    console.log(stdout);
                if (stderr)
                    console.log(stderr);
                if (err)
                    console.log(err.message);

            }).stdout.on("data", (data) => {
                console.log(data.toString().trim())
            });
        }

    };

    async downloadFile(platform) {
        let fileName = "staqlab-tunnel.zip";
        let zipPath = `${this.home}/${fileName}`;
        let clientPAth = `${this.home}/staqlab-tunnel`;
        if (fs.existsSync(clientPAth)) {
            return true;
        } else {
            if (fs.existsSync(zipPath))
                fs.unlinkSync(zipPath);
            let downloadCommand = "";
            switch (platform) {
                case "Linux":
                    downloadCommand = `cd ${this.home} ; wget https://raw.githubusercontent.com/abhishekq61/tunnel-client/master/linux/staqlab-tunnel.zip`;
                    break;
                case "MacOS":
                    downloadCommand = `cd ${this.home} ; wget https://raw.githubusercontent.com/abhishekq61/tunnel-client/master/mac/staqlab-tunnel.zip`;
                    break;
                case "Windows":
                    downloadCommand = `cd ${this.home} ;wget https://raw.githubusercontent.com/abhishekq61/tunnel-client/master/windows/staqlab-tunnel.zip --no-check-certificate`;
                    break;
            }
            console.log(`Downloading latest client......... Directory:${this.home}`);
            await new Promise((res) => {
                exec(downloadCommand, (err, stdout, stderr) => {
                    if (err) {
                        console.log(err.message);
                        res();
                    }
                    if (stdout) {
                        console.log(stdout);
                        res()
                    }
                    if (stderr) {
                        console.log(stderr);
                        res();
                    }
                });
            });
            let isDownloaded = fs.existsSync(zipPath);
            if (isDownloaded) {
                await new Promise(res => {
                    fs.createReadStream(zipPath).pipe(unzip.Extract({path: this.home})).on("err", (err) => {
                        console.log(`Error Unzipping File` + err.message);
                        res();
                    }).on("finish", () => {
                        console.log(`Unzipped File Client Path:${clientPAth}`);
                        res();
                    });
                });
                return fs.existsSync(clientPAth);
            }
        }
    }

}
