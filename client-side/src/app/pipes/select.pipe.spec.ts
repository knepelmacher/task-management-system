import { selectPipe } from './select.pipe';

describe('Pipe2Pipe', () => {
  it('create an instance', () => {
    const pipe = new selectPipe();
    expect(pipe).toBeTruthy();
  });
});
