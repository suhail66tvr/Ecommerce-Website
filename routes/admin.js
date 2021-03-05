var express = require('express');
const productsHelpers = require('../helpers/products-helpers');
var router = express.Router();
  // var productsHelper=require('../helpers/products-helpers');
const { response } = require('express');
/* GET users listing. */
router.get('/', function(req, res, next) {
  productsHelpers.getAllProducts().then((products)=>{
    console.log(products);
  res.render('admin/view-products',{admin:true,products})
  })
  
});
router.get('/login',(req,res)=>{
  res.render('admin/login')
})
router.get('/signup',(req,res)=>{
  res.render('admin/signup')
})  
router.post('/signup',(req,res)=>{
  adminHelpers.adminSignup(req.body).then((response)=>{
    console.log(response);
  })
})
// router.post('/login',(req,res)=>{ 
//   adminHelpers.adminLogin(req.body)
// })

router.get('/add-products',function(req,res){
  res.render('admin/add-products')
})
router.post('/add-products',(req,res)=>{
  productsHelpers.addProduct(req.body,(id)=>{
    let Image=req.files.Image
    console.log(id);
    Image.mv('./public/product-Images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render("admin/add-products")
      }else{
        console.log(err);
      }
    })
      
  })

})
router.get('/delete-product/:id',(req,res)=>{
    let proId=req.params.id
    console.log(proId);
    productsHelpers.deleteProduct(proId).then((response)=>{
      res.redirect('/admin/')
    })
})

router.get('/edit-product/:id',async (req,res)=>{
  let product=await productsHelpers.getProductDetails(req.params.id)
  console.log(product);
  res.render('admin/edit-product',{product})
})
router.post('/edit-product/:id',(req,res)=>{
  console.log(req.params.id);
  let id=req.params.id
  productsHelpers.UpdateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
    if(req.files.Image){
      let Image=req.files.Image
      Image.mv('./public/product-Images/'+id+'.jpg')
    }
  })
})
module.exports = router;
