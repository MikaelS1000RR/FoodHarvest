export class Scrubber {

    static sleep(ms) {
        return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

    static async scrubOne(product) {
       let scrubbed = {};
        let tschema = this.translateSchema;
          console.log("scrubbing product with code ", product.code);
        for (let key in tschema) {
         
           let scrubFunc = tschema[key];
           scrubbed[key] = await scrubFunc(product);
          
       }
       return scrubbed;
    }

    // Scrub a whole array of products
    static async scrubAll(products) {
            
        let scrubbed = [];
        
        for (let product of ) {
            if (scrubbed.length % 500 === 0 && scrubbed.length>0) {
                 console.log("before sleep");
                await this.sleep(5 * 60 * 1000)
                console.log('after sleep');
            }
             
                try {
                    scrubbed.push(await this.scrubOne(product));
                }
                catch (ex) {
                    console.log(ex);;
                }
            


            }
            console.log('scrubbing products done!');
            return scrubbed;
        }
}