import { exec } from 'child_process';
import { promisify } from 'util';
import { log } from './8-logs';

const execAsync = promisify(exec);

export async function killDpAgent(): Promise<boolean> {
    try {
        log('Stopping DPAgent...');

        // Using taskkill /IM DPAgent.exe /F
        await execAsync('taskkill /IM DPAgent.exe /F');
        log('DPAgent stopped.');
        
        await new Promise(r => setTimeout(r, 1000));
    } catch (e: any) {
        if (e.message && e.message.includes('not found')) {
            log('DPAgent not running.');
            return true;
        } else {
            log(`Error stopping DPAgent: ${e.message}`);
            return false;
        }
    }
    return true;
}
