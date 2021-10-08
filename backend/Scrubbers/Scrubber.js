export class Scrubber {

    static sleep(ms) {
        return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

    static async scrubOne(product) {
       let scrubbed = {};
        let tschema = this.translateSchema;
        for (let key in tschema) {
         
           let scrubFunc = tschema[key];
           scrubbed[key] = await scrubFunc(product);
          
       }
       return scrubbed;
    }

    // Scrub a whole array of products
    static async scrubAll(products) {
            
        let scrubbed = [];
        
        for (let product of products) {
              
                try {
                    scrubbed.push(await this.scrubOne(product));
                }
                catch (ex) {
                }
            
            

            }
            return scrubbed;
        }
}