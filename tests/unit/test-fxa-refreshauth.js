define([
  'jquery',
  'utils',
  'models/session',
  'views/app',
  'views/force-auth'
], function($, utils, SessionModel, AppView, ForceAuthView) {

  suite('FxA refreshAuthentication tests', function() {

    setup(function(){
      app = new AppView();
      this.stub = sinon.stub();
      this.oldid = navigator.mozId;
      if (navigator.mozId === undefined) {
        navigator.mozId = {request: this.stub};
      };
      this.view = new ForceAuthView();
      this.fxaFlag = sinon.stub(utils, 'supportsNativeFxA', function() {return true;});
    });

    teardown(function(){
      navigator.mozId = this.oldid;
      this.fxaFlag.restore();
    });

    test('Check that forceAuthRequest calls FxA with refreshAuthentication', function(){
      this.view.forceAuthRequest()
      sinon.assert.calledWith(this.stub, sinon.match({refreshAuthentication: 0}));
    });
  });
});
