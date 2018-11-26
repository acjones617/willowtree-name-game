import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import fetch from 'jest-fetch-mock';
import App from './App';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

const profilesMock = [
  {"id":"4NCJTL13UkK0qEIAAcg4IQ","type":"people","slug":"joel-garrett","jobTitle":"Senior Software Engineer","firstName":"Joel","lastName":"Garrett","headshot":{"type":"image","mimeType":"image/jpeg","id":"4Mv2CONANym46UwuuCIgK","url":"//images.ctfassets.net/3cttzl4i3k1h/4Mv2CONANym46UwuuCIgK/cbeb43c93a843a43c07b1de9954795e2/headshot_joel_garrett.jpg","alt":"headshot joel garrett","height":340,"width":340},"socialLinks":[]},
  {"id":"1X2lomt8iIYImCQysey6Eq","type":"people","slug":"jeffery-ward","jobTitle":"Principal Software Engineer","firstName":"Jeff","lastName":"Ward","headshot":{"type":"image","mimeType":"image/jpeg","id":"3BdQSQcuMgcs00qYoOuYSY","url":"//images.ctfassets.net/3cttzl4i3k1h/3BdQSQcuMgcs00qYoOuYSY/f0858540116928dc5fd0b2e84def8e19/headshot_jeff_ward.jpg","alt":"headshot jeff ward","height":340,"width":340},"socialLinks":[]},
  {"id":"56zuFgdeoMqAOuIKe0M4AU","type":"people","slug":"ashley-joost","jobTitle":"Senior Software Engineer","firstName":"Ashley","lastName":"Joost","headshot":{"type":"image","mimeType":"image/jpeg","id":"ezBlWGiV9ucqAsiOo0Iy2","url":"//images.ctfassets.net/3cttzl4i3k1h/ezBlWGiV9ucqAsiOo0Iy2/01a8ed75dd4a508b45defea73fef6e80/headshot_ashley_joost.jpg","alt":"headshot ashley joost","height":340,"width":340},"socialLinks":[]},
  {"id":"29XgxedqmAO86mGeImqwEK","type":"people","slug":"ben-frye","jobTitle":"Software Engineer","firstName":"Ben","lastName":"Frye","headshot":{"type":"image","mimeType":"image/jpeg","id":"3SQLIq0Y36oYyaiwCSwOY8","url":"//images.ctfassets.net/3cttzl4i3k1h/3SQLIq0Y36oYyaiwCSwOY8/a65ae6620c8041b2773c1915156261d7/headshot_ben_frye.jpg","alt":"headshot ben frye","height":340,"width":340},"socialLinks":[]},
  {"id":"2dMXmpIHPicQW6SW60qeKs","type":"people","slug":"christy-phillips","jobTitle":"Chief Talent Officer","firstName":"Christy","lastName":"Phillips","headshot":{"type":"image","mimeType":"image/png","id":"64IBagkE0gga82G2W6cWsm","url":"//images.ctfassets.net/3cttzl4i3k1h/64IBagkE0gga82G2W6cWsm/95b43c4a0c549dc33a80f23d4382c4f4/christy.png","alt":"Christy Phillips, Chief Talent Officer at WillowTree, Inc.","height":664,"width":664},"socialLinks":[{"type":"linkedin","callToAction":"Follow Christy Phillips on LinkedIn","url":"https://www.linkedin.com/in/christyphillips1/"}]},
];

it('renders welcome message', () => {
  const { getByText } = render(<App />);
  expect(getByText('WillowTree Name Game')).toBeInTheDocument();
});

it ('renders elements when it receives profiles from API', async () => {
  fetch.mockResponse(JSON.stringify(profilesMock));
  const {getByText} = render(<App />);
  await waitForElement(() => getByText('Who is', {exact: false}));
  await waitForElement(() => getByText('Keep Score?', {exact: false}));
  await waitForElement(() => getByText('Select other game options', {exact: false}));
});

it ('renders error message when API fails', async () => {
  fetch.mockReject(new Error('Rejected'));
  const {getByText} = render(<App />);
  await waitForElement(() => getByText('technical difficulties', {exact: false}));
});

it('renders expected pictures', async () => {
  fetch.mockResponse(JSON.stringify(profilesMock));
  const {getByAltText} = render(<App />);
  await waitForElement(() => getByAltText(profilesMock[0].headshot.alt));
  await waitForElement(() => getByAltText(profilesMock[1].headshot.alt));
  await waitForElement(() => getByAltText(profilesMock[2].headshot.alt));
  await waitForElement(() => getByAltText(profilesMock[3].headshot.alt));
  await waitForElement(() => getByAltText(profilesMock[4].headshot.alt));
});
