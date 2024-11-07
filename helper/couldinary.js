const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dw0ostend',
    api_key: '313394446785428',
    api_secret: '-P_apg7O1b0AVsbEFx_pIbOmPPA' // Click 'View API Keys' above to copy your API secret
});

exports.cloudUpload = async (path) => {

    try {
        const options = { use_filename: true, unique_filename: true, folder: 'yogesh' }
        const result = await cloudinary.uploader.upload(path, options)
        return result
    } 
    catch (error) {
        console.log(error)
    }

}