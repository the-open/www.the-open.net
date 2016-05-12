{% for org in site.data.orgs %}{
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: {{ org.coordinates }}
  },
  properties: {
    title: '{{ org.title }}',
    image: '{{ org.logo }}',
    description: //'{% if org.logo %}<img src="{{ org.logo }}" alt="{{ org.title }}" /><br />{% endif %}
      '{{ org.description }}<br><a target="_blank" href="{{ org.url }}">{{ org.url }}</a>',
    category: '{{ org.category }}'
  }
}{% unless forloop.last %},{% endunless %}
{% endfor %}
