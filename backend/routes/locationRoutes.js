const express = require('express');
const router = express.Router();
const {
    createLocation,
    getLocations,
    getLocationById,
    updateLocation,
    deleteLocation,
    uploadImage
} = require('../controllers/locationController');

router.post('/', createLocation);
router.get('/', getLocations);
router.get('/:id', getLocationById);
router.put('/:id', updateLocation);
router.delete('/:id', deleteLocation);

const upload = require('../config/multer');
router.post('/:id/images', upload.single('image'), uploadImage);

module.exports = router;