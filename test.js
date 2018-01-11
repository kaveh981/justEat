describe('justEat list of restaurants', function () {

    describe('When outcode is correct', function () {
        let result = null;
        beforeEach(function (done) {
            fetchResturantsService('se19').then((res) => {
                result = res;
                done();
            });
        });
        it(`The result of api call should be a list that it's length is greater than 0`, function () {
            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('When outcode is not passed', function () {
        let result = null;
        beforeEach(function (done) {
            fetchResturantsService().then((res) => {
                result = res;
                done();
            }).catch(error => {
                result = error.message
                done();
            });
        });
        it(`It should return an error message: 'outcode not provided'`, function () {
            expect(result).toEqual('outcode not provided');
        });
    });

    describe('When outcode is invalid (%%%%)', function () {
        let result = null;
        beforeEach(function (done) {
            fetchResturantsService('%%%%').then((res) => {
                result = res;
                done();
            }).catch(error => {
                result = error.message
                done();
            });
        });
        it(`It should return an error message: '400'`, function () {
            expect(result).toEqual('400');
        });
    });
    
});