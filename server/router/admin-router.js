const express=require("express");
const adminController=require("../controllers/admin-controller");
const authMiddleware=require("../middlewares/auth-middleware");
const adminMiddleware=require("../middlewares/admin-middleware");


const router=express.Router();



router.route('/users').get(adminMiddleware,authMiddleware,adminController.getAllUsers);
router.route('/users/:id').get(adminMiddleware,authMiddleware,adminController.getUserById);
router.route('/users/delete/:id').delete(adminMiddleware,authMiddleware,adminController.deleteUserById);
router.route('/users/update/:id').patch(adminMiddleware,authMiddleware,adminController.updateUserById);
router.route('/contacts').get(authMiddleware,adminController.getAllContacts);
router.route('/contacts/delete/:id').delete(adminMiddleware,authMiddleware,adminController.deleteContactById);

module.exports=router;


