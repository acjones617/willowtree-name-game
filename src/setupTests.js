import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import fetch from 'jest-fetch-mock';

global.fetch = fetch;
