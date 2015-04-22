//= require govuk/multivariate-test

(function () {
  "use strict";

  window.GOVUK = window.GOVUK || {};

  window.GOVUK.reportAProblem = {
    showErrorMessage: function (jqXHR) {
      var response = "<h2>Sorry, we're unable to receive your message right now.</h2> " +
                     "<p>We have other ways for you to provide feedback on the " +
                     "<a href='/contact'>contact page</a>.</p>"
      $('.report-a-problem-content').html(response);
    },

    promptUserToEnterValidData: function() {
      GOVUK.reportAProblem.enableSubmitButton();
      $('<p class="error-notification">Please enter details of what you were doing.</p>').insertAfter('.report-a-problem-container h2');
    },

    disableSubmitButton: function() {
      $('.report-a-problem-container .button').attr("disabled", true);
    },

    enableSubmitButton: function() {
      $('.report-a-problem-container .button').attr("disabled", false);
    },

    showConfirmation: function(data) {
      $('.report-a-problem-content').html(data.message);
    },

    submit: function() {
      $('.report-a-problem-container .error-notification').remove();
      $('input#url').val(window.location);

      GOVUK.reportAProblem.disableSubmitButton();
      $.ajax({
        type: "POST",
        url: "/contact/govuk/problem_reports",
        dataType: "json",
        data: $('.report-a-problem-container form').serialize(),
        success: GOVUK.reportAProblem.showConfirmation,
        error: function(jqXHR, status) {
          if (status === 'error' || !jqXHR.responseText) {
            if (jqXHR.status == 422) {
              GOVUK.reportAProblem.promptUserToEnterValidData();
            }
            else {
              GOVUK.reportAProblem.showErrorMessage();
            }
          }
        },
        statusCode: {
          500: GOVUK.reportAProblem.showErrorMessage
        }
      });
      return false;
    }
  }

  $(document).ready(function() {
    if (pageIncludedInRedesign()) {
      var test = new GOVUK.MultivariateTest({
        name: 'report-a-problem-redesign-ab-test',
        contentExperimentId: "SnpcHld1SJuQig-_SsaN_Q",
        cohorts: {
          variant_0: {variantId: 0, callback: normalReportAProblem},
          variant_1: {variantId: 1, callback: alternate_design}
        }
      });
    } else {
      normalReportAProblem();
    };

    function pageIncludedInRedesign(){
      return (window.location.href.indexOf("/help") > -1)
    };

    function normalReportAProblem(){
      // Add a click handler for the toggle
      var toggleBlock = '<div class="report-a-problem-toggle-wrapper js-footer">' +
                          '<p class="report-a-problem-toggle">' +
                            '<a href="">Is there anything wrong with this page?</a>' +
                          '</p>' +
                        '</div>';
      var $container = $('.report-a-problem-container')
      $container.before(toggleBlock);


      $('.report-a-problem-toggle a').on('click', function() {
        $container.toggle();
        return false;
      });

      // form submission for reporting a problem
      var $form = $container.find('form');
      $form.append('<input type="hidden" name="javascript_enabled" value="true"/>');
      $form.append($('<input type="hidden" name="referrer">').val(document.referrer || "unknown"));
      $form.submit(GOVUK.reportAProblem.submit);

    };

    function alternate_design() {
      // Add in the toggle link for reporting a problem at the bottom of the page
      var toggleBlockAlternate = '<div class="report-a-problem-toggle-wrapper js-footer">' +
                          '<p class="report-a-problem-toggle">' +
                              '<p> Was this page useful?<p>' +
                              '<form>' +
                                '<fieldset class="inline"> ' +
                                  '<label class="block-label selectable" for="radio-inline-1">' +
                                   '<input id="radio-inline-1" type="radio" name="radio-inline-group" value="Yes" aria-expanded="false">' +
                                      "Yes" +
                                  '</label>' +
                                  '<label class="block-label selectable" for="radio-inline-2">' +
                                    '<input id="radio-inline-2" type="radio" name="radio-inline-group" value="No" aria-expanded="false">' +
                                      'No' +
                                  '</label>' +
                                '</fieldset>' +
                              '</form>'+
                          '</p>' +
                        '</div>';
      var $containerAlternate = $('.report-a-problem-container');
      $containerAlternate.before(toggleBlockAlternate);

      $containerAlternate.find('#js-ab-test-title').text("Thanks. Your feedback has been recorded.");
      $containerAlternate.find("#js-ab-test-paragraph").hide();
      $containerAlternate.find('#js-ab-test-first-label').text("How could we improve this page?");
      $containerAlternate.find('.js-ab-test-first-form').prop("type","textarea");
      $containerAlternate.find('#js-ab-test-second-label').hide();
      $containerAlternate.find('.js-ab-test-second-form').hide();


      // Add a click handler for the toggle
      $('.report-a-problem-toggle-wrapper :radio').on('click', function() {
        $containerAlternate.show();
      });
    }
  });
}());
