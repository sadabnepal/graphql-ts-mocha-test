import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(process.cwd(), "test", "env", `.env.${process.env.ENV}`) })

export const URL = process.env.URL as string;