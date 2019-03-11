import { CollectionConstants, GeneralConstants } from '../../projects/shared-library/src/lib/shared/model';
import admin from '../db/firebase.client';
import { Utils } from '../utils/utils';

export class StatsService {

    private static statsFireStoreClient = admin.firestore();

    /**
     * getSystemStats
     * return systemstat
     */
    static async getSystemStats(statName: string): Promise<any> {
        try {
            const systemStat = await StatsService.statsFireStoreClient
                .doc(`${CollectionConstants.STATS}/${statName}`)
                .get();
            return systemStat.data();
        } catch (error) {
            return Utils.throwError(error);
        }
    }

    /**
     * setSystemStats
     * return ref
     */
    static async setSystemStats(statName: string, SystemStat: any): Promise<any> {
        try {
            return await StatsService.statsFireStoreClient
                .doc(`${CollectionConstants.STATS}/${statName}`)
                .set(SystemStat);
        } catch (error) {
            return Utils.throwError(error);
        }
    }
}
