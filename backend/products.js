var mysql = require('./database.js').pool;
module.exports = function(app) {

    async function doingQuery(sql,category){
        try {
    
            const products = await mysql.query(sql,[[[category]]]);
           
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
                return "error"
            }
    }
    
    async function  querySingleProduct(id){
        try {
            const products = await mysql.query('SELECT * FROM products WHERE productId =? ',[[[id]]]);
    
            var imgList = [];
            var variants=[];
            for(var i = 0;i< products.length;i++){
               const quertImgList = await mysql.query('SELECT * FROM images WHERE productID =? ',[[[id]]]);
               imgList=[...quertImgList];
               const queryVariants= await mysql.query('SELECT * FROM variants WHERE productId =? ',[[[id]]]);
               for(var j = 0;j< queryVariants.length;j++){
                const queryOptions = await mysql.query('SELECT * FROM options WHERE VId= ? ',[[[queryVariants[j].VId]]]);
                variants.push({variant:queryVariants[j],options:queryOptions })
               }
               
            }
              console.log({product:products[0],imgs:imgList,variants:variants})
             
               return {product:products[0],imgs:imgList,variants:variants};
            }
        catch (error) {
                return "error"
            }
    
    }
    app.post('/addSeller',  function (req, res) {
        if (!req.files) {
            return res.status(500).send({ msg: "file is not found" })
        }
        console.log(req.files.file)
        // accessing the file
        const myFile = req.files.file;
        //  mv() method places the file inside public directory
        myFile.mv(`${__dirname}/public/${Date.now()}-${myFile.name}`, function (err) {
    
        });
    
    
    
    });
    app.post('/PageProduct', async function (req, res) {
        const id =   req.body.lastID;
        console.log(id)
        const category = req.body.category;
        console.log(id)
        const products  = await doingQuery('SELECT * FROM products WHERE category = ? AND productId < '+id+' ORDER BY productId DESC LIMIT 15',category);
        var list={}
        list[category ] = {list:[],ifFinishLoad:false};
        list[category ].list = products;
        list[category ].ifFinishLoad = products.length<15?true:false;
        res.send({msg:list}) 
    })
    app.post('/queryProduct', async function (req, res) {
        const categoryList=['drink','meat','vege','seafood','hotpot','snack','cig&alcohol','fruit']
        var list ={}
        for(const ele of categoryList){
            const reslist =  await doingQuery('SELECT * FROM products WHERE category = ? ORDER BY productId DESC LIMIT 15 ',ele);
            list[ele] = {list:[],ifFinishLoad:false};
            list[ele]['list'] = reslist;
            list[ele]['ifFinishLoad'] = reslist.length<15?true:false;
        }
        console.log(list)
        res.send({msg:list})
    })
    app.post('/querySingleProduct', async function (req, res) {
        const id = req.body.id;
        console.log(id+'111111111111111111111111111111111111')
        const result =  await querySingleProduct(id);
        console.log(result)
        res.status(200).send({msg:result})
    
    })
    app.post('/addProduct',  function (req, res) {
        console.log('here')
        var id='';
        var imgList=[];
        var variantList=[];
         console.log(req.body)
         mysql.query("INSERT INTO products (title,price,des,storage,unit,category,uid) VALUES ?",[[[
            req.body.title, req.body.price, req.body.des,req.body.storage,req.body.unit,req.body.category,req.body.uid
        ]]], async function(err, rows) {
            var blank =[]
         
            var myFile = req.files.file;
            if(!Array.isArray( myFile )){
                myFile = [myFile]
            }
            if(err){ res.send('failed')}
            if(rows){
                id=rows.insertId;
                for(var i = 0;i<myFile.length;i++)
                {
                  const name = `${__dirname}/public/${Date.now()}-${ myFile[i].name}`;
                  await myFile[i].mv(`${__dirname}/public/${Date.now()}-${ myFile[i].name}`)
                  imgList.push([id,name])
               };
             
                   console.log(imgList)
                    mysql.query("INSERT INTO images (productID,url) VALUES ?",[imgList], async function (err, rows) {
                        for(var i = 0;i<JSON.parse(req.body.optionList).length;i++){
                            var optionList=[];
                            const VID = uuid.v4();
                            var type = 0;
                            if(JSON.parse(req.body.optionList)[i].choices.length>0){
                                type = 1;
                                for(var j = 0;j<JSON.parse(req.body.optionList)[i].choices.length;j++){
                                    optionList.push([JSON.parse(req.body.optionList)[i].choices[j].value,JSON.parse(req.body.optionList)[i].choices[j].price,VID]);
                                }
                                await mysql.query("INSERT INTO options (value,price,VId) VALUES ?",[optionList])
                             
                                
                            }
                            console.log(VID)
                            variantList.push([VID,JSON.parse(req.body.optionList)[i].title,id,type])
                    
                        }
                
                        if(variantList.length>0)
                       { mysql.query("INSERT INTO variants (VId,title,productId,type) VALUES ?",[variantList], function(err, rows) {
                            
                            res.status(200).send({msg:'updated'})
    
                        })}
                        else{
    
                            res.status(200).send({msg:'updated'})
                        }
    
    
                    })
    
    
                
              
             
            }
    
            
       })
      
    
    
    
    })

 
}