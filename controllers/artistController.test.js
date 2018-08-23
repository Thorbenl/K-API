

describe('testing numbers', () => {
    it('First test', () => {
        const x = 200;
        expect(x).toBe(200);
    });
    it('Second test', () => {
        const x = 400;
        const y = 200;
        expect(x+y).toBe(600);
    });
    it('Third test', () => {
        const x = 400;
        const y = 200;
        expect(x-y).toBe(200);
    });

});

