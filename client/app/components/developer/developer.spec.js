import DeveloperModule from './developer'
import DeveloperController from './developer.controller';
import DeveloperComponent from './developer.component';
import DeveloperTemplate from './developer.html';

describe('Developer', () => {
  let $rootScope, makeController;

  beforeEach(window.module(DeveloperModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new DeveloperController();
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
      expect(DeveloperTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = DeveloperComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(DeveloperTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(DeveloperController);
      });
  });
});
