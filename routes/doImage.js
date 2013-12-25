/**
 * Created by root on 13-12-24.
 */
var fs=require('fs'),
  gm=require('gm'),
    formidable=require('formidable');
    im= gm.subClass({ imageMagick : true });
function cropImage(req,res){
    console.log(req);
    console.log(req.body);
    var form = new formidable.IncomingForm();
    form.parse(req, function(error, fields, files) {
        console.log("parsing done");
        var tmpPath=files.myfile.path;
        var name=files.myfile.name;
      fs.rename(tmpPath,'./public/images/'+name,function(err){
        if(err){
            console.log(err);
        } else{
            im('./public/images/'+name).crop(100, 100, 2, 2).autoOrient()
            .write('./public/images/'+name,function(err){
                res.send({code:0,result:'./images/'+name});
          })
        }
      })
//
//        im('../public/images/testImages.jpg').crop(100, 100, 2, 2).autoOrient()
//            .write('./public/images/2.jpg',function(err){
//                console.log("--->",err);
//                res.send({code:0});
//          })
    });



}
exports.cropImage=cropImage;