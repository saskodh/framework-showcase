import {Component, CacheEvict, Cacheable, CachePut} from "@sklechko/framework";

@Component()
export class CacheableService {
    
    @Cacheable({ cacheName: 'model', key: '#third.prop' })
    async getModel(id: string, second, third): Promise<any> {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve("Returns the model for the given id!");
            }, 5000);
        });
    }
    
    @CacheEvict({ cacheName: 'model', allEntries: false, key: '#id' })
    async deleteModel(id: string): Promise<any> {
        return "The todo with the given id was deleted";
    }

    @CachePut({ cacheName: 'model', key: '#second.prop' })
    async getModelPut(id: string, second): Promise<any> {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve("Returns the model for the given id and sets it in the cache!");
            }, 5000);
        });
    }
}