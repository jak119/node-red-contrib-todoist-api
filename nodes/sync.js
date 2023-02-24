module.exports = function (RED) {
  var todoistSync = require("../lib/todoist-sync");
  function TodoistSyncAPI(config) {
    RED.nodes.createNode(this, config);

    var node = this;

    var token = RED.nodes.getNode(config.token).credentials.token;

    node.on("input", function (msg) {
      var options = {
        token,
        data: msg.payload || {}
      };
      todoistSync(options)
        .then(function (response) {
          msg.payload = response;
          msg.response = response;
          node.send(msg);
          node.status({ fill: "green", shape: "dot", text: "Success" });
        })
        .catch((error) => {
          msg.payload = error;
          msg.response = error;
          node.send(msg);
          node.status({ fill: "red", shape: "dot", text: "API Error" });
        });
    });
  }
  RED.nodes.registerType("todoist-sync-api", TodoistSyncAPI);
};
