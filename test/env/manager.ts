import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(process.cwd(), 'test', 'env', `${process.env.ENV}.env`) });

export const URL = process.env.URL as string;