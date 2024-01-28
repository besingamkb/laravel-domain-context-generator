"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainContextGeneratorProviders = void 0;
const vscode_1 = require("vscode");
const constants_1 = require("../utils/constants");
const domainContextGenerator_1 = require("./domainContextGenerator");
class DomainContextGeneratorProviders {
    context;
    providers = [];
    constructor(context) {
        this.context = context;
        this.providers.push(vscode_1.commands.registerCommand(`${constants_1.EXT_PREFFIX}${constants_1.DOMAIN_CONTEXT}`, domainContextGenerator_1.domainContextGenerator));
    }
    boot() {
        this.providers.forEach(disposable => this.context.subscriptions.push(disposable));
    }
}
exports.DomainContextGeneratorProviders = DomainContextGeneratorProviders;
//# sourceMappingURL=domainContextGeneratorProvider.js.map