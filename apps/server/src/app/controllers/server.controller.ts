// import { environment } from '../../environment/environment';
import packageFile from '../../../../../package.json';
import { Response, NextFunction, Request } from 'express';
// import { logger } from '../middleware/logger.middleware';
import * as os from 'os';
/**
 * GET /healthcheck
 * Returns the process uptime value.
 */
export const healthcheck = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ uptime: process.uptime() });
    } catch(error) {
        //logger.error(error);
        res.status(500).json({ error: error.toString() });
    }
};

export const hostname = (req: Request, res: Response) => {
    try {
        res.status(200).json({ hostname: os.hostname() });
    } catch(error) {
        //logger.error(error);
        res.status(500).json({ error: error.toString() });
    }
};

/**
 * GET /server/version
 * Returns the server version in the package.json file.
 */
export const version = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ version: packageFile.version || '' });
    } catch (error) {
        //logger.error(error);
        res.status(500).json({ error: error.toString() });
    }
};

export const splashPage = (db) => (req: Request, res: Response) => {
    db.collection('courses').find({}).toArray()
        .then(results => {
            res.render('index', {
                title: 'Home',
                courses: results
            });
        })
        .catch(error => {
            console.error(error);
            res.json({tutorials: []}).status(500);   
        })
    }