export class Scrubber {
    static async scrubOne(product) {
       let scrubber = {};
       let tschema = this.translateSchema;
       for (let key in tschema) {
           let scrubFunc = tschema[key];
           scrubbed[key] = await scrubFunc(product);
       }
       return scrubbed;
    }

        // Scrub a whole array of products
        static async scrubAll()
}