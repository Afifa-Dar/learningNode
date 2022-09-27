const Qrcode = require('qrcode')
const QrCodeReader = require('qrcode-reader')
const express = require('express')
const Jimp = require('jimp')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.set("view engine" , "pug")

app.get("/" , ( req , res ) =>{
    res.render('generate')
})

app.post("/scan.pug" , (req , res ) => {
    const text = req.body.inputText;

    // If the input is null return "Empty Data" error
    if (text.length === 0) res.send("Empty Data!");
    
    // Let us convert the input stored in the text 
    // It shall be returned as a png image format
    
    const custom = {   // customize qrCode
        errorCorrectionLevel: 'H',
        quality: 0.95,
        //version : 5,
        margin: 1,
        color : {
            dark: '#3b82d4',
            light: '#FFF'
            }
        }
    Qrcode.toDataURL(text,custom,(err, src) => {
        if (err) res.send("Error occured");
      
        res.render("scan", { src });
    });
})
// app.post("/getText.pug" , (req , res) => {
//     const img = req.body.qrImg
//     var buffer =img
//     Jimp.read(buffer, function(err, image) {
//         if (err) {
//             console.error(err);
//             // TODO handle error
//         }
//         var qr = new QrCodeReader();
//         qr.callback = function(err, value) {
//             if (err) {
//                 console.error(err);
//                 // TODO handle error
//             }
//             console.log(value.result);
//             console.log(value);
//         };
//         qr.decode(image.bitmap);
//     });
// })
app.listen(3000 , () => console.log("listen..."))