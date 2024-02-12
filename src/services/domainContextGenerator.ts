import * as fs from 'fs';
import path from 'path';
import { ExtensionContext, extensions, window, workspace } from 'vscode';
import { logify } from '../utils/logify';
import { capitalizeString } from '../utils/utils';

export const getDomainContext = async (): Promise<string> => {
    try {
        const result = await window.showInputBox({
            prompt: "Context:",
            placeHolder: "e.g Posts, Comments, Products",
        });

        return result?.trim() || "";
    } catch (error) {
        window.showErrorMessage("Something went wrong");
        console.log(error);
        return "";
    }
}

export const domainContextGenerator = async (baseExtPath: string) => {
    const domainContext = await getDomainContext();
    logify.log(`Domain Context: ${domainContext}`);

    if (workspace.workspaceFolders && workspace.workspaceFolders.length > 1) {
        logify.error("multiple workspace folder is not yet supported.");
        return;
    }

    const currentWorkspace = workspace.workspaceFolders ?? null;
    logify.log(`Current workspace: ${currentWorkspace}`);

    try {
        if (currentWorkspace !== null) {
            const appPath = path.join(currentWorkspace[0].uri.path, "app");
            if (fs.existsSync(appPath)) {
                logify.log(`Path existed: ${appPath}`)
                const contextPath = path.join(appPath, domainContext);
                if (!fs.existsSync(contextPath)) {
                    fs.mkdirSync(contextPath);
                    logify.log(`Path created: ${contextPath}`);
                }

                logify.log("Creating laravel model...");
                createLaravelModel(baseExtPath, domainContext, contextPath);
            }
            
        }
    } catch (err) {
        console.log(err)
    }
}

export const createLaravelModel = (baseExtPath: string, context: string, contextPath: string) => {
    const contextToUpperCase = capitalizeString(context);
    const contextModelPath = path.join(contextPath, "Models");
    const newModelFile = path.join(contextModelPath, context + ".php");

    try {
        if (!fs.existsSync(contextModelPath)) {
            fs.mkdirSync(contextModelPath);
        }
        logify.log(baseExtPath);
        
        console.log(`inside domain context generator: ${baseExtPath}`);
        const laravelModelSubPath = path.join(baseExtPath,'src/stubs/laravel-model.stub');
        logify.log("laravelModelSubPath: ", laravelModelSubPath);

        const data = fs.readFileSync(laravelModelSubPath, 'utf8');
        logify.log(data);

        const newContent = data.replace('{{ namespace }}', `App\\${contextToUpperCase}\\Models`).replace('{{ class }}', contextToUpperCase);
        logify.log(newContent);
        fs.writeFileSync(newModelFile, newContent);
      } catch (err: any) {
        logify.error(err);
      }
}