import {Component, Qualifier} from "@sklechko/framework";
import { I_CACHE_PROVIDER_TOKEN, ICacheProvider } from "@sklechko/framework/lib/processors/cache/ICacheProvider";
var redis = require('redis');

@Qualifier(I_CACHE_PROVIDER_TOKEN)
@Component()
export class RedisCacheProvider implements ICacheProvider{

    private client;
    private caches: Map<string, number>;

    constructor () {
        this.caches = new Map();
        this.client = redis.createClient();
    }

    async get(key, cacheName): Promise<any> {
        await this.getCache(cacheName);
        let result = await this.getPromise(this.client, this.client.get, key);
        return JSON.parse(result);
    }
    async set(key, result, cacheName): Promise<any> {
        await this.getCache(cacheName);
        return await this.getPromise(this.client, this.client.set, [key, JSON.stringify(result)]);
    }

    async flushdb(cacheName): Promise<any> {
        await this.getCache(cacheName);
        this.client.flushdb();
    }
    
    async del(key, cacheName): Promise<any> {
        await this.getCache(cacheName);
        this.client.del(key);
    }

    private async getCache(cacheName: string) {
        let cacheNumber: number = this.caches.get(cacheName);
        if(cacheNumber === undefined) {
            cacheNumber = this.createNewCache();
            this.caches.set(cacheName, cacheNumber);
        }
        await this.getPromise(this.client, this.client.select, cacheNumber);
    }

    private createNewCache() {
        let max = 0;
        let cacheIter = this.caches.values();
        while(true) {
            let value = cacheIter.next().value;
            if(value === undefined) break;
            max++;
        }
        return max;
    }

    private getPromise(thisArg, method, ...args): Promise<any> {
        return new Promise((resolve, reject) => {
            let callback = function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            };

            args.push(callback);
            Reflect.apply(method, thisArg, args);
        });
    }
}