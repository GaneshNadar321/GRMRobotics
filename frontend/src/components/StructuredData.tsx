import Script from 'next/script';

interface OrganizationSchemaProps {
  name: string;
  url: string;
  logo: string;
  description: string;
  contactPoint?: {
    telephone: string;
    contactType: string;
    email: string;
  };
}

export function OrganizationSchema({ name, url, logo, description, contactPoint }: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    ...(contactPoint && { contactPoint }),
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ProductSchemaProps {
  name: string;
  description: string;
  image: string[];
  sku: string;
  brand: string;
  offers: {
    price: number;
    currency: string;
    availability: string;
    url: string;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

export function ProductSchema({ name, description, image, sku, brand, offers, aggregateRating }: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    sku,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    offers: {
      '@type': 'Offer',
      ...offers,
    },
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ...aggregateRating,
      },
    }),
  };

  return (
    <Script
      id="product-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebsiteSchemaProps {
  name: string;
  url: string;
  description: string;
  potentialAction?: {
    target: string;
    queryInput: string;
  };
}

export function WebsiteSchema({ name, url, description, potentialAction }: WebsiteSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    ...(potentialAction && {
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: potentialAction.target,
        },
        'query-input': potentialAction.queryInput,
      },
    }),
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}