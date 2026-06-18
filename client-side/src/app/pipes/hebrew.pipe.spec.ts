import {hebrewPipe } from './hebrew.pipe';

describe('Pipe1Pipe', () => {
  it('create an instance', () => {
    const pipe = new hebrewPipe();
    expect(pipe).toBeTruthy();
  });
});
