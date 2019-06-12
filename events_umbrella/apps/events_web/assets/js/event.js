import socket from "./socket";
import * as $ from "jquery";

(function() {
  let id = $("#id").data("id");
  if (!id) return;
  let channel = socket.channel("event:" + id, {});
  channel.on("update_quantity", event => {
    console.log("update_quantity " + event);
    $("#seats-left span").text(event.quantity);
  });
  channel
    .join()
    .receive("ok", resp => {
      console.log("event " + id + " joined", resp);
    })
    .receive("error", resp => {
      console.log("unable to join", resp);
    });
})();
