import fetch from 'node-fetch'
import { FirebaseHandler } from '../FirebaseHandler.js'
import { Category } from '../Models/Category.js'

export class MathemHarvester {
    static bustCache() {
        return "?avoidCache=" + (Math.random() + "").split(".")[1];
    }

    static async getCategories() {
        let raw = await fetch(
            "https://api.mathem.io/ecom-navigation/noauth/v3/menu/10" + this.bustCache()
        );
        return await raw.json();
    }

    static async getProducts(categoryURL) {
        let raw = await fetch(
            "https://api.mathem.io/varor/" +
         categoryURL + this.bustCache() + "&size=10000"
        );
        return (await raw.json()).results;
    }

    //https://api.mathem.io/product-search/noauth/search/products/10/weeklydiscounts?size=18&index=0&storeId=10&keyword=

    static setCategory(categoryName) {
        let newCategory = new Category(categoryName);
        return newCategory;
      }

      static async getAllProducts(categories) {
    
        let allProductsOfMathem = [];
        let categoriesOfDb = await FirebaseHandler.getCategories();

        for (let i = 0; i < categories.length; i++) {
            let category = categories[i];
            let productsOfCategory = await this.getProducts(category.url);

            let categoryFromDb = ''

            for (let i = 0; i < productsOfCategory.length; i++) {
                 console.log('reached here');

                if (category.url.includes("kott-o-chark")) {
                    productsOfCategory[i].category = this.setCategory("Kött, Fågel & Chark");
                  }
                  if (category.url.includes("frukt-o-gront")) {
       
                    productsOfCategory[i].category = this.setCategory("Frukt & Grönt");
                 }
                 if (category.url.includes("mejeri-o-ost")) {
                    productsOfCategory[i].category = this.setCategory("Mejeri, Ost & Ägg");
                }
                if (category.url.includes("skafferi")) {
           
                    productsOfCategory[i].category = this.setCategory("Skafferi");
                }
                if (category.url.includes("brod-o-bageri")) {
         
                    productsOfCategory[i].category = this.setCategory("Bröd & Bageri");
                }
                if (category.url.includes("fryst")) {
          
                    productsOfCategory[i].category = this.setCategory("Övrigt");
                }

                if(category.url.includes("fisk-o-skaldjur")) {
                    productsOfCategory[i].category = this.setCategory("Fisk & Skaldjur");
                }

                if (category.url.includes("vegetariska-produkter")) {
       
                    productsOfCategory[i].category =
                      this.setCategory("Övrigt");
               }
               if (category.url.includes("glass-godis-o-snacks")) {
         
                    productsOfCategory[i].category = this.setCategory(
                  "Glass, Godis & Snacks"
                );
             }
             if (category.url.includes("juice--saft-o-fruktdryck")) {
        
          
                productsOfCategory[i].category = this.setCategory(
                  "Dryck"
                );
             }

             if (category.url.includes("fardigmat-o-halvfabrikat")) {
         
                productsOfCategory[i].category = this.setCategory(
                  "Färdigmat & Sallader"
                );
             }

             if (category.url.includes("barn")) {
          
                productsOfCategory[i].category = this.setCategory(
                  "Barn"
                );
             }

             if (category.url.includes("blommor-o-vaxter")) {
         
                productsOfCategory[i].category =
                  this.setCategory("Blommor & Växter");
             }

             if (category.url.includes("hem")) {
          
          
                productsOfCategory[i].category = this.setCategory("Hem & Hushåll");
             }

             if (category.url.includes("personvard-o-halsa")) {
         
                productsOfCategory[i].category =
                  this.setCategory("Skönhet & Hälsa");
            }
            if (category.url.includes("apotek-o-halsa")) {
         
                productsOfCategory[i].category = this.setCategory("Skönhet & Hälsa");
             }

             if (category.url.includes("tobak")) {
        
                productsOfCategory[i].category =
                  this.setCategory("Kiosk & Tidningar");
             }

             if (category.url.includes("tandare")) {
                productsOfCategory[i].category =
                  this.setCategory("Kiosk & Tidningar");
             }

             if (category.url.includes("lotter")) {
                productsOfCategory[i].category =
                  this.setCategory("Kiosk & Tidningar");
             }


          }
                  allProductsOfMathem.push(productsOfCategory);

            }

            return allProductsOfMathem;
        }
    
    }

     



