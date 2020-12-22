import { DevMiddleware } from './dev.middleware';

describe('DevMiddleware', () => {
  it('should be defined', () => {
    expect(new DevMiddleware()).toBeDefined();
  });
});
