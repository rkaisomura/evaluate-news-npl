import { checkForUrl } from "../src/client/js/urlChecker"

//Testing a valid URL
describe("Check a valid URL", () => {
    test('Testing a valid URL', () => {
        const inputUrl = 'https://www.udacity.com';
        const response = 1;
        expect(checkForUrl(inputUrl)).toEqual(response);
    });
});

//Testing an invalid URL
describe("Check an invalid URL", () => {
    test('Testing an invalid URL', () => {
        const inputUrl = 'udacity.com';
        const response = 0;
        expect(checkForUrl(inputUrl)).toEqual(response);
    });
});