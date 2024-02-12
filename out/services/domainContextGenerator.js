"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLaravelModel = exports.domainContextGenerator = exports.getDomainContext = void 0;
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const vscode_1 = require("vscode");
const logify_1 = require("../utils/logify");
const utils_1 = require("../utils/utils");
const getDomainContext = async () => {
    try {
        const result = await vscode_1.window.showInputBox({
            prompt: "Context:",
            placeHolder: "e.g Posts, Comments, Products",
        });
        return result?.trim() || "";
    }
    catch (error) {
        vscode_1.window.showErrorMessage("Something went wrong");
        console.log(error);
        return "";
    }
};
exports.getDomainContext = getDomainContext;
const domainContextGenerator = async (baseExtPath) => {
    const domainContext = await (0, exports.getDomainContext)();
    logify_1.logify.log(`Domain Context: ${domainContext}`);
    if (vscode_1.workspace.workspaceFolders && vscode_1.workspace.workspaceFolders.length > 1) {
        logify_1.logify.error("multiple workspace folder is not yet supported.");
        return;
    }
    const currentWorkspace = vscode_1.workspace.workspaceFolders ?? null;
    logify_1.logify.log(`Current workspace: ${currentWorkspace}`);
    try {
        if (currentWorkspace !== null) {
            const appPath = path_1.default.join(currentWorkspace[0].uri.path, "app");
            if (fs.existsSync(appPath)) {
                logify_1.logify.log(`Path existed: ${appPath}`);
                const contextPath = path_1.default.join(appPath, domainContext);
                if (!fs.existsSync(contextPath)) {
                    fs.mkdirSync(contextPath);
                    logify_1.logify.log(`Path created: ${contextPath}`);
                }
                logify_1.logify.log("Creating laravel model...");
                (0, exports.createLaravelModel)(baseExtPath, domainContext, contextPath);
            }
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.domainContextGenerator = domainContextGenerator;
const createLaravelModel = (baseExtPath, context, contextPath) => {
    const contextToUpperCase = (0, utils_1.capitalizeString)(context);
    const contextModelPath = path_1.default.join(contextPath, "Models");
    const newModelFile = path_1.default.join(contextModelPath, context + ".php");
    try {
        if (!fs.existsSync(contextModelPath)) {
            fs.mkdirSync(contextModelPath);
        }
        logify_1.logify.log(baseExtPath);
        console.log(`inside domain context generator: ${baseExtPath}`);
        const laravelModelSubPath = path_1.default.join(baseExtPath, 'src/stubs/laravel-model.stub');
        logify_1.logify.log("laravelModelSubPath: ", laravelModelSubPath);
        const data = fs.readFileSync(laravelModelSubPath, 'utf8');
        logify_1.logify.log(data);
        const newContent = data.replace('{{ namespace }}', `App\\${contextToUpperCase}\\Models`).replace('{{ class }}', contextToUpperCase);
        logify_1.logify.log(newContent);
        fs.writeFileSync(newModelFile, newContent);
    }
    catch (err) {
        logify_1.logify.error(err);
    }
};
exports.createLaravelModel = createLaravelModel;
//# sourceMappingURL=domainContextGenerator.js.map