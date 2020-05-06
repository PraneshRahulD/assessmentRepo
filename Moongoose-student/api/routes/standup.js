const Product = require('../../models/standup')

module.exports = function(router) {
    //GET: the 12 newest stand-up meeting notes
    router.get('/product',function (req,res) {
        // res.send("hello");
        Product.find({}, (err, product)=> {
            // Check if error is found or not
            if(err) {
                res.json({ success:false, message:err}); // return error message
            }
            else{
                // check if standup is found in database
                if(!product) {
                    res.json({success:false, message: 'No Product found'}); // Return error of no standup found
                } else {
                    res.json({success:true, product: product}); // Return success and standup array
                }
            }
        })
    })

    //POST: Get new meeting note document
    router.post('/product', function(req,res) {
        let note = new Product(req.body)
        note.save(function (err,note){
            if(err){
                return res.status(400).json(err)
            }
                 res.status(200).json(note)
        })
    })

    router.put('/updateProduct', (req,res)=> {
        if(!req.body._id) {
            res.json({ success: false,message: ' No Product is Provided'});
        } else {
            Product.findOne({_id: req.body._id}, (err,product)=> {
                if(err){
                    res.json({ success: false,message : 'Not a valid product id'});
                } else {
                    product.productName = req.body.productName;
                    product.productDesc = req.body.productDesc;
                    product.manufacDate= req.body.manufacDate;
                    product.productPrice = req.body.productPrice;
                    product.expDate = req.body.expDate;
                    product.barcode = req.body.barcode;
                    product.save((err) => {
                        if (err) {
                            res.json({ success: false,message:err});
                        } else{
                            res.json({ success: true,message: 'product Updated'});
                        }
                    });
                }
            });
        }
    });



router.delete('/deleteProduct/:id', (req,res) => {
    // Check if ID was provided in parameters
    if(!req.params.id){
        res.json({ success: false,message: 'No id is provided'}); // return error message
    } else {
        // check if id is found in database
    Product.findOne({_id:req.params.id}, (err, product)=> {
        // Check if error is found or not
        if(err) {
            res.json({ success:false, message:'Invalid ID'}); // return error message
        }
        else{
            // Remove the standup from database
            product.remove((err) =>{
            if(err) {
                res.json({success:false, message: err}); // Return error Message
            } else {
                res.json({success:true, standup:'Product Deleted'}); // Return success message
            }
        });
    }
});
    }
});
}
