import { appWindow } from "../../app/1-start-main-window/7-app-window-instance";
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

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

function log(text: string) {
    if (appWindow.wnd) {
        appWindow.wnd.webContents.send('send-to-renderer', { type: 'm2r:log-update', text });
    }
}

async function killDpAgent() {
    try {
        log('Stopping DPAgent...');
        // Using taskkill /IM DPAgent.exe /F
        await execAsync('taskkill /IM DPAgent.exe /F');
        log('DPAgent stopped.');
        await new Promise(r => setTimeout(r, 1000));
    } catch (e: any) {
        if (e.message && e.message.includes('not found')) {
            log('DPAgent not running.');
        } else {
            log(`Error stopping DPAgent: ${e.message}`);
        }
    }
}

export async function copyFilesLogic(mode: 'debug' | 'release', sourcePaths: string[]) {
    log(`Starting copy in ${mode} mode...`);
    
    let bIsWin32 = false;
    let bIsWin64 = false;
    let bDpAgentIsDead = false;

    for (const sourcePath of sourcePaths) {
        if (!sourcePath || !sourcePath.trim()) continue;
        const sPath = sourcePath.trim();

        if (sPath.endsWith('Win32')) {
            bIsWin32 = true;
            if (!bDpAgentIsDead) {
                await killDpAgent();
                bDpAgentIsDead = true;
            }

            const programs32Folder = process.env['ProgramFiles(x86)'] || process.env['ProgramFiles'];
            const bin32Folder = path.join(programs32Folder!, "DigitalPersona\\Bin");
            
            log(`From ${sPath} to ${bin32Folder}`);
            
            for (const sFileName of win32Files) {
                await copyFileToBin(sPath, sFileName, bin32Folder);
            }

        } else if (sPath.endsWith('x64')) {
            bIsWin64 = true;
            if (!bDpAgentIsDead) {
                await killDpAgent();
                bDpAgentIsDead = true;
            }

            const programs64Folder = process.env['ProgramFiles'];
            const bin64Folder = path.join(programs64Folder!, "DigitalPersona\\Bin");

            log(`From ${sPath} to ${bin64Folder}`);

            for (const sFileName of x64Files) {
                await copyFileToBin(sPath, sFileName, bin64Folder);
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

async function copyFileToBin(sourcePath: string, sFileName: string, sDestPath: string) {
    const sFullSourcePath = path.join(sourcePath, sFileName);
    const sFullDestPath = path.join(sDestPath, sFileName);

    if (!fs.existsSync(sFullSourcePath)) {
        log(`  No source file!!!: ${sFullSourcePath}`);
        return;
    }

    // Timestamp check logic from C#
    let bTimesOK = true;
    if (fs.existsSync(sFullDestPath)) {
        const sourceStat = fs.statSync(sFullSourcePath);
        const destStat = fs.statSync(sFullDestPath);
        bTimesOK = sourceStat.mtime > destStat.mtime;
    }

    if (bTimesOK) {
        try {
            // Ensure dest dir exists
            if (!fs.existsSync(sDestPath)) {
                 try {
                    fs.mkdirSync(sDestPath, { recursive: true });
                 } catch (e) {
                     log(`  Failed to create dir ${sDestPath}: ${e}`);
                     return;
                 }
            }

            fs.copyFileSync(sFullSourcePath, sFullDestPath);
            log(`  Copied ${sFullDestPath}`);
        } catch (ex: any) {
            // Check if file in use (EPERM or EBUSY)
            if (ex.code === 'EPERM' || ex.code === 'EBUSY') {
                log(`  File in use: ${sFullDestPath}`);
                renameDestFile(sDestPath, sFileName);
                // Try copy again after rename? The C# code renames and then loop continues, so yes.
                try {
                     fs.copyFileSync(sFullSourcePath, sFullDestPath);
                     log(`  Copied ${sFullDestPath} (after rename)`);
                } catch (ex2: any) {
                    log(`  Failed copying file ${sFullDestPath} (retry), error: ${ex2.message}`);
                }
            } else {
                log(`  Failed copying file ${sFullDestPath}, error: ${ex.message}`);
            }
        }
    } else {
        log(`  Same time, skipping: ${sFileName}`);
    }
}

function renameDestFile(sDestPath: string, sFileName: string) {
    const fileNameOnly = path.parse(sFileName).name;
    const extensionOnly = path.parse(sFileName).ext;
    
    // Simple rename strategy: find next available _N
    // C# logic finds max number and increments.
    
    // For simplicity, let's just try _1, _2...
    let i = 1;
    while (true) {
        const newName = `${fileNameOnly}_${i}${extensionOnly}`;
        const fullNewPath = path.join(sDestPath, newName);
        if (!fs.existsSync(fullNewPath)) {
             const fullOldPath = path.join(sDestPath, sFileName);
             try {
                fs.renameSync(fullOldPath, fullNewPath);
                log(`  Renamed locked file to ${newName}`);
             } catch (e: any) {
                 log(`  Failed to rename locked file: ${e.message}`);
             }
             break;
        }
        i++;
    }
}

