import {Component, CacheEvict, Cacheable} from "@sklechko/framework";

@Component()
export class CacheableService {
    
    @Cacheable('model')
    async getModel(id: string): Promise<any> {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve("Returns the model for the given id!");
            }, 5000);
        });
    }
    
    @CacheEvict('model', true)
    async deleteModel(id: string): Promise<any> {
        return "The todo with the given id was deleted";
    }
}