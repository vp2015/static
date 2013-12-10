require "notification_file_lookup"

module NotificationHelper
  include ActionView::Helpers::TagHelper

  def banner_notification
    node_replacement_notification(NotificationFileLookup.instance.banner, "banner")
  end

  private

  def node_replacement_notification(node, type)
    if node
      content_tag(:section, "<div>#{node[:file]}</div>",
        {:id => "#{type}-notification", :class => node[:colour]}, false)
    else
      ''
    end
  end
end
