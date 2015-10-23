require 'component_test_helper'

class TitleComponentTestCase < ComponentTestCase

  test "error if no title" do
    assert_raise do
      render_component("title", {})
    end
  end

  test "title text appears" do
    render_component("title", {title: "Hello World"})
    assert_select ".govuk-title", text: "Hello World"
  end

  test "title context appears" do
    render_component("title", {title: "Hello World", context: "Format"})
    assert_select ".govuk-title .context", text: "Format"
  end
end
