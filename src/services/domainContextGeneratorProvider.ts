import { ExtensionContext, commands, Disposable } from 'vscode';
import { DOMAIN_CONTEXT, EXT_PREFFIX } from '../utils/constants';
import { domainContextGenerator } from './domainContextGenerator';
export class DomainContextGeneratorProviders {
    providers: Disposable[] = [];
    constructor(private context: ExtensionContext) {
        this.providers.push(
            commands.registerCommand(`${EXT_PREFFIX}${DOMAIN_CONTEXT}`, domainContextGenerator)
        );
    }

    public boot(): void {
        this.providers.forEach(disposable => this.context.subscriptions.push(disposable));
    }
}