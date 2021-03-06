describe("User Satisfaction Survey", function () {
  describe("Cookies", function () {
    var survey, $surveyBar, $block;

    beforeEach(function () {
      $block = $('<div id="banner-notification" style="display: none"></div>' +
                  '<div id="global-cookie-message" style="display: none"></div>' +
                  '<div id="global-browser-prompt" style="display: none"></div>' +
                  '<div id="user-satisfaction-survey-container" data-survey-url="http://www.surveymonkey.com/some-survey-id"></div>');

      $('body').append($block);
      $("#user-satisfaction-survey").remove();

      // Don't actually try and take a survey in test.
      $('#take-survey').on('click', function(e) {
        e.preventDefault();
      });

      survey = GOVUK.userSatisfaction;
    });

    afterEach(function () {
      GOVUK.cookie(survey.cookieNameTakenSurvey, null);
      $block.remove();
      survey = null;
    });

    it("should display the user satisfaction div", function () {
      expect($('#user-satisfaction-survey').length).toBe(0);
      survey.showSurveyBar();
      expect($('#user-satisfaction-survey').length).toBe(1);
      expect($('#user-satisfaction-survey').hasClass('visible')).toBe(true);
      expect($('#user-satisfaction-survey').attr('aria-hidden')).toBe('false');
    });

    it("should set the take survey link's href to the survey monkey's url as defined by the wrapper's data-survey-url, appending the page's current path when not already specified", function() {
      $("#user-satisfaction-survey-container").data('survey-url', 'http://www.surveymonkey.com/some-survey-id');
      survey.showSurveyBar();
      expect($('#take-survey').attr('href')).toBe("http://www.surveymonkey.com/some-survey-id?c="+window.location.pathname);
    });

    it("should set the take survey link's href to the survey monkey's url as defined by the wrapper's data-survey-url, appending nothing when a path is already specified", function() {
      $("#user-satisfaction-survey-container").data('survey-url', 'http://www.surveymonkey.com/some-survey-id?c=/somewhere');
      survey.showSurveyBar();
      expect($('#take-survey').attr('href')).toBe("http://www.surveymonkey.com/some-survey-id?c=/somewhere")
    });

    it("should randomly display the user satisfaction div", function () {
      pending(); //Fails randomly, disabling.
      var counter = 0;
      for (var i = 0; i < 100; i++) {
        $('#user-satisfaction-survey').remove();
        survey.randomlyShowSurveyBar();

        if ($('#user-satisfaction-survey').length > 0) {
          counter += 1;
        }
      }

      expect(counter).toBeGreaterThan(0);
      expect(counter).toBeLessThan(5);
    });

    it("should not display the user satisfaction div if another notification banner is visible", function() {
      $('#global-cookie-message').css('display', 'block');

      survey.showSurveyBar();
      expect($('#user-satisfaction-survey').length).toBe(0);
    });

    it("shouldn't show the user satisfaction div if the 'survey taken' cookie is set", function () {
      GOVUK.cookie(survey.cookieNameTakenSurvey, 'true');

      var counter = 0;
      for (var i = 0; i < 100; i++) {
        survey.randomlyShowSurveyBar();

        if ($('#user-satisfaction-survey').length > 0) {
          counter += 1;
          break;
        }
      }

      expect(counter).toBe(0);
    });

    describe("Event handlers", function () {
      beforeEach(function() {
        survey.showSurveyBar();
      });

      it("should set a cookie when clicking 'take survey'", function () {
        $('#take-survey').trigger('click');
        expect(GOVUK.cookie(survey.cookieNameTakenSurvey)).toBe('true');
      });

      it("should set a cookie when clicking 'no thanks'", function () {
        $('#survey-no-thanks').trigger('click');
        expect(GOVUK.cookie(survey.cookieNameTakenSurvey)).toBe('true');
      });

      it("should hide the satisfaction survey bar after clicking 'take survey'", function () {
        $('#take-survey').trigger('click');
        expect($('#user-satisfaction-survey').hasClass('visible')).toBe(false);
        expect($('#user-satisfaction-survey').attr('aria-hidden')).toBe('true');
      });

      it("should hide the satisfaction survey bar after clicking 'no thanks'", function () {
        $('#survey-no-thanks').trigger('click');
        expect($('#user-satisfaction-survey').hasClass('visible')).toBe(false);
      });
    });
  });
});
