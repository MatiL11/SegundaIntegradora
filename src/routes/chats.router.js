const { Router } = require("express");
const chatsController = require("../DAO/Managers/viewschat.manager");

const router = Router();

router.get("/", chatsController.getsendMessage);
router.post("/", chatsController.sendMessage);
router.delete("/:chid", chatsController.deleteMessage);

module.exports = router;
