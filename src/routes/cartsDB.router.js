const { Router } = require("express");
const cartsControllerBd = require("../DAO/Managers/carts.manager");

const router = Router();

router.post("/", cartsControllerBd.createCarts);
router.get("/", cartsControllerBd.bdgetCarts);
router.get("/:cid", cartsControllerBd.bdgetCartId);
router.put("/:cid/", cartsControllerBd.updateCart);
router.delete("/:cid/", cartsControllerBd.deleteAllProductsCart);
router.post("/:cid/product/:pid", cartsControllerBd.addProductToCart);
router.delete("/:cid/product/:pid", cartsControllerBd.deleteProductToCart);
router.put("/:cid/product/:pid", cartsControllerBd.updateQuantityOnCart);

module.exports = router;
