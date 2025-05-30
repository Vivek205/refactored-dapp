// package: vits
// file: t_glm.proto

var t_glm_pb = require("./t_glm_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var VITSTrainingService = (function () {
  function VITSTrainingService() {}
  VITSTrainingService.serviceName = "vits.VITSTrainingService";
  return VITSTrainingService;
})();

VITSTrainingService.inference = {
  methodName: "inference",
  service: VITSTrainingService,
  requestStream: false,
  responseStream: false,
  requestType: t_glm_pb.InferenceRequest,
  responseType: t_glm_pb.InferenceResponse,
};

exports.VITSTrainingService = VITSTrainingService;

function VITSTrainingServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

VITSTrainingServiceClient.prototype.inference = function inference(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(VITSTrainingService.inference, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    },
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    },
  };
};

exports.VITSTrainingServiceClient = VITSTrainingServiceClient;
