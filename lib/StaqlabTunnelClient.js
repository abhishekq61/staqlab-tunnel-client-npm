"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var user_home_1 = __importDefault(require("user-home"));
var fs = __importStar(require("fs"));
var os = __importStar(require("os"));
var child_process_1 = require("child_process");
var unzip = __importStar(require("unzip"));
module.exports = /** @class */ (function () {
    function StaqlabTunnelClient(runCommand) {
        this.runCommand = runCommand;
    }
    StaqlabTunnelClient.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var platform, isClientExist, clientArguments, runCommand;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.home = user_home_1.default;
                        platform = os.platform();
                        if (platform == "darwin") {
                            platform = "MacOS";
                        }
                        else if (platform == "win32" || platform == "win64") {
                            platform = "Windows";
                        }
                        else if (platform == "linux") {
                            platform = "Linux";
                        }
                        return [4 /*yield*/, this.downloadFile(platform)];
                    case 1:
                        isClientExist = _a.sent();
                        if (!isClientExist) return [3 /*break*/, 3];
                        clientArguments = this.runCommand ? this.runCommand : process.argv.splice(2, process.argv.length).join(" ");
                        runCommand = "./staqlab-tunnel";
                        if (platform === "Windows")
                            runCommand = "staqlab-tunnel";
                        return [4 /*yield*/, new Promise(function (res) {
                                setTimeout(function () {
                                    res();
                                }, 2000);
                            })];
                    case 2:
                        _a.sent();
                        child_process_1.exec("cd " + this.home + ";chmod +x staqlab-tunnel; " + runCommand + " " + clientArguments, function (err, stdout, stderr) {
                            if (stdout)
                                console.log(stdout);
                            if (stderr)
                                console.log(stderr);
                            if (err)
                                console.log(err.message);
                        }).stdout.on("data", function (data) {
                            console.log(data.toString().trim());
                        });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    StaqlabTunnelClient.prototype.downloadFile = function (platform) {
        return __awaiter(this, void 0, void 0, function () {
            var fileName, zipPath, clientPAth, downloadCommand_1, isDownloaded;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileName = "staqlab-tunnel.zip";
                        zipPath = this.home + "/" + fileName;
                        clientPAth = this.home + "/staqlab-tunnel";
                        if (!fs.existsSync(clientPAth)) return [3 /*break*/, 1];
                        return [2 /*return*/, true];
                    case 1:
                        if (fs.existsSync(zipPath))
                            fs.unlinkSync(zipPath);
                        downloadCommand_1 = "";
                        switch (platform) {
                            case "Linux":
                                downloadCommand_1 = "cd " + this.home + " ; wget https://raw.githubusercontent.com/abhishekq61/tunnel-client/master/linux/staqlab-tunnel.zip";
                                break;
                            case "MacOS":
                                downloadCommand_1 = "cd " + this.home + " ; wget https://raw.githubusercontent.com/abhishekq61/tunnel-client/master/mac/staqlab-tunnel.zip";
                                break;
                            case "Windows":
                                downloadCommand_1 = "cd " + this.home + " ;wget https://raw.githubusercontent.com/abhishekq61/tunnel-client/master/windows/staqlab-tunnel.zip --no-check-certificate";
                                break;
                        }
                        console.log("Downloading latest client......... Directory:" + this.home);
                        return [4 /*yield*/, new Promise(function (res) {
                                child_process_1.exec(downloadCommand_1, function (err, stdout, stderr) {
                                    if (err) {
                                        console.log(err.message);
                                        res();
                                    }
                                    if (stdout) {
                                        console.log(stdout);
                                        res();
                                    }
                                    if (stderr) {
                                        console.log(stderr);
                                        res();
                                    }
                                });
                            })];
                    case 2:
                        _a.sent();
                        isDownloaded = fs.existsSync(zipPath);
                        if (!isDownloaded) return [3 /*break*/, 4];
                        return [4 /*yield*/, new Promise(function (res) {
                                fs.createReadStream(zipPath).pipe(unzip.Extract({ path: _this.home })).on("err", function (err) {
                                    console.log("Error Unzipping File" + err.message);
                                    res();
                                }).on("finish", function () {
                                    console.log("Unzipped File Client Path:" + clientPAth);
                                    res();
                                });
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, fs.existsSync(clientPAth)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return StaqlabTunnelClient;
}());
