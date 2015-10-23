require 'test_helper'

class ComponentTestCase < ActionView::TestCase
  def render_component(name, locals)
    render file: "govuk_component/#{name}.raw", locals: locals
  end
end
