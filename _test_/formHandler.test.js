import { TestScheduler } from 'jest'
import { checkAgreement } from '../src/client/js/formHandler'
import { checkSubjectivity } from '../src/client/js/formHandler'


// Testing the check agreement result
describe ('Testing result of agreement', () => {
    test('result must be agreement', () => {
        const data = 'AGREEMENT';
        const response = "agreement (the different elements have the same polarity)";
        expect(checkAgreement(data)).toEqual(response);
    });
})

// Testing the check disagreement result
describe ('Testing result of agreement', () => {
    test('result must be disagreement', () => {
        const data = 'DISAGREEMENT';
        const response = "disagreement (there is disagreement between the different elements' polarity)";
        expect(checkAgreement(data)).toEqual(response);
    });
})

// Testing the check subjectivity result
describe ('Testing result of subjectivity', () => {
    test('result must be objective', () => {
        const data = 'OBJECTIVE';
        const response = "ojective (the text does not have any subjectivity marks)";
        expect(checkSubjectivity(data)).toEqual(response);
    });
})

// Testing the check subjectivity result
describe ('Testing result of subjectivity', () => {
    test('result must be ', () => {
        const data = 'SUBJECTIVE';
        const response = "subjective (the text has subjective marks)";
        expect(checkSubjectivity(data)).toEqual(response);
    });
})