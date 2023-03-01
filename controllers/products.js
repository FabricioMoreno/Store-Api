const Product = require("../models/product")

const getAllProductsStatic = async(req,res)=>{
    const products = await Product.find({})
    res.status(200).send({products,nHits:products.length})
}

const getAllProducts = async(req,res)=>{
    const{featured,company,name,sort,fields,numericFilters}=req.query
    const queryObject={}
    if(featured){
        queryObject.featured = featured === "true"? true :false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex:name, $options:"i"}
    }
    //Numeric filters
    if(numericFilters){
        const operatorMap = {
            ">":"$gt",
            ">=":"$gte",
            "=":"e",
            "<":"$lt",
            "<=":"$gte",
            
        }
        const regEX = /\b(>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEX,(match)=>`-${operatorMap[match]}-`)

        const options = ["price","rating"]
        console.log(filters)
        filters.split(",").forEach(item=>{
            const [field,operator,value] = item.split("-")
            if(options.includes(field)){
                queryObject[field]={[operator]:Number(value)}
            }
        })
    }

    let result = Product.find(queryObject)
    //sort
    if(sort){
        result= result.sort(sort.trim().replace(","," "))
    }else{
        result= result.sort("createdAt")
    }

    //fields
    if(fields){
        result = result.select(fields.trim().replace(","," "))
    }
    //pagination
    const limit = Number(req.query.limit) || 10
    const page = Number(req.query.page) || 1
    const skip = (page-1)*limit

    result = result.skip(skip).limit(limit)
    
    const products = await result

    res.status(200).send({products,nHits:products.length})
}



module.exports = {
    getAllProductsStatic,
    getAllProducts
}