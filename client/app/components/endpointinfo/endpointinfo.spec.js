import EndpointinfoModule from './endpointinfo'
import EndpointinfoController from './endpointinfo.controller';
import EndpointinfoComponent from './endpointinfo.component';
import EndpointinfoTemplate from './endpointinfo.html';

describe('Endpointinfo', () => {
  let $rootScope, makeController;

  beforeEach(window.module(EndpointinfoModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new EndpointinfoController();
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
      expect(EndpointinfoTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = EndpointinfoComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(EndpointinfoTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(EndpointinfoController);
      });
  });
});
