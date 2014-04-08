/*jslint
 indent: 2,
 white: true,
 sloppy: true
 */
/*globals describe, beforeEach, it, expect, GOVUK, setFixtures, $ */
describe("tracking external links", function () {
  beforeEach(function () {
    setFixtures('<a href="/g?url=http%3A%2F%2Fexample.com">Test a thing</a>');
  });

  it("should rewrite the href of the links", function() {
    GOVUK.TrackExternalLinks.init();
    expect($('a').attr('href')).toEqual('http://example.com');
  });

  it("should reset the href of the links on click", function() {
    GOVUK.TrackExternalLinks.init();
    $('a:first').click();
    expect($('a').attr('href')).toEqual('/g?url=http%3A%2F%2Fexample.com');
  });
});
