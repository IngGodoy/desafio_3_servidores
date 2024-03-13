import express from "express";
import ProductManager from "./manager/productManager.js"

const productsManager = new ProductManager('./src/manager/products.json');

const app = express();
const PORT = 8080;
app.use(express.json());
app.listen(PORT, ()=> console.log("server ok on port: " + PORT));

app.get("/api/products/", async (request, response)=>{

    const {limit} = request.query

    try{
        const products = await productsManager.getProducts();
        
        if(limit <= products.length && limit > 0 ){
            const newProducts =[];
            for (let i = 0; i < limit; i++) {
                newProducts.push(products[i]);
              };
            response.status(200).json(newProducts);
        }else{
            response.status(200).json(products);
        };    
    }catch (error){
        response.status(500).json(error.message);
    };
});

app.get("/api/products/:pid", async (request, response)=>{

    const {pid} = request.params;

    try{
        const productById = await productsManager.getProductById(parseInt(pid));
        
        if(productById === "Not found"){
            response.status(400).json(productById)
        }else{
            response.status(200).json(productById);
        }
   
    }catch (error){
        response.status(500).json(error.message);
    };
});