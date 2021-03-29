var mysql = require('./database.js').pool;
module.exports = function(app) {
    async function doingQuery(sql,category,uid){
        try {
            const products = category!='all'?await mysql.query(sql,[category,uid]):await mysql.query(sql,[[[uid]]]);
            var finalList=[]
            for(var i = 0;i< products.length;i++){
               var imgList = [];
               var variants=[];
               const quertImgList = await mysql.query('SELECT * FROM images WHERE productID =? ',[[[products[i].productId]]]);
               imgList=[...quertImgList];
               const queryVariants= await mysql.query('SELECT * FROM variants WHERE productId =? ',[[[products[i].productId]]]);
               for(var j = 0;j< queryVariants.length;j++){
                  const queryOptions = await mysql.query('SELECT * FROM options WHERE VId= ? ',[[[queryVariants[j].VId]]]);
                  variants.push({variant:queryVariants[j],options:queryOptions })
                }
               finalList.push({product:products[i],imgs:imgList,variants:variants})
            }
            
          
               return finalList;
            }
        catch (error) {
                console.log(error)
                return "error"
            }
    }
    

    
    app.post('/PageSellerProduct', async function (req, res) {
        const id =   req.body.lastID;
        const uid =   req.body.uid;
        console.log(id)
        const category = req.body.category;
        console.log(id)
        const products  = await doingQuery('SELECT * FROM products WHERE productId < '+id+' AND category = ? AND uid =? ORDER BY productId DESC LIMIT 15',[category],[uid]);
        var list={}
        list[category ] = {list:[],ifFinishLoad:false};
        list[category ].list = products;
        list[category ].ifFinishLoad = products.length<15?true:false;
        res.send({msg:list}) 
    })
    app.post('/querySellerProduct', async function (req, res) {
        const uid = req.body.uid;
        const categoryList=['all','drink','meat','vege','seafood','hotpot','snack','cig&alcohol','fruit']
        var list ={}
        for(const ele of categoryList){
            const reslist = ele!='all'?await doingQuery(`SELECT * FROM products WHERE category = ? AND uid = ? ORDER BY productId DESC LIMIT 15 `,ele,uid):await doingQuery(`SELECT * FROM products WHERE uid = ? ORDER BY productId DESC LIMIT 15 `,ele,uid);
            console.log(reslist)
            list[ele] = {list:[],ifFinishLoad:false};
            list[ele]['list'] = reslist;
            list[ele]['ifFinishLoad'] = reslist.length<15?true:false;
        }
       
        res.send({msg:list})
    })
    app.post('/querySingleProduct', async function (req, res) {
        const id = req.body.id;
        console.log(id+'111111111111111111111111111111111111')
        const result =  await querySingleProduct(id);
        console.log(result)
        res.status(200).send({msg:result})
    
    })
 

 
}