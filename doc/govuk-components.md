# GOV.UK components

Shared partials that encapsulate the HTML/CSS/JS for a common UI component.
The component files are centrally hosted on static and exposed to applications via [alphagov/slimmer](https://github.com/alphagov/slimmer).
The partial is exposed over the network, and the CSS/JS are included by the shared templated layout.

The available components and their documentation are exposed by an API at `/templates/govuk_component/docs`, which is consumed by
[alphagov/govuk_component_guide](https://github.com/alphagov/govuk_component_guide) to generate a living styleguide for components.

* a [Partial View](../app/views/govuk_component) - The template logic and markup, also defines the arguments expected
* a [SCSS module](../app/assets/stylesheets/govuk-component) - The styling of the component
* a Javascript module - no examples yet.
* [Documentation](../app/views/govuk_component/docs) - a `.yml` per component, describing the component and containing fixture data.
* a [unit test](../test/govuk_component) - testing the component renders correctly based on parameters passed in

## Creating a new component

There's a rails generator you can use to create the basic component files, but it's recommended you read below to understand how it works as well.

```
bundle exec rails generate govuk_component [your-component-name]
```

## How components are structured

Component names should be lowercase and hyphenated. For example: `your-component-name`.

When referenced from an application as a partial they'll be prefixed with `govuk-`. For example: `govuk-your-component-name`.

To match rails view convention the partial itself should use an underscore, rather than a hyphen.

### Views

Views live in `app/views/govuk_component/your_compontent_name.raw.html.erb` - There should be a single root element, with a class name consisting of the prefixed component name. For example:
```
<div class="govuk-your-component-name">
<p>things</p>
</div>
```

_Note_: For consistency with other components, and Rails convention, you should only use `:symbols`, rather than `"strings"`, for object keys.

### Styles

There is a Sass module at `app/stylesheets/govuk-component/_your-component-name.scss` - there should be a single root class, the same class on the root of the partial. For example:
```
.govuk-your-component-name {
  // CSS rules go here.
  p {
    // scoped rules
  }
}
```

Sass modules are included in `app/stylesheets/govuk-component/_component.scss` - which is used in the standard static layout SCSS files (application.scss, header_footer_only.scss)

### Examples and documentation

Documentation lives [`app/views/govuk_component/docs`](../app/views/govuk_component/docs), where each component has a `.yml` file describing:
* `id`: The underscore version of the component name, this is what an app calling the component would use
* `name`: The human name. eg, `Your Example Component`
* `description`: A longer form description of what the component does, when it should be used
* `fixtures`: TBD: For components that expect arguments this will be a hash of fixtured example arguments

Adding it to the documentation will allow you to preview it in the `govuk_component_guide`, which can be pointed to any
version of static, including your local one running a branch. Which you should probably do.

### Unit tests

Unit tests for components live in [`test/govuk_component`](../test/govuk_component). Tests should extend the [`ComponentTestCase`](../test/govuk_component_test_helper.rb) which provides helper methods for rendering a component and for asserting certain markup exists, eg `assert_link_with_text`.
