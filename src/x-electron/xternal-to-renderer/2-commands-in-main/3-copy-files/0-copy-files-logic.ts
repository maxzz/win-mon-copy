import * as path from 'path';
import { log } from './8-logs';
import { killDpAgent } from './7-kill-dp-agent';
import { copyFileToBin } from './6-copy-file-to-bin';

export async function copyFilesLogic(mode: string, sourcePaths: string[]) {
    log(`Starting copy in ${mode} mode...`);

    let hasWin32 = false;
    let hasWin64 = false;
    let bDpAgentIsDead = false;

    for (const sourcePath of sourcePaths) {
        const sPath = sourcePath.trim();
        if (!sPath) continue;

        const isWin32 = sPath.endsWith('Win32');
        const isWin64 = sPath.endsWith('x64');

        if (!isWin32 && !isWin64) {
            log(`Skipping path ${sPath}: must end with 'Win32' or 'x64'.`);
            continue;
        }

        !bDpAgentIsDead && (bDpAgentIsDead = await killDpAgent());

        const programsFolder = isWin32 ? process.env['ProgramFiles(x86)'] : process.env['ProgramFiles'];
        const binFolder = path.join(programsFolder!, "DigitalPersona\\Bin");
        const copyFiles = isWin32 ? win32Files : x64Files;

        log(`From ${sPath} to ${binFolder}`);

        for (const sFileName of copyFiles) {
            await copyFileToBin(sPath, sFileName, binFolder);
        }

        isWin32 && (hasWin32 = true);
        isWin64 && (hasWin64 = true);
    }

    if (!hasWin32 && !hasWin64) {
        log("Usage - path to the source directory must end with 'Win32' or 'x64'.");
        return;
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
