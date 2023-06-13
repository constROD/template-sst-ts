# IMPORTANT NOTE

Please ensure that your `scripts` do not contain any abstract code from the Serverless Stack Toolkit (SST) or similar libraries. For instance, instead of using `Config` from SST, make use of a `.env` file to manage your configurations.

To run your scripts, you may use a command such as `ts-node -r tsconfig-paths/register ./src/scripts/seed.ts`. This will work perfectly as long as the script, and any imports within the script, do not involve any abstracts from SST.
