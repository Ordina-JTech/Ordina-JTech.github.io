Jekyll::Hooks.register :site, :post_read do |site|

  puts 'Enriching posts, training and talks with link to authors'

  site.collections.each do |collection|
    collection.each do |item|
      if item.respond_to?("each")
        item.docs.each do |post|
          if post.data['authors']
            post.data['authors'].collect! { |author_username|
              site.data['authors'][author_username]
            }.compact!
          end
        end
      end
    end
  end

end