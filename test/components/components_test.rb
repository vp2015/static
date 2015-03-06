require 'test_helper'

class ComponentsTest < ActionView::TestCase

  test "component partials don't error" do

    doc_files = Rails.root.join('app', 'views', 'govuk_component', 'docs', '*.yml')
    components = Dir[doc_files].sort.map do |file|
      {'id' => File.basename(file, '.yml')}.merge(YAML::load_file(file))
    end

    components.each do |component|
      component['fixtures'].each do |name, fixture|
        render file: "govuk_component/#{component['id']}.raw", locals: fixture.deep_symbolize_keys
      end
    end
  end
end
