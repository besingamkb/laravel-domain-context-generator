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

export const domainContextGenerator = async (extContext: ExtensionContext) => {
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
                createLaravelModel(extContext, domainContext, contextPath);
            }
            
        }
    } catch (err) {
        console.log(err)
    }
}

export const createLaravelModel = (extContext: ExtensionContext, context: string, contextPath: string) => {
    const contextToUpperCase = capitalizeString(context);
    const newModelFile = path.join(contextPath, context + ".php");
    const extPath = extContext.extensionPath;

    try {
        logify.log(extPath);
        const extAbsPath = extContext.asAbsolutePath('src/stub/laravel-model.stub');
        logify.log("extAbsPath: ", extAbsPath)
        const data = fs.readFileSync(extAbsPath, 'utf8');
        logify.log(data);
        const newContent = data.replace('{{ namespace }}', `App\\${contextToUpperCase}\\Models`);
        newContent.replace('{{ class }}', contextToUpperCase);
        logify.log(newContent);
        fs.writeFileSync(newModelFile, newContent);
      } catch (err: any) {
        logify.error(err);
      }
    // const contextToUpperCase = context.toUpperCase();
    // const newModelFile = path.join(contextPath, context + ".php");
    // fs.readFile('stub/laravel-model.stub', 'utf8', (err, stubData) => {
    //     if (err) throw err;
    
    //     const newContent = stubData.replace('{{ namespace }}', `App\\${contextToUpperCase}\\Models`);
    //     newContent.replace('{{ class }}', contextToUpperCase);
    

    //     fs.writeFile(newModelFile, newContent, (err) => {
    //         if (err) throw err;
    //         console.log('New file created successfully!');
    //     });
    // });
}