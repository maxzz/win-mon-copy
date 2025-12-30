import * as fs from 'fs';
import * as path from 'path';
import { log } from './8-logs';

export async function copyFileToBin(sourcePath: string, sFileName: string, sDestPath: string) {
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
