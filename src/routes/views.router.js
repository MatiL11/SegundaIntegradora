const { Router } = require("express");
const viewControllers = require("../DAO/Managers/views.manager");

const router = Router();

router.get("/products", viewControllers.views);
router.get("/carts/:cid", viewControllers.viewCart);
router.get("/", viewControllers.login);
router.get("/register", viewControllers.register);
router.get("/profile", viewControllers.profile);
router.get("/logout", viewControllers.logout);
router.get("/forgot-password", viewControllers.forgot);

module.exports = router;
