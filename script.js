import crypto from "crypto";

function generateRandom(size){
    return new Promise((resolve, reject) => {
        crypto.randomBytes(size, (err, hash) => {
            if (err){
                reject({
                    type: "internal"
                    , err: err
                });
            } else {
                resolve(hash.toString("base64"));
            };
        });
    });
};

generateRandom(756).then((result) => {console.log(result)});

// module.exports = generateRandom;
