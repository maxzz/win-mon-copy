import * as path from 'path';
import { log } from './8-logs';
import { killDpAgent } from './7-kill-dp-agent';
import { copyFileToBin } from './6-copy-file-to-bin';

export async function copyFilesLogic(mode: string, sourcePaths: string[]) {
    log(`Starting copy in ${mode} mode...`);
    
    let bIsWin32 = false;
    let bIsWin64 = false;
    let bDpAgentIsDead = false;

    for (const sourcePath of sourcePaths) {
        const sPath = sourcePath.trim();
        if (!sPath) continue;

        if (sPath.endsWith('Win32')) {
            bIsWin32 = true;
            if (!bDpAgentIsDead) {
                await killDpAgent();
                bDpAgentIsDead = true;
            }

            const programsFolder = process.env['ProgramFiles(x86)'] || process.env['ProgramFiles'];
            const binFolder = path.join(programsFolder!, "DigitalPersona\\Bin");
            
            log(`From ${sPath} to ${binFolder}`);
            
            for (const sFileName of win32Files) {
                await copyFileToBin(sPath, sFileName, binFolder);
            }

        } else if (sPath.endsWith('x64')) {
            bIsWin64 = true;
            if (!bDpAgentIsDead) {
                await killDpAgent();
                bDpAgentIsDead = true;
            }

            const programsFolder = process.env['ProgramFiles'];
            const binFolder = path.join(programsFolder!, "DigitalPersona\\Bin");

            log(`From ${sPath} to ${binFolder}`);

            for (const sFileName of x64Files) {
                await copyFileToBin(sPath, sFileName, binFolder);
            }
        } else {
             log(`Skipping path ${sPath}: must end with 'Win32' or 'x64'.`);
        }
    }
    
    if (!bIsWin32 && !bIsWin64) {
        log("Usage - path to the source directory must end with 'Win32' or 'x64'.");
    }
    
    log('Done.');
}

const win32Files = [
    "DpAgent.exe",
    "DpFbView.dll",
    "DpOFeedb.dll",
    "DpoPS.dll",
    "DpoSet.dll",
    "DPPMAdminConsole.exe",
    "DpoSetA.dll",
    "DpoTrain.dll",
    "DpoTrainMgr.dll",
    "DpStgCat.dll"
];

const x64Files = [
    "DpAgentOtsPlugin.dll",
    "DpAgentOtsPlugin.WebSdk.dll",
    "DpFbView.dll",
    "DpImporter.dll",
    "DpMiniDS.dll",
    "DpOCache.dll",
    "DpOFeedb.dll",
    "DpOnlineIDs.dll",
    "DpoPS.dll",
    "DpoSet.dll",
    "DpOtsMsg.dll",
    "DpUtt.dll",
    "DsDashboard.dll"
];
