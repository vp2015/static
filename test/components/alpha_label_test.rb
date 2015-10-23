require 'component_test_helper'

class TitleComponentTestCase < ComponentTestCase

  test "no error if no message" do
    assert_raise do
      render_component("alpha_label", {})
      assert_select ".govuk-alpha-label"
    end
  end

  test "custom message appears" do
    render_component("alpha_label", {message: "custom message"})
    assert_select ".govuk-alpha-label span", text: "custom message"
  end

  test "custom message HTML works" do
    render_component("alpha_label", {message: "custom <strong>message</strong>"})
    assert_select ".govuk-alpha-label strong", text: "message"
  end
end
