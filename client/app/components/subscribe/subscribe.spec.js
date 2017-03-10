import SubscribeModule from './subscribe'
import SubscribeController from './subscribe.controller';
import SubscribeComponent from './subscribe.component';
import SubscribeTemplate from './subscribe.html';

describe('Subscribe', () => {
  let $rootScope, makeController;

  beforeEach(window.module(SubscribeModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new SubscribeController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(SubscribeTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = SubscribeComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(SubscribeTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(SubscribeController);
      });
  });
});
